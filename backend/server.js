// Requiring necessary npm packages
const express = require("express");
const path = require("path");
const productRoutes = require("../routes/productRoutes.js");
const profileRoutes = require("../routes/profileRoutes.js");
const cors = require("cors");
const passport = require("./passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("../models/userModel");
require("dotenv").config();

// Loggers for debugging
const colors = require("colors");
const logger = require("morgan");

// Object Data Modeling utility for Mongo/Node
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();

// Concise output colored by response status for development use. The :status token will be colored green for success codes, red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for information codes.
app.use(logger("dev"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/t2t", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected successfully.".cyan.bold);
});

connection.on("error", (err) => {
  console.log("Mongoose connection failed.".red.bold);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ----------------End of Middleware---------------------

// app.use("/", loginRoutes);
/* Express app ROUTING */
app.use("/auth", require("./auth"));
app.use("/profile", profileRoutes); // For future development
app.use("/api/products", productRoutes);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`.yellow.bold);
});
