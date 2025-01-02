
import Header from "./UI/Header";
import Footer from "./UI/Footer";
//import { Link } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import { getCart } from "../utils/https";
const Cart = () => {

    const {data} = useQuery({
        queryKey: ['get-cart'],
        queryFn: getCart,
        onSuccess: (data) => console.log("Fetched cart", data),
    })

   
    let content;
    if(data && data.carts){
        content =(
            <ul  className="grid gap-[150px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {data.carts.map((cart) => (
                 <li key={cart.id} className="card bg-base-100 w-96 shadow-xl">
                 <figure className="px-10 pt-10">
                   <img
                     src={cart.imageUrl}
                     alt="Shoes"
                     className="rounded-xl" />
                 </figure>
                 <div className=" m-3">
                    <p className=" text-end tracking-wider font-semibold">Quantity:{cart.cartItem.quantity}</p>
                 </div>
                 <div className="card-body items-center text-center">
                   <h2 className="card-title font-extrabold tracking-wider uppercase text-3xl">{cart.title}</h2>       
                    <p className=" text-start text-xl tracking-wider font-medium">{cart.description}</p>
                    <p className="  tracking-wider text-lg font-medium">Price:₱{cart.price}</p>
                   <div className="card-actions">
                   <button className="btn btn-outline btn-error btn-wide">Delete</button>
                   </div>
                 </div>
               </li>
            ))}
         </ul>
        )
    }

    return(
        <>
        <Header />
        <main>
            <div className="m-16">
                <h1 className="text-center text-5xl mb-5 font-extrabold tracking-wider">
                    Cart&apos;s
                </h1>
                {content}
            </div>
        </main>
        <Footer />
        
        </>
    )
}

export default Cart;