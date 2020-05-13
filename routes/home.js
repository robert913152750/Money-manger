const express = require("express");
const router = express.Router();
const Record = require("../models/record");

router.get("/", (req, res) => {
  Record.find()
    .lean()
    .exec((err, records) => {
      if (err) return console.error(err);
      let totall = 0;

      records.forEach((record) => {
        const category = record.category;
        return (record[category] = true);
      });

      for (let i = 0; i < records.length; i++) {
        totall += records[i].amount;
      }
      return res.render("index", { records: records, totall: totall });
    });
});

module.exports = router;
