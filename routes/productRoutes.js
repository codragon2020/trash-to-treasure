const express = require("express");

// Try; Catch; error handler
const asyncHandler = require("express-async-handler");
const router = express.Router();
const Product = require("../models/productModel.js");

// Fetch all products - GET /api/products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    console.log(Product);
    res.json(products);
  })
);

// Fetch single product - GET /api/products/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
      console.log(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

// Post single product - POST /api/products
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      contact_name,
      contact_phone,
      contact_email,
      image,
    } = req.body;

    if (
      !name ||
      !price ||
      !description ||
      !contact_name ||
      !contact_phone ||
      !contact_email ||
      !image
    ) {
      return res.status(422).send("Product missing one or morefields");
    }
    const product = await new Product({
      name,
      price,
      description,
      contact_name,
      contact_phone,
      contact_email,
      image,
    }).save();
    console.log("hello binaya is in product");
    res.status(201).json(product);
  })
);

//delete check
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    res.status(204).json({});
  })
);

// //post
// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const product = await Product.findOneAndUpdate({ })

//     // const product = await Product.findOneAndDelete({ _id: req.params.id });
//     res.status(204).json({});
//   })
// );

module.exports = router;
