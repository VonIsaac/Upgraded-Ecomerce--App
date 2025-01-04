
const ProductDetails = ({product, onClick, pending, children }) => {

    return(
        <li  className="card bg-base-100 w-96 shadow-xl ">
        <figure>
          <img
            src={product.imageUrl}
            alt={product.title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title uppercase text-2xl tracking-wide font-extrabold">{product.title}</h2>
          <p className="tracking-wide">₱{product.price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={onClick}>
              {pending ? 'Adding to cart...' : 'Add to cart'}
            </button>
            {children}
          </div>
        </div>
      </li>
    )
}
export default ProductDetails;