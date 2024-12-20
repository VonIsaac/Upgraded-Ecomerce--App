const express = require('express')

const router = express.Router()


const adminController = require('../controllers/admin');


router.post('/add-products', adminController.postProducts)
router.delete('/delete-products/:id', adminController.deleteProducts);
router.get('/edit-products/:productId', adminController.getEditProducts);
router.put('/edit-products/:productId', adminController.editProducts)
//router.get('/add-products/getAllproducts', adminController.getAllProducts)
module.exports = router;