// Requiring necessary npm packages
const express = require("express");
const path = require("path");
const loginRoutes = require("../routes/loginRoutes")
const productRoutes = require("../routes/productRoutes.js");
const profileRoutes = require("../routes/profileRoutes.js");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require('./passportConfig')
const passortLocal = require("passport-local").Strategy;
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

// Sample Products
// const products = require("./data/products")
// const products = require("./data/products.js");

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
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // Request headers you wish to allow ,
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-ControlAllow-Headers');
//   // Pass to next layer of middleware
//   next();
// });
// app.use(
//   cors({
//     origin: "*", // <-- location of the react app we're connecting to
//     methods: "GET, POST, PATCH, DELETE, PUT",
//     allowedHeaders: "Content-Type, Authorization"
//   })
// );

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
require("./passportConfig")(passport);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport);

// ----------------End of Middleware---------------------

app.use("/", loginRoutes);
app.use("/profile", profileRoutes); // For future development 
app.use("/api/products", productRoutes);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`.yellow.bold);
});
