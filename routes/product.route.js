const express = require('express');
const   produtcController = require('../controllers/product.controller');

const router = express.Router();

router
 .route('/')
 .get(produtcController.getProduct)
 .post(produtcController.createProduct)

 module.exports = router;