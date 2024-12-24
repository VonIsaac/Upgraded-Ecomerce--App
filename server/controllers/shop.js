
const { where } = require('sequelize');
const Product = require('../models/product');
 
// get all products
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

// get a single product by id
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

// to get the cart from the user data
exports.getCart = (req, res, next) => {
    req.user.getCart() // one to one relationship 
    .then((cart) => {
        console.log(cart)
        return cart.getProducts() // Get all products in the cart, many-to-many relationship
        // wee need to nested .then() because wee need to get the products from the cart
        .then((products) => {
            console.log(products)
            // Send the products in the cart as a JSON response
            res.status(200).json({ cart: products });
        })
        .catch((err) => {
            console.log(err)
            res.status(406).json({ message: 'Cart did not fetch', error: err });
        });
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'An error occurred', error: err });
    });
}

//post a product to the cart
exports.postCart = (req, res, next) => {
    // get the product id
    const prodId = req.params.productId;
    let newQuantity = 1; // default quantity because we are adding a new product to the cart
    let fetchedCart; // variable to store the cart data

    req.user.getCart() // one to one relationship
    .then((getcart) => {
        console.log(getcart)
        fetchedCart = getcart; // store the cart data in the variable fetchedCart
        //wee use id in getPorducts because wee need to get the product in the cart
        return getcart.getProducts({where: {id: prodId}}) // Get the product in the cart, many-to-many relationship
    })
    .then(getproducts => {
        console.log(getproducts)
        // this line is to handle the quantity of the product in the cart
        let product;
        if(getproducts.length > 0 ){ // if the product is in the cart is greater than 0 
            product= getproducts[0]
        }
        // if wee have a product in the cart wee need to increase the quantity
        if(product){
             const oldQuantity = product.cartItem.quantity; // get the quantity of the product in the cart from the cartItem table
             newQuantity = oldQuantity + 1; // increase the quantity by 1
             return product; // return the product because we need to add the product to the cart
        }
        //wee return the product model by id  
        return Product.findByPk(prodId) // Get the product by ID
    })
    .then((productId) => {
        console.log(productId)
        // wee return fetchedCart bacause to  add a product to the cart or update the quantity of an existing product in the cart. 
        return fetchedCart.addProduct(productId, 
            {through: {quantity: newQuantity}  // Add the product to the cart
        }); // many-to-many relationship
    })
    .then(() => {
        res.status(201).json({ message: 'Product added to cart successfully' });
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'An error occurred', error: err });
    });

}