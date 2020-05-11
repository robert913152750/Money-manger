const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) return console.error(err);
      let totall = 0;
      for (let i = 0; i < records.length; i++) {
        totall += records[i].amount;
      }
      console.log(totall);
      return res.render("index", { records: records, totall: totall });
    });
});

module.exports = router;
