const express = require("express");
const router = express.Router();
const User = require("../../models/userModel");
const passport = require("../passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login",
  })
);

router.get("/user", (req, res) => {
  console.log("/user route");
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(500).send("User not logged in");
  }
});

router.post(
  "/login",
  function (req, res, next) {
    console.log(req.body);
    console.log("================");
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("POST to /login");
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);
    if (cleanUser.local) {
      console.log(`Deleting ${cleanUser.local.password}`);
      delete cleanUser.local.password;
    }
    res.json({ user: cleanUser });
  }
);

router.post("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up!
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // ADD VALIDATION
  User.findOne({ "local.username": username }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
    }
    const newUser = new User({
      "local.username": username,
      "local.password": password,
    });
    newUser.save((err, savedUser) => {
      if (err) return res.json(err);
      return res.json(savedUser);
    });
  });
});

module.exports = router;
