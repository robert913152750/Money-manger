const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const Income = require("../models/income");

//顯示全部資料
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

//顯示支出與收入篩選資料
router.post("/filter", (req, res) => {
  let renderList = {};
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) return console.error(err);

      records.forEach((record) => {
        const category = record.category;
        return (record[category] = true);
      });

      let categorySearch = {};
      categorySearch.recordCategorySearch = req.body.recordCategorySearch;
      if (categorySearch.recordCategorySearch === "全部") {
        renderList["recordsList"] = records;
      } else {
        renderList["recordsList"] = records.filter((item) => {
          return item.category === categorySearch.recordCategorySearch;
        });
      }
      console.log(categorySearch);
      let totalAmount = 0;

      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount;
      }

      renderList["recordCategorySearch"] = categorySearch.recordCategorySearch;
      renderList["totalAmount"] = totalAmount;
    });
  Income.find()
    .lean()
    .exec((err, incomes) => {
      if (err) return console.error(err);
      incomes.forEach((income) => {
        const category = income.category;
        return (income[category] = true);
      });
      categorySearch = {};
      categorySearch.incomeCategorySearch = req.body.incomeCategorySearch;
      if (categorySearch.incomeCategorySearch === "全部") {
        console.log("In income if");
        renderList["incomesList"] = incomes;
      } else {
        console.log("In income else");
        renderList["incomesList"] = incomes.filter((item) => {
          if (item.category === categorySearch.incomeCategorySearch) {
            return item;
          }
        });
      }

      let totalIncome = 0;

      for (let i = 0; i < incomes.length; i++) {
        totalIncome += incomes[i].amount;
      }

      renderList["incomeCategorySearch"] = categorySearch.incomeCategorySearch;
      renderList["totalIncome"] = totalIncome;
      renderList["balance"] = renderList.totalIncome - renderList.totalAmount;

      return res.render("index", renderList);
    });
});

module.exports = router;
