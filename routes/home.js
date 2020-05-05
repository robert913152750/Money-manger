const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This app will be expense-tracker");
});

module.exports = router;
