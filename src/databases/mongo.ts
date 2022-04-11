const mongoose = require("mongoose");

const mongoPass = "mongodb://localhost:27017/hubees";
const mongo2 = "mongodb://hubees:123456@localhost:27017/mongo_hubees";
mongoose.connect(mongoPass);

const Extract = mongoose.model("Extract", {
  title: String,
  date: { type: Date, default: Date.now },
  quantity: Number,
  price_un: Number,
  total_price: Number,
});

export { Extract };
