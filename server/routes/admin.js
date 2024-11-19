const express = require('express')

const router = express.Router()


const adminController = require('../controllers/admin');


router.post('/add-products', adminController.postProducts)

module.exports = router;