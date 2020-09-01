function errorHandler(err, req, res, next) {
  console.log("sampe error handler");
  console.log(err);
  let statusCode = 500;
  let messages = [];
  res.status(statusCode).json({ messages });
}

module.exports = {
  errorHandler,
};
