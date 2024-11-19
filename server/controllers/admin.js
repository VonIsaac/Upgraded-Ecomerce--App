const Product = require('../models/product');


exports.postProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl
    const price = req.body.price;
    const description = req.body.description;
   Product.create({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
   })
   .then((result) => {
        console.log(result)
   }).catch((err) => {
        console.log(err)
   });
}