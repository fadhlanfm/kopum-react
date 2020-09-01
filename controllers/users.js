const User = require("../models/user");

class Users {
  static index = async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  static newUser = async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  static getUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  static replaceUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const newUser = req.body;
      const result = await User.findByIdAndUpdate(userId, newUser);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = Users;
