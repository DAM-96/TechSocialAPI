const router = require("express").Router();
const thoughtsController = require("../../controllers/thoughtsController");

// Defining API operations for /api/thoughts/
router.route("/").get(thoughtsController.getAll).post(thoughtsController.createThought);

// Defining operations for /api/thoughts/:id
router.route("/:thoughtId").get(thoughtsController.getByID).put(thoughtsController.updateThought).delete(thoughtsController.deleteThought);

module.exports = router;
