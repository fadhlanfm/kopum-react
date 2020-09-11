const express = require("express");
const UsersController = require("../controllers/users");
const User = require("../models/user");
const { validateParam, schemas } = require("../helpers/routeHelpers");

const router = express.Router();

router.route("/").get(UsersController.index).post(UsersController.newUser);

router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUser)
  .put(UsersController.replaceUser)
  .patch(UsersController.updateUser);

router
  .route("/:userId/cars")
  .get(UsersController.getUserCars)
  .post(UsersController.newUserCar);

module.exports = router;
