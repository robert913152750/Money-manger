const express = require("express");
const router = express.Router();
const { authenticated } = require("../config/auth");

//選擇頁面
router.get("/event", authenticated, (req, res) => {
  return res.render("choose");
});

//導到新增支出頁面
router.get("/expense/new/record", authenticated, (req, res) => {
  return res.redirect("/expense//new/record");
});

//導到新增收入頁面
router.get("/income/new/income", authenticated, (req, res) => {
  return res.redirect("/income/new/income");
});

module.exports = router;
