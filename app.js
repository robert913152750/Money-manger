//require express and some base setting
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//require express-handlebars
const exphbs = require("express-handlebars");

//tell express use handlebars to be template engine and set "main" for defaulted layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting mongoDB
mongoose.connect("mongodb://localhost/expense", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection; //連線後拿到connection 物件

//db 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

//db 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

//載入 Record model
const Record = require("./models/record");

//load routes
app.use("/", require("./routes/home"));
app.use("/expense", require("./routes/record"));
//listen express
app.listen(3000, () => {
  console.log("App is running");
});