const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");
const helmet = require("helmet");
// const { errorHandler } = require("./middlewares");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/kopum", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
// app.use(errorHandler);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message,
    },
  });

  console.error(err);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
