const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// @desc Get all products or filter by category
router.get('/', async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// @desc Add a new product
router.post('/', async (req, res) => {
  const { name, price, category } = req.body;
  try {
    const newProduct = new Product({ name, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;
