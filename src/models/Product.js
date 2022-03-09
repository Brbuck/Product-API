const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name_product: {
      type: String,
      required: true,
    },
    description_product: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
