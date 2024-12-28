
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import { Link } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import { getCart } from "../utils/https";
const Cart = () => {

    const {data} = useQuery({
        queryKey: ['get-cart'],
        queryFn: getCart,
        onSuccess: (data) => console.log("Fetched cart", data),
    })

    let content; 
    if(data && data.cart){
        content = (
            <ul  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
               {data.cart.map((cart) => (
                    <li key={cart.id} className="card bg-base-100 w-96 shadow-xl">
                    <figure className="px-10 pt-10">
                      <img
                        src={cart.imageUrl}
                        alt="Shoes"
                        className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                      <h2 className="card-title">{cart.title}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
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
            <div>
                {content}
            </div>
        </main>
        <Footer />
        
        </>
    )
}

export default Cart;