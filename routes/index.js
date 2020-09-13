const router = require("express").Router();
const users = require("./users");
const cars = require("./cars");

router.use("/users", users);
router.use("/cars", cars);

module.exports = router;
