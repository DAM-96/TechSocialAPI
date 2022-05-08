const { Thoughts, Users } = require("../models");

const thoughtsController = {

    // Get All Thoughts
    getAll(req, res) {
        Thoughts.find().then( (thoughts) => {
            console.log("Getting all Thoughts...");
            return res.json(thoughts)
        }).catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    },

    // Get only one Thougth by ID
    getByID(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId }).then((thought) => !thought ? res.status(404).json({message: "No thoughts were found with the specified ID"}) : res.json(thought))
        .catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    },

    // Create a new thought
    createThought(req, res) {
        Thoughts.create(req.body).then((thought) => {
            return Users.findOneAndUpdate(
                { 
                    _id: req.body.userId 
                },
                {
                    $push: {
                        thoughts: thought._id
                    }
                },
                {
                    runValidators: true,
                    new: true
                }
            ).then( (user) => {
                !user ? res.status(404).json({thought, message: "Unable to locate the specified user for the thougth that was created. Thought created without user"}) : res.json({ thought, message:"Thougth successfully created"})
            }).catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
        });
    },

    // Update a single thougth by ID
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true
            }
        ).then((thought) => !thought ? res.status(404).json({message: "No thought was found with the specified ID"}) : res.status(200).json())
        .catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    },

    // Delete a thougth by ID
    deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtId}).then((thought) => !thought ? res.status(404).json({message:"No thought was found with the specified ID"}) 
        : Users.findOneAndUpdate(
            {
                thoughts: req.params.thoughtId
            },
            {
                $pull: {
                    thoughts: req.params.thoughtId
                }
            },
            {
                new: true
            })
        ).then(() => res.json({message:"Succesfully deleted the specified Thought"}))
        .catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    }
}