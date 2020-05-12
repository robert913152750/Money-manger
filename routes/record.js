const express = require("express");
const router = express.Router();
const Record = require("../models/record");
//主畫面
router.get("/", (req, res) => {
  return res.redirect("/");
});
//新增支出頁面
router.get("/new", (req, res) => {
  return res.render("new");
});
//新增支出
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
//修改支出頁面
router.get("/:id/edit", (req, res) => {
  Record.findById(req.params.id)
    .lean()
    .exec((err, record) => {
      if (err) return console.error(err);
      return res.render("edit", { record: record });
    });
});
//修改支出
router.put("/:id/", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    (record.name = req.body.expenseName),
      (record.date = req.body.expenseDate),
      (record.category = req.body.expenseSelect);
    record.amount = req.body.expenseAmount;
    record.save((err) => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});
//刪除支出
router.delete("/:id/delete", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.remove((err) => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
