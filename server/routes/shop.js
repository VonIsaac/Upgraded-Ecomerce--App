const express = require('express')

const router = express.Router()

const shopController = require('../controllers/shop')

router.get('/products', shopController.getProducts);
router.get('/products/:id', shopController.getIndexProducts);
router.get('/cart', shopController.getCart);
router.post('/cart/', shopController.postCart);
router.delete('/delete-cart-item', shopController.deleteCartItem);
router.post('/post-order', shopController.postOrder);
router.get('/get-orders', shopController.getOrders);

module.exports = router;