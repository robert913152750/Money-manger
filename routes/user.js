const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.send("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  res.send("register");
});

module.exports = router;
