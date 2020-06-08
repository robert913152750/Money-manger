const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const moment = require("moment");
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
  const {
    expenseName,
    expenseDate,
    expenseSelect,
    expenseAmount,
    expenseMerchant,
  } = req.body;
  let errors = [];
  if (!expenseName || !expenseDate || !expenseSelect || !expenseAmount) {
    errors.push({ message: "除「商家」外所有欄位為必填" });
  }
  if (errors.length > 0) {
    res.render("new", {
      errors,
      expenseName,
      expenseDate,
      expenseSelect,
      expenseAmount,
    });
  } else {
    const record = new Record({
      name: expenseName,
      category: expenseSelect,
      date: expenseDate,
      amount: expenseAmount,
      merchant: expenseMerchant,
      userId: req.user._id,
    });
    console.log(req.body);
    record.save((err) => {
      if (err) console.error(err);
      return res.redirect("/");
    });
  }
});
//修改支出頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, record) => {
      if (err) return console.error(err);
      record.date = moment(record.date).format("YYYY-MM-DD");
      return res.render("edit", { record: record });
    });
});
//修改支出
router.put("/:id/edit", authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.error(err);
      record.name = req.body.expenseName;
      record.date = req.body.expenseDate;
      record.category = req.body.expenseSelect;
      record.merchant = req.body.expenseMerchant;
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
