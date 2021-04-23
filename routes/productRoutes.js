const express = require("express");

// Try; Catch; error handler
const asyncHandler = require("express-async-handler");
const router = express.Router();
const Product = require("../models/productModel.js");

// Fetch all products - GET /api/products
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    console.log(Product)
    res.json(products)
  }))
  
  // Fetch single product - GET /api/products/:id
  router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

        if(product) {
            res.json(product)
            console.log(product)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
  }))

module.exports = router