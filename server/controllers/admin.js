const Product = require('../models/product');


exports.postProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl
    const price = req.body.price;
    const description = req.body.description;
   req.user.createProducts({ // one to many
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
   })
   .then((result) => {
        console.log(result)
        // Respond with the created product
        res.status(201).json({
            message: 'Product created successfully',
            product: result,
        });
   }).catch((err) => {
        console.log(err)
          // Respond with an error message
          res.status(500).json({
               message: 'Failed to create product',
               error: err,
           });
   });
}