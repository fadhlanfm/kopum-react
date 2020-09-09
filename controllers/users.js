const User = require("../models/user");
const Car = require("../models/car");
const Joi = require("joi");

const idSchema = Joi.object().keys({
  userId: Joi.string().regex(),
});

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

  static updateUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const newUser = req.body;
      const result = await User.findByIdAndUpdate(userId, newUser);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  static getUserCars = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate("cars");
      res.status(200).json(user.cars);
    } catch (err) {
      next(err);
    }
  };

  static newUserCar = async (req, res, next) => {
    const { userId } = req.params;
    const newCar = new Car(req.body);
    const user = await User.findById(userId);
    newCar.seller = user;
    await newCar.save();
    user.cars.push(newCar);
    await user.save();
    res.status(201).json(newCar);
  };
}

module.exports = Users;
