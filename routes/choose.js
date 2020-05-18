const express = require("express");
const router = express.Router();

router.get("/event", (req, res) => {
  res.redirect("../views/choose.handlebars");
});

module.exports = router;
