const express = require("express");
const UsersController = require("../controllers/users");
const User = require("../models/user");

const router = express.Router();

router.route("/").get(UsersController.index).post(UsersController.newUser);

router
  .route("/:userId")
  .get(UsersController.getUser)
  .put(UsersController.replaceUser)
  .patch(UsersController.updateUser);
// .delete();

router
  .route("/:userId/cars")
  .get(UsersController.getUserCars)
  .post(UsersController.newUserCar);

module.exports = router;
