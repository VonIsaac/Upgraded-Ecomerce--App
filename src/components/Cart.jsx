
import Header from "./UI/Header";
import Footer from "./UI/Footer";
//import { Link } from "react-router-dom";
import { useQuery, useMutation} from "@tanstack/react-query";
import { getCart, deleteCart, queryClient } from "../utils/https";
import CartItems from "./CartItems";
import CheckoutModal from "./UI/CheckoutModal";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const navigate = useNavigate()

    // handle to delete data from the cart
    const {mutate, isPending} = useMutation({
        mutationFn: deleteCart,
        onSuccess: () => {
            navigate('/products')
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
                <>
                    <CartItems 
                        key = {cart.id} 
                        carts = {cart} 
                        //onClick={}
                        pending = {isPending}
                    >
                   <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-xl tracking-wide">Delete Item? </h3>
                            <p className="py-4 tracking-wider">You’re about to delete this item. Do you want to continue?</p>
                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <div  className="grid grid-cols-2 gap-4">
                                    <button className="btn" onClick={() => handleDeleteProduct(cart.id)}>Submit</button>
                                    <button className="btn">Cancel</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </dialog>
                   </CartItems>
                
                </>
                
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
                    <button className="btn btn-outline btn-primary" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                        Checkout
                    </button>
                    <CheckoutModal />
                </div>
                {content}
            </div>
        </main>
        <Footer />
        
        </>
    )
}

export default Cart;