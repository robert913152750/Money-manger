const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const Income = require("../models/income");
const moment = require("moment");

const { authenticated } = require("../config/auth");
//顯示全部資料
router.get("/", authenticated, (req, res) => {
  let renderList = {};
  Record.find({ userId: req.user._id })
    .lean()
    .exec((err, records) => {
      if (err) return console.error(err);
      let totalAmount = 0;

      records.forEach((record) => {
        const category = record.category;
        return (record[category] = true);
      });

      for (let i = 0; i < records.length; i++) {
        //計算支出總價
        totalAmount += records[i].amount;
        //格式化日期
        let oldDate = records[i].date;
        records[i].date = moment(oldDate).format("YYYY-MM-DD");
      }

      renderList["recordsList"] = records;
      renderList["totalAmount"] = totalAmount;
    });

  Income.find({ userId: req.user._id })
    .lean()
    .exec((err, incomes) => {
      if (err) return console.error(err);
      let totalIncome = 0;

      incomes.forEach((incomes) => {
        const category = incomes.category;
        return (incomes[category] = true);
      });

      for (let i = 0; i < incomes.length; i++) {
        //計算收入總價
        totalIncome += incomes[i].amount;
        //格式化日期
        let oldDate = incomes[i].date;
        incomes[i].date = moment(oldDate).format("YYYY-MM-DD");
      }
      renderList["incomesList"] = incomes;
      renderList["totalIncome"] = totalIncome;
      renderList["balance"] = renderList.totalIncome - renderList.totalAmount;
      return res.render("index", renderList);
    });
});

//顯示支出與收入篩選資料 (增加日期篩選功能)
router.post("/filter", authenticated, (req, res) => {
  let dateSearch = req.body.dateSearch;
  console.log(dateSearch);
  let renderList = {};
  Record.find({ userId: req.user._id })
    .lean()
    .exec((err, records) => {
      if (err) return console.error(err);

      records.forEach((record) => {
        const category = record.category;
        return (record[category] = true);
      });

      let categorySearch = {};
      categorySearch.recordCategorySearch = req.body.recordCategorySearch;

      //判斷日期和類別
      let recordsDateMonth = records; //此變數是為了判斷日期而建立的變數
      renderList["recordsList"] = [];
      for (let i = 0; i < recordsDateMonth.length; i++) {
        let oldDate = recordsDateMonth[i].date;
        recordsDateMonth[i].date = moment(oldDate).format("YYYY-MM");
        if (categorySearch.recordCategorySearch === "全部") {
          if (recordsDateMonth[i].date === dateSearch) {
            renderList["recordsList"].push(recordsDateMonth[i]);
          }
        } else {
          if (
            recordsDateMonth[i].date === dateSearch &&
            recordsDateMonth[i].category === categorySearch.recordCategorySearch
          ) {
            renderList["recordsList"].push(recordsDateMonth[i]);
          }
        }
      }

      //計算支出總價和格式化日期
      let totalAmount = 0;
      for (let i = 0; i < renderList.recordsList.length; i++) {
        //計算支出總價
        totalAmount += renderList.recordsList[i].amount;
        //格式化日期
        let oldDate = renderList.recordsList[i].date;
        renderList.recordsList[i].date = moment(oldDate).format("YYYY-MM-DD");
      }

      renderList["recordCategorySearch"] = categorySearch.recordCategorySearch;
      renderList["totalAmount"] = totalAmount;
      renderList["dateSearch"] = dateSearch;
      console.log(renderList);
    });
  Income.find({ userId: req.user._id })
    .lean()
    .exec((err, incomes) => {
      if (err) return console.error(err);
      incomes.forEach((income) => {
        const category = income.category;
        return (income[category] = true);
      });
      categorySearch = {};
      categorySearch.incomeCategorySearch = req.body.incomeCategorySearch;

      //判斷日期和類別
      let incomesDateMonth = incomes; //此變數是為了判斷日期而建立的變數
      renderList["incomesList"] = [];
      for (let i = 0; i < incomesDateMonth.length; i++) {
        let oldDate = incomesDateMonth[i].date;
        incomesDateMonth[i].date = moment(oldDate).format("YYYY-MM");
        if (categorySearch.incomeCategorySearch === "全部") {
          if (incomesDateMonth[i].date === dateSearch) {
            renderList["incomesList"].push(incomesDateMonth[i]);
          }
        } else {
          if (
            incomesDateMonth[i].date === dateSearch &&
            incomesDateMonth[i].category === categorySearch.incomeCategorySearch
          ) {
            renderList["incomesList"].push(incomesDateMonth[i]);
          }
        }
      }

      let totalIncome = 0;

      for (let i = 0; i < renderList.incomesList.length; i++) {
        //計算收入總價
        totalIncome += renderList.incomesList[i].amount;
        //格式化日期
        let oldDate = renderList.incomesList[i].date;
        renderList.incomesList[i].date = moment(oldDate).format("YYYY-MM-DD");
      }

      renderList["incomeCategorySearch"] = categorySearch.incomeCategorySearch;
      renderList["totalIncome"] = totalIncome;
      renderList["balance"] = renderList.totalIncome - renderList.totalAmount;
      renderList["dateSearch"] = dateSearch;

      return res.render("index", renderList);
    });
});

module.exports = router;
