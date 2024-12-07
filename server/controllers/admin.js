//const Product = require('../models/product');




exports.postProducts = (req, res, next) => {
     const { title, imageUrl, price, description } = req.body;

     //check if wee have request
     if(!req.user){
          return res.status(400).json({
               message: 'No user associated with the request. Please ensure a user exists.',
          })
     }
     //check if wee have an and title, image etc...
     if(!title || !imageUrl || !price || !description){
          return res.status(400).json({
               message: 'All fields (title, imageUrl, price, description) are required.',
           });
     }
     req.user.createProduct({
          title: title,
          price: price,
          imageUrl: imageUrl,
          description: description,
         // productId: req.user.id, // Ensure the `userId` field is properly set in your model
     })
   .then((product) => {
        console.log(product)
        // Respond with the created product
        res.status(201).json({
            message: 'Product created successfully',
            product: product,
        });
   }).catch((err) => {
     console.error('Error details:', err);
     res.status(500).json({
         message: 'Failed to create product',
         error: err.message, // Include the error message in the response
     });
 });
 console.log('Request User:', req.user);
console.log('Request Body:', req.body);
}

/*exports.getAllProducts = (req, res, next) => {

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
     
     }*/