
const Product = require('../models/product');
 

exports.getProducts = (req, res, next) => {

Product.findAll()
.then((product) => {
    res.status(201).json({
        message: 'Product created successfully',
        product: product,
    });
})
.catch(err => {
    console.error('Error details:', err);
    res.status(500).json({
        message: 'Failed to create product',
        error: err.message, // Include the error message in the response
    });
}) 

}

exports.getIndexProducts = (req, res, next) => {
    //use and id 
    const {id} = req.params;

   Product.findByPk(id)
   .then((products) => {
    // if wee dont have a product wee got 404 client
    if(!products){
        return res.status(404).json({ message: 'Product not found' });
    }
     // Send the product data as a JSON response
    res.status(200).json(products);
   }).catch((err) => {
    console.log(err)
    // if wee got an error wee got 500 for sever
    res.status(500).json({ message: 'An error occurred', error: err });
   });
}