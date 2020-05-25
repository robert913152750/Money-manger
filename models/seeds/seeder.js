const mongoose = require("mongoose");
const User = require("../user");
const Record = require("../record");
const Income = require("../income");
const userList = require("../seeds/userSeed.json");
const recordList = require("./recordSeed.json");
const incomeList = require("../seeds/incomeSeed.json");
const bcrypt = require("bcryptjs");

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
  const listUser = userList.results;
  const listRecord = recordList.results;
  const listIncome = incomeList.results;

  const user1 = new User({
    name: listUser[0].name,
    email: listUser[0].email,
    password: listUser[0].password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user1.password, salt, (err, hash) => {
      if (err) throw err;
      user1.password = hash;
      user1.save();
    });
  });

  for (i = 0; i < listRecord.length; i++) {
    Record.create({
      name: listRecord[i].name,
      category: listRecord[i].category,
      date: listRecord[i].date,
      amount: listRecord[i].amount,
      userId: user1._id,
    });
  }

  for (i = 0; i < listIncome.length; i++) {
    Income.create({
      name: listIncome[i].name,
      category: listIncome[i].category,
      date: listIncome[i].date,
      amount: listIncome[i].amount,
      userId: user1._id,
    });
  }
});

console.log("data seed has already create!");
