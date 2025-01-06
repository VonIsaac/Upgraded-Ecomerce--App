import { getOrder } from "../utils/https";
import { useQuery } from "@tanstack/react-query";
import Header from "./UI/Header";
import Footer from "./UI/Footer";

const Orders = () => {
    const {data, } = useQuery({
        queryKey: ['get-order'],
        queryFn: getOrder,
    })


    //format date to readable format
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric',  hour: 'numeric',  minute: 'numeric', hour12: true,} 
        return new Date(date).toLocaleDateString("en-PH", options)
      } 

    let content; 

    if (data && data.order) {
        content = (
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-lg tracking-wide">ID</th>
                            <th className="text-lg tracking-wide">Title</th>
                            <th className="text-lg tracking-wide">Price</th>
                            <th className="text-lg tracking-wide">Quantity</th>
                            <th className="text-lg tracking-wide">Created</th>
                            <th className="text-lg tracking-wide">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.order.map((order) =>
                            order.produktos.map((produkt) => (
                                <tr key={`${order.id}-${produkt.id}`}>
                                    <td>{order.id}</td>
                                    <td>{produkt.title}</td>
                                    <td>₱{produkt.price}</td>
                                    <td>{produkt.orderItem.quantity}</td>
                                    <td>{formatDate(produkt.createdAt)}</td>
                                    <td>{formatDate(produkt.createdAt)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
       <>
        <Header />
        <main className="m-16">
            <div className=" my-7">
                <h1 className="text-center text-3xl mb-3 font-extrabold tracking-wide">Thank You for Your Order!</h1>
                <p className=" text-center text-lg tracking-wider font-bold mb-2">
                    Your order has been successfully placed!
                    We&apos;re preparing it for delivery and will keep you updated. Thanks for choosing us!
                </p>
                <p className=" font-bold tracking-wide">List of Order&apos; Today:</p>
            </div>
            {content}
        </main>
       <Footer />
       </>
    );
}

export default Orders;