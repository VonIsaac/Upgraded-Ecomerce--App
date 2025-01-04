
const CartItems = ({carts, onclick, pending}) => {
    return(
        <li className="card bg-base-100 w-96 shadow-xl">
                 <figure className="px-10 pt-10">
                   <img
                     src={carts.imageUrl}
                     alt="Shoes"
                     className="rounded-xl" 
                    />
                 </figure>
                 <div className=" m-3">
                    <p className=" text-end tracking-wider font-semibold">Quantity:{carts.cartItem.quantity}</p>
                 </div>
                 <div className="card-body items-center text-center">
                   <h2 className="card-title font-extrabold tracking-wider uppercase text-3xl">{carts.title}</h2>       
                    <p className="  text-xl tracking-wider font-medium">{carts.description}</p>
                    <p className="  tracking-wider text-lg font-medium">Price:₱{carts.price}</p>
                   <div className="card-actions">
                   <button className="btn btn-outline btn-error btn-wide" onClick={onclick}>
                        {pending ? 'Deleting...' : 'Delete'}
                    </button>
                   </div>
                 </div>
               </li>
    )
}

export default CartItems;