const express = require('express')

const router = express.Router()

const shopController = require('../controllers/shop')

router.get('/products', shopController.getProducts)
router.get('/products/:id', shopController.getIndexProducts)
router.get('/cart', shopController.getCart)
router.post('/cart/', shopController.postCart)

module.exports = router;