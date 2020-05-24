const express = require("express");
const router = express.Router();
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const passport = require("passport");
//登入頁面
router.get("/login", (req, res) => {
  res.render("login");
});
//登入檢查
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })(req, res, next);
});
//註冊頁面
router.get("/register", (req, res) => {
  res.render("register");
});
//註冊檢查
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      // 使用者已經註冊過
      console.log("User already exists");
      res.render("register", {
        name,
        email,
        password,
        password2,
      });
    } else {
      // 如果 email 不存在就新增使用者
      const newUser = new User({
        name,
        email,
        password,
      });
      //use bcrypt to hash password
      bcrypt
        .genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
              res.redirect("/");
            });
          })
        )

        .catch((err) => console.log(err));
    }
  });
});

//登出
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/users/login");
});

module.exports = router;
