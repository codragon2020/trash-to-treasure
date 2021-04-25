const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
      }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
      }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
})
  