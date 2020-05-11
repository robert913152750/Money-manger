const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("瀏覽全部支出");
});

router.get("/new", (req, res) => {
  res.send("新增支出頁面");
});

router.post("/new", (req, res) => {
  res.send("建立支出");
});

router.get("/:id/edit", (req, res) => {
  res.send("修改特定支出的表單");
});

router.post("/:id/edit", (req, res) => {
  res.send("修改特定支出");
});

router.post("/:id/delete", (req, res) => {
  res.send("刪除紀錄");
});

module.exports = router;
