const Car = require("../models/car");

class Cars {
  static index = async (req, res, next) => {
    const cars = await Car.find({});
    res.status(200).json(cars);
  };

  //blablablabla
}

module.exports = Cars;
