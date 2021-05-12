// File is used to authenticate users with a route
const User = require("../models/userModel");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

// passport.use(
//   new GoogleStrategy({
//     // Options for the google strategy
//     callbackURL: '/google/redirect',
//     clientID: keys.google.clienID,
//     clientSecret: keys.google.clientSecret
//   }, () => {
//     // Passport callback function
//   })
// );

module.exports = function (passport) {
  console.log("Calling Google");
  console.log(keys)
  passport.use(
    new GoogleStrategy(
      {
        // Options for the google strategy
        callbackURL: "http://localhost:3001/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
      }, () => {}
    )
  );

  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};
