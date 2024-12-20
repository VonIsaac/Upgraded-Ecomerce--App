//const Product = require('../models/product');

const Product = require("../models/product");




exports.postProducts = (req, res, next) => {
     const { title, imageUrl, price, description } = req.body;

     //check if wee have request
     /*if(!req.user){
          return res.status(400).json({
               message: 'No user associated with the request. Please ensure a user exists.',
          })
     }*/
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
       return  res.status(201).json({
            message: 'Product created successfully',
            product: product,
        });
   }).catch((err) => {
     console.error('Error details:', err);
     return res.status(500).json({
         message: 'Failed to create product',
         error: err.message, // Include the error message in the response
     });
 });

}

//delete product
exports.deleteProducts = (req, res, next) => {
    //call the id 
    const {id} = req.params;
  
    Product.findByPk(id)
     // the first .then() is to wait for finByPk to complete
    .then(product => {        
        console.log(product)
        // Delete the product

            return product.destroy()
        
    })
    // after i return , the data will be deleted 
    // i use second  .then() to succesfully delete the data
    .then((result) => {
        if (result) {
            // If the deletion is successful, respond with a success message
            console.log(result);
            return res.status(200).json({
                message: 'Product deleted successfully.',
            });
        }
    })
    .catch((err) => {
        // Handle errors and respond with a 500 status
        console.error('Error details:', err);
       return res.status(500).json({
            message: 'Failed to delete product.',
            error: err.message, 
        });
    }); 
}

//get the data of a product to be edit
exports.getEditProducts =(req, res, next) => {
    //acces the productId
    const editMode = req.query.edit === 'true';
    if(!editMode){
        return res.status(400).json({ message: 'Edit mode not enabled' });
    }

    const prodId = req.params.productId;
    // pass the id in idPk by sequelize
    Product.findByPk(prodId)
    .then((products) => {
        console.log(products);
        if(!products){
            return res.status(404).json({ message: 'Product not found' });
        }
        //send status if wee succed
        res.status(200).json(products);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Error fetching product' });
    })
}

// to edit the data 
exports.editProducts = (req, res, next) => {
    // stored the existing products data
    const { title, imageUrl, price, description } = req.body;
    const prodId = req.params.productId;
     //call the findpk to pass an id
    Product.findByPk(prodId)
    .then((product) => {
        console.log(product)
        //use our model and defined the product attrubutes
        product.title = title
        product.imageUrl = imageUrl
        product.price = price
        product.description = description

        //saved all the data back to our db
        return product.save()

    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to edit products',
            error: err.message, // Include the error message in the response
        });
    })

}

