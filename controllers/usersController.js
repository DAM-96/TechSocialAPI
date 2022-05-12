const { Users, Thoughts } = require("../models");

const usersControllers = {
    // Get All Users
    getAll(req, res) {
        Users.find().then( (users) => {
            console.log("Getting all Users...");
            return res.json(users)
        }).catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    },

    // Get only one User by ID
    getByID(req, res) {
        Users.findOne({ _id: req.params.userId }).then((user) => !user ? res.status(404).json({message: "No users were found with the specified ID"}) : res.json(user))
        .catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    },

    // Create a new user
    createUser(req, res) {

        // Input should look something like this
        // {
        //     "userName": "Username",
        //     "email": "email@domain.com"
        // }

        Users.create(req.body).then((user) => res.json(user))
        .catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    },

    // Update a single user by ID
    updateUser(req, res) {
        Users.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true
            }
        ).then((user) => !user ? res.status(404).json({message: "No user was found with the specified ID"}) : res.status(200).json())
        .catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    },

    // Delete a user by ID
    deleteUser(req, res) {
        Users.findOneAndDelete({ _id: req.params.userId}).then((user) => !user ? res.status(404).json({message:"No user was found with the specified ID"}) 
        : Thoughts.deleteMany(
            {
                _id: {
                    $in: user.thoughts
                } 
            })
        ).then(() => res.json({message:"Succesfully deleted the specified User and all of their related thoughts."}))
        .catch((err) => res.status(500).json({err, message: "Unable to process request due to server issue."}));
    }
}

module.exports = usersControllers;