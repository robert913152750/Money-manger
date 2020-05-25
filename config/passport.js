const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        email: email,
      }).then((user) => {
        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }
        //use bcrypt to compare user input password and database password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Email and Password incorrect",
            });
          }
        });
      });
    })
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: "2860820227348781",
        clientSecret: "f4b124b84a80ae4d79dda112df65abab",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["email", "displayName"],
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({
          email: profile._json.email,
        }).then((user) => {
          if (!user) {
            const randomPassword = Math.random().toString(36).slice(-8);
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                let newUser = User({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash,
                });
                newUser
                  .save()
                  .then((user) => {
                    return done(null, user);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
            );
          } else {
            return done(null, user);
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .exec((err, user) => {
        done(err, user);
      });
  });
};
