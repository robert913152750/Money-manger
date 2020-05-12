const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  return res.redirect("/");
});

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/new", (req, res) => {
  const record = new Record({
    name: req.body.expenseName,
    category: req.body.expenseSelect,
    date: req.body.expenseDate,
    amount: req.body.expenseAmount,
  });
  console.log(req.body);
  record.save((err) => {
    if (err) console.error(err);
    return res.redirect("/");
  });
});

router.get("/:id/edit", (req, res) => {
  res.send("修改特定支出的表單");
});

router.post("/:id/edit", (req, res) => {
  res.send("修改特定支出");
});

router.post("/:id/delete", (req, res) => {
  res.send("刪除紀錄");
});

module.exports = router;
