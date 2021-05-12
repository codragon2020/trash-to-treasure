// File is used to authenticate users with a route
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const {OAuth2Client} = require("google-auth-library")

const client = new OAuth2Client("1084092224337-7lgj0bui87cdc7ftptrpu00skccbq2pm.apps.googleusercontent.com")

exports.googleLogin = (req, res) => {
  const {tokenId} = req.body;

  client.verifyIdToken({tokenId, audience: "1084092224337-7lgj0bui87cdc7ftptrpu00skccbq2pm.apps.googleusercontent.com"}).then(response => {
    const {email_verfied, name, email} = response.getPayload;

    console.log(response.payload)
  })
  console.log()
}

// module.exports = function (passport) {
//   passport.use(
//     new localStrategy((username, password, done) => {
//       User.findOne({ username: username }, (err, user) => {
//         if (err) throw err;
//         if (!user) return done(null, false);
//         bcrypt.compare(password, user.password, (err, result) => {
//           if (err) throw err;
//           if (result === true) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         });
//       });
//     })
//   );

//   passport.serializeUser((user, cb) => {
//     cb(null, user.id);
//   });
//   passport.deserializeUser((id, cb) => {
//     User.findOne({ _id: id }, (err, user) => {
//       const userInformation = {
//         username: user.username,
//       };
//       cb(err, userInformation);
//     });
//   });
// };

