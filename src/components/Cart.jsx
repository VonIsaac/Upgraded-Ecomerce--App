
import Header from "./UI/Header";
import Footer from "./UI/Footer";
//import { Link } from "react-router-dom";
import { useQuery, useMutation} from "@tanstack/react-query";
import { getCart, deleteCart, queryClient } from "../utils/https";
import CartItems from "./CartItems";
const Cart = () => {
    

    // handle to delete data from the cart
    const {mutate, isPending} = useMutation({
        mutationFn: deleteCart,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['delete-items'],
                refetchType: 'none'
            })
        },
        onError: (error) => {   
            console.error('Error deleting product:', error);
        }
    })

    const handleDeleteProduct = (productId) => {
        console.log('Deleting product:', productId);
        mutate({productId})
    }


    // handle to get data from the cart
    const {data} = useQuery({
        queryKey: ['get-cart'],
        queryFn: getCart,
        onSuccess: (data) => console.log("Fetched cart", data),
    })

   
    let content;
    if(data && data.carts){
        content =(
            <ul  className="grid gap-[120px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
            {data.carts.map((cart) => (
                 <CartItems 
                  key = {cart.id} 
                  carts = {cart} 
                  onclick = {() => handleDeleteProduct(cart.id)} 
                  pending = {isPending}
                />
            ))}
         </ul>
        )
    }

   
    return(
        <>
        <Header />
        <main>
            <div className="m-10"> 
                <div className="flex justify-between items-center m-10">
                    <h1 className=" text-5xl mb-5 font-extrabold tracking-wider">
                        Cart&apos;s
                    </h1>
                    <button className="btn btn-outline btn-primary">Checkout</button>
                </div>
                {content}
            </div>
        </main>
        <Footer />
        
        </>
    )
}

export default Cart;