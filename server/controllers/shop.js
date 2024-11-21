
const Product = require('../models/product');
 

/*exports.getProducts = (req, res, next) => {

}*/

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