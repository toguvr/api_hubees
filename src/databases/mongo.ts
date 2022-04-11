const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const Extract = mongoose.model("Extract", {
  title: String,
  product: String,
  date: { type: Date, default: Date.now },
  quantity: Number,
  price_un: Number,
  total_price: Number,
});

export { Extract };
