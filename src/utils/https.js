import { QueryClient } from "@tanstack/react-query";


export const queryClient = new QueryClient()

// for post a data product
 async function postProducts(productData){
    try{
        const response = await fetch('http://localhost:3000/add-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                title: productData.title,
                imageUrl: productData.imageUrl,
                price: productData.price,
                description: productData.description
            })
        });

        if(!response.ok){
            const error = new Error('An error occurred while creating the event');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }

        const data = await response.json();
        console.log(data)
        return data
    }catch(err){
        console.log(err)
    }
}

// get all products data
 async function getAllProducts({signal}){
    try{
        const response = await  fetch('http://localhost:3000/products', {signal});
        

        if(!response.ok){
            const error = new Error('An error occurred while fetching the event');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }

        const data = await response.json()
        console.log(data)
        return data
    }catch(err) {
        console.log(err);
        return null; // or return [];
    }
}

// get id of every product
 async function getIdProducts({id, signal}){
    try{
        const response = await fetch(`http://localhost:3000/products/${id}`, {signal})

        if(!response.ok){
            const error = new Error('An error occurred while fetching the event');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }

        const data = await response.json();
        console.log(data);
        return data
    }catch(err){
        console.log(err)
    }
}

// delete products
async function deleteProducts({id}){
    try{
        const response = await fetch(`http://localhost:3000/delete-products/${id}`, {
            method: 'DELETE',
        });
        if(!response.ok){
            const error = new Error('An error occurred while fetching the event');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }
        return response.json()
    }catch(err){
        console.log(err)
    }
}

// getting the data of a product to be edit
async function getEditProducts({ productId }) {
    try {
        const response = await fetch(`http://localhost:3000/edit-products/${productId}?edit=true`);
        if (!response.ok) {
            const error = new Error('An error occurred while fetching the product');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Error fetching product:', err);
    }
}


// edit the product
async function editProducts({ productId, updatedProduct }) {
    try {
        const response = await fetch(`http://localhost:3000/edit-products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
            const error = new Error('An error occurred while editing the product');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Error editing product:', err);
    }
}

// handle to post to data to cart 
async function postCart({productId}) {
    try {
        const response = await fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            //signal,
            body: JSON.stringify( {productId }), // Sending productId in the body
        });

        if (!response.ok) {
            const error = new Error('An error occurred while adding the product to the cart');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }

        const data = await response.json();
        console.log('Product added to cart:', data);
        return data;
    } catch (err) {
        console.error('Error adding product to cart:', err);
    }
}
// get the data when post to cart
async function getCart(getCartData){
    try{
        const response = await fetch('http://localhost:3000/cart', getCartData);
        
        if(!response.ok){
            const error = new Error('An error occurred while fetching the event');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }
        
        const data = await response.json();
        console.log(data);
        return data;
    }catch(err){
        console.log(err)
    }
}

// handle to delete the prduts from the cart
async function deleteCart({productId}){
    try{
        const response = await fetch('http://localhost:3000/delete-cart-item', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({productId})
        })

        if(!response.ok){
            const error = new Error('An error occurred while fetching the event');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }
        return response.json()

    }catch(err){
        console.log(err)
    }
}


// to post the orders 
async function postOrder(data) {
    try{
        const response = await fetch('http://localhost:3000/post-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data})
        })

        if(!response.ok){
            const error = new Error('An error occurred while fetching the event');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }

        return await response.json();
    }catch(err){
        console.log(err)
    }
}

// getting the order data 
async function getOrder(){
    try{
        const response = await fetch('http://localhost:3000/get-orders');
        if(!response.ok){
            const error = new Error('An error occurred while fetching the event');
            error.code = response.status;
            error.info = await response.json();
            throw error;
        }

        const data = await response.json();
        console.log(data);
        return data;
    }catch(err){
        console.log(err)
    }
}



export{
    postProducts, 
    getAllProducts, 
    getIdProducts,
    deleteProducts,
    getEditProducts,
    editProducts,
    postCart,
    getCart,
    deleteCart,
    postOrder,
    getOrder
} 