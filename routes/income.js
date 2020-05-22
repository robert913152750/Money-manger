const express = require("express");
const router = express.Router();
const Income = require("../models/income");

//新增收入頁面
router.get("/new/income", (req, res) => {
  return res.render("newIncome");
});
//新增收入
router.post("/new", (req, res) => {
  const income = new Income({
    name: req.body.incomeName,
    category: req.body.incomeSelect,
    date: req.body.incomeDate,
    amount: req.body.incomeAmount,
  });
  console.log(req.body);
  income.save((err) => {
    if (err) console.error(err);
    return res.redirect("/");
  });
});
//修改收入頁面
router.get("/:id/edit", (req, res) => {
  Income.findById(req.params.id)
    .lean()
    .exec((err, income) => {
      if (err) return console.error(err);
      return res.render("incomeEdit", { income: income });
    });
});
//修改收入
router.put("/:id/edit", (req, res) => {
  Income.findById(req.params.id, (err, income) => {
    if (err) return console.error(err);
    (income.name = req.body.incomeName),
      (income.date = req.body.incomeDate),
      (income.category = req.body.incomeSelect);
    income.amount = req.body.incomeAmount;
    income.save((err) => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});
//刪除收入
router.delete("/:id/delete", (req, res) => {
  Income.findById(req.params.id, (err, income) => {
    if (err) return console.error(err);
    income.remove((err) => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;