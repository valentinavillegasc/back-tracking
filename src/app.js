const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");
const trackerRouter = require("./routes/trackerRoute");
//Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/tracker", trackerRouter);

module.exports = app;
