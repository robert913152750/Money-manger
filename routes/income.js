const express = require("express");
const router = express.Router();
const Income = require("../models/income");
const { authenticated } = require("../config/auth");
//新增收入頁面
router.get("/new/income", authenticated, (req, res) => {
  return res.render("newIncome");
});
//新增收入
router.post("/new", authenticated, (req, res) => {
  const {
    incomeName,
    incomeDate,
    incomeSelect,
    incomeAmount,
    incomeMerchant,
  } = req.body;
  let errors = [];
  if (!incomeName || !incomeDate || !incomeSelect || !incomeAmount) {
    errors.push({ message: "除「商家」外所有欄位為必填" });
  }
  if (errors.length > 0) {
    res.render("newIncome", {
      errors,
      incomeName,
      incomeDate,
      incomeSelect,
      incomeAmount,
    });
  } else {
    const income = new Income({
      name: incomeName,
      category: incomeSelect,
      date: incomeDate,
      amount: incomeAmount,
      merchant: incomeMerchant,
      userId: req.user._id,
    });
    income.save((err) => {
      if (err) console.error(err);
      return res.redirect("/");
    });
  }
});
//修改收入頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Income.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, income) => {
      if (err) return console.error(err);
      return res.render("incomeEdit", { income: income });
    });
});
//修改收入
router.put("/:id/edit", authenticated, (req, res) => {
  Income.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, income) => {
      if (err) return console.error(err);
      (income.name = req.body.incomeName),
        (income.date = req.body.incomeDate),
        (income.category = req.body.incomeSelect);
      income.amount = req.body.incomeAmount;
      income.save((err) => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});
//刪除收入
router.delete("/:id/delete", authenticated, (req, res) => {
  Income.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, income) => {
      if (err) return console.error(err);
      income.remove((err) => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});

module.exports = router;
