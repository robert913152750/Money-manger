const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  merchant: {
    type: String,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    require: true,
  },
});

module.exports = mongoose.model("Income", incomeSchema);
