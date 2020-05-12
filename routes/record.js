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
  Record.findById(req.params.id)
    .lean()
    .exec((err, record) => {
      if (err) return console.error(err);
      return res.render("edit", { record: record });
    });
});

router.post("/:id/edit", (req, res) => {
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

router.post("/:id/delete", (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err);
    record.remove((err) => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
