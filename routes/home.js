const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const Income = require("../models/income");

router.get("/", (req, res) => {
  let renderList = {};
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) return console.error(err);
      let totalAmount = 0;

      records.forEach((record) => {
        const category = record.category;
        return (record[category] = true);
      });

      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount;
      }

      renderList["recordsList"] = records;
      renderList["totalAmount"] = totalAmount;
    });

  Income.find()
    .lean()
    .exec((err, incomes) => {
      if (err) return console.error(err);
      let totalIncome = 0;

      incomes.forEach((incomes) => {
        const category = incomes.category;
        return (incomes[category] = true);
      });

      for (let i = 0; i < incomes.length; i++) {
        totalIncome += incomes[i].amount;
      }
      renderList["incomesList"] = incomes;
      renderList["totalIncome"] = totalIncome;
      renderList["balance"] = renderList.totalIncome - renderList.totalAmount;
      return res.render("index", renderList);
    });
});

module.exports = router;
