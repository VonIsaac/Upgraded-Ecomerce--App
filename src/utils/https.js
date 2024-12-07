import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient()

// for post an image 
export async function postProducts(productData){
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
export async function getAllProducts({signal}){
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
    }catch(err){
        console.log(err)
    }
}

// get id of every product
export async function getIdProducts({id, signal}){
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