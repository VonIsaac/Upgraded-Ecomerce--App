

const Product = require('../models/product');
 
// get all products
exports.getProducts = (req, res, next) => {
Product.findAll()
.then((product) => {
    res.status(201).json( product);
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
     res.status(201).json({
        message: 'Product id created successfully',
        product: products,
    });
   }).catch((err) => {
    console.log(err)
    // if wee got an error wee got 500 for sever
    res.status(500).json({ message: 'Product did not get the id ', error: err });
   });
}

 /* exports.getCart = (req, res, next) => {
    req.user.getCart() // one to one relationship 
    .then((cart) => {
        console.log(cart)
        return cart.getProduktos() // Get all products in the cart, many-to-many relationship
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
}*/

    
// to get the cart from the user data
exports.getCart = (req, res) => {
    //const {productId} = req.body;
    //console.log(req.user.cart)
    req.user.getCart() // one to one relationship
      .then((cart) => {
        console.log('i got a cart maybe?',cart)
        if (!cart) {
          // If no cart exists, handle it (e.g., create a new cart or send an error response)
          res.status(404).json({ message: 'Cart not found' });
         return null; // To stop further execution
        }
        // Fetch all products associated with this cart
        console.log('Cart found:', cart.id);
        return cart.getProduktos() // This uses the alias 'products' defined in the association, many-to-many relationship
        .then(produktos => {
            console.log('Fetched products in cart:', produktos);
            // Send the products in the response
           return res.status(200).json({
                cosole: console.log('i got product??', produktos),
                message: 'Cart fetched successfully',
                carts: produktos
            });
          })
      })
      .catch((err) => {
        console.error('Error fetching cart:', err);
        res.status(500).json({ message: 'Failed to fetch cart', error: err });
      });
  };

  
//post a product to the cart
exports.postCart = (req, res) => {
    // get the product id 
    const {productId} = req.body; // Accessing data from the body
   // console.log('Product ID received:', productId); 
    let newQuantity = 1; // default quantity because we are adding a new product to the cart
    let fetchedCart; // variable to store the cart data

    req.user.getCart() // one to one relationship
    .then((cart) => {
        console.log(cart)
        if (!cart) {
            throw new Error('Cart not found');
          }
        fetchedCart = cart; // store the cart data in the variable fetchedCart
        //wee use id in getPorducts because wee need to get the product in the cart
        return cart.getProduktos({where: {id:  productId}}) // Get the product in the cart, many-to-many relationship
    })
    .then(produktos => {
        console.log(produktos)
        // this line is to handle the quantity of the product in the cart
        let product;
        if(produktos.length > 0 ){ // if the product is in the cart is greater than 0 
            product = produktos[0] // the value of product is the first product in the cart
        }

        // if wee have a product in the cart wee need to increase the quantity
        if(product){
             const oldQuantity = product.cartItem.quantity; // get the quantity of the product in the cart from the cartItem table
             newQuantity = oldQuantity + 1; // increase the quantity by 1
             return product; // return the product because we need to add the product to the cart
        }
        //wee return the product model by id  
        return Product.findByPk(productId) // Get the product by ID
    })
    .then((product) => {
        console.log(product)
        // wee return fetchedCart bacause to  add a product to the cart or update the quantity of an existing product in the cart. 
        return fetchedCart.addProduktos(product,{
            through: {quantity: newQuantity}  // Add the product to the cart
        }); // many-to-many relationship
    })
    .then(() => {
        console.log('Product added to cart successfully')
         res.status(201).json({ message: 'Product added to cart successfully (postCART)' });
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({ message: 'product did not add to the cart', error: err });
    });

}

//delete product from the cart
exports.deleteCartItem = (req, res) => {
    const {productId} = req.body; // Accessing data from the body
    req.user.getCart() // one to one relationship
    .then((cart) => {
        //check if wee not have a cart
        if(!cart){
            return res.status(404).json({ message: 'Cart not found' });
        }

        // return the cart with the getProduktos to combinme products and cart
        return cart.getProduktos({where: {id: productId}}) // Get the product in the cart, many-to-many relationship
       
    })
    .then(produktos => {
        // create a variable then stored the first element of an array of products
        const produkto = produktos[0]
        
        // then  acces the cartItem in the in between tabele and then delete the product using destroy()
        produkto.cartItem.destroy() // Delete the product from the cart
    })
    .then(() => {
        console.log('Product deleted from cart successfully');
        res.status(200).json({ message: 'Product deleted from cart successfully' });
    })
    .catch((err) => {
        console.error('Error fetching cart:', err);
        res.status(500).json({ message: 'Failed to delete cart', error: err });
      });

}