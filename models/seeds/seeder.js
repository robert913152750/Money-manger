const mongoose = require("mongoose");
const Record = require("../record");
const recordList = require("./recordSeed.json");

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
  const list = recordList.results;

  for (i = 0; i < list.length; i++) {
    Record.create({
      name: list[i].name,
      category: list[i].category,
      date: list[i].date,
      amount: list[i].amount,
    });
  }
});
