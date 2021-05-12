const router = require("express").Router();

const cors = require("cors");
const passport = require("passport");
const passortLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("../models/userModel");

var express = require("express");
var app = express();

app.use(cors());

// Routes
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(500).send("No User Exists");
    else {
      req.login(user, (err) => {
        if (err) throw err;
        res.json({ msg: "Successfully Authenticated", user: req.user });
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

router.get("/logout", function (req, res) {
  req.logout();
  res.send("Logging Out User");
});

router.get("/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(500).send("User not logged in");
  }
});

// Google routes
// router.get('/google', (req, res) => {
//   //handle with passport
//   res.send('logging in with google');
// })

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      // "https://mail.google.com/",
      // "https://www.google.com/m8/feeds/",
      // "email",
      "profile",
    ],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate(
    "google",
    {
      failureRedirect: "/"
    }),
    (req, res) => {
      console.log("redirecting");
    }
)


module.exports = router;
