const mongoose = require("mongoose");
const Record = require("../record");
const Income = require("../income");
const recordList = require("./recordSeed.json");
const incomeList = require("../seeds/incomeSeed.json");

mongoose.connect("mongodb://localhost/expense", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected");
  const listRecord = recordList.results;
  const listIncome = incomeList.results;

  for (i = 0; i < listRecord.length; i++) {
    Record.create({
      name: listRecord[i].name,
      category: listRecord[i].category,
      date: listRecord[i].date,
      amount: listRecord[i].amount,
    });
  }

  for (i = 0; i < listIncome.length; i++) {
    Income.create({
      name: listIncome[i].name,
      category: listIncome[i].category,
      date: listIncome[i].date,
      amount: listIncome[i].amount,
    });
  }
});
