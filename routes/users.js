const express = require("express");
const UsersController = require("../controllers/users");
const User = require("../models/user");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");

const router = express.Router();

router
  .route("/")
  .get(UsersController.index)
  .post(validateBody(schemas.userSchema), UsersController.newUser);

router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUser)
  .put(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchema),
    ],
    UsersController.replaceUser
  )
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userOptionalSchema),
    ],
    UsersController.updateUser
  );

router
  .route("/:userId/cars")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUserCars)
  .post(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.carSchema),
    ],
    UsersController.newUserCar
  );

module.exports = router;
