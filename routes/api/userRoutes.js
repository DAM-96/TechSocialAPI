const router = require("express").Router()

const usersController = require("../../controllers/usersController")

// Defining API operations for /api/users/
router.route("/").get(usersController.getAll).post(usersController.createUser);

// Defining operations for /api/users/:id
router.route("/:userId").get(usersController.getByID).put(usersController.updateUser).delete(usersController.deleteUser);

module.exports = router;