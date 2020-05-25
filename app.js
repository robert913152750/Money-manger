//require express and some base setting
const express = require("express");
const app = express();
// 判別開發環境
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const exphbs = require("express-handlebars"); //require express-handlebars
const bodyParser = require("body-parser"); //require body-parser
app.use(bodyParser.urlencoded({ extended: true })); //設定 body-parser
const methodOverride = require("method-override"); //require method-override
const session = require("express-session");
const passport = require("passport");
//tell express use handlebars to be template engine and set "main" for defaulted layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting method-override
app.use(methodOverride("_method"));

//setting mongoDB
mongoose.connect("mongodb://localhost/expense", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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

//session setting
app.use(
  session({
    secret: "udjniwhd5683",
    resave: false,
    saveUninitialized: true,
  })
);

//use passport
app.use(passport.initialize());
app.use(passport.session());

//require passport config
require("./config/passport")(passport);

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});
//require Record model
const Record = require("./models/record");

//require Income model
const Income = require("./models/income");

//load routes
app.use("/", require("./routes/home"));
app.use("/expense", require("./routes/record"));
app.use("/income", require("./routes/income"));
app.use("/choose", require("./routes/choose"));
app.use("/users", require("./routes/user"));
app.use("/auth", require("./routes/auths"));
//listen express
app.listen(3000, () => {
  console.log("App is running");
});
