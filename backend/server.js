// Requiring necessary npm packages
const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const passortLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();

// Loggers for debugging
const colors = require("colors");
const logger = require("morgan");

// Object Data Modeling utility for Mongo/Node
const mongoose = require("mongoose");

// Sample Products
// const products = require("./data/products")
const productRoutes = require("../routes/productRoutes.js");
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
  console.log(`Mongoose connection error: ${error.message}`.red.bold);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",  // <-- location of the react app we're connecting to
  credentials: true
}))

app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser("secretcode"))

// Routes
app.post("/login", (req, res) => {
  console.log(req.body);
})
app.post("/register", (req, res) => {
  console.log(req.body);
  res.send('user ' + req.params.id)

})
app.get("/user", (req, res) => {})

app.use("/api/products", productRoutes);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`.yellow.bold);
});
