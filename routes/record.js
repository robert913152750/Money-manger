const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const { authenticated } = require("../config/auth");
//主畫面
router.get("/", authenticated, (req, res) => {
  return res.redirect("/");
});
//新增支出頁面
router.get("/new/record", authenticated, (req, res) => {
  return res.render("new");
});

//新增支出
router.post("/new", authenticated, (req, res) => {
  const record = new Record({
    name: req.body.expenseName,
    category: req.body.expenseSelect,
    date: req.body.expenseDate,
    amount: req.body.expenseAmount,
    userId: req.user._id,
  });
  console.log(req.body);
  record.save((err) => {
    if (err) console.error(err);
    return res.redirect("/");
  });
});
//修改支出頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, record) => {
      if (err) return console.error(err);
      return res.render("edit", { record: record });
    });
});
//修改支出
router.put("/:id/edit", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      (record.name = req.body.expenseName),
        (record.date = req.body.expenseDate),
        (record.category = req.body.expenseSelect);
      record.amount = req.body.expenseAmount;
      record.save((err) => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});
//刪除支出
router.delete("/:id/delete", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      record.remove((err) => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});

module.exports = router;
