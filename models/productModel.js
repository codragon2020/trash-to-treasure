const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    brand: {
      type: String,
      required: false
    },
    category: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0
    },
    contact_email: {
      type: String,
      required: true
    },
    contact_phone: {
      type: String,
      required: true
    },
    contact_name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
