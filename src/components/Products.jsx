
import Header from "./UI/Header";
import { dummyProducts } from "../utils/products";
import Modal from "./UI/Modal";
import { Outlet, Link, useNavigate  } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loading from "./UI/Loading";
import { getAllProducts, postCart, queryClient } from "../utils/https";
import ErrorBlock from "./UI/Error";
import Footer from "./UI/Footer";



const Products = () => {

  const navigate = useNavigate();

  // to upload data to the cart
  const { mutate: postAddToCart, isLoading: postCartPending } = useMutation({
    mutationFn: postCart,
    onSuccess: () => {
      //upon succes navigate to the cart page
      navigate('/cart');
      queryClient.invalidateQueries({
        queryKey: ['post-cart'],
      });                                     
      
    },
    onError: (error) => {
      console.error('Error adding product to cart:', error);
    },
});

// handle to add product to the cart
const handleAddToCart = (productId) => {
  console.log('Adding to cart:', productId);
  postAddToCart({productId} ); // Pass the productId as expected by postCart
};

  // to get data when adding a product.
  const {data, isPending, isError} = useQuery({
    queryKey: ['get-products'],
    queryFn: ({signal}) => getAllProducts({signal}),
    onSuccess: (data) => console.log("Fetched data:", data),
  })

  let content;

  if(isPending){
    content = <Loading />
  }

  if(isError){
    content = <ErrorBlock  title="An error occurred" message= 'Failed to fetch events' />
  }

  if(data){
    content = (
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {data.map((product) => (
          <li key={product.id} className="card bg-base-100 w-96 shadow-xl ">
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
                <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>
                  {postCartPending ? 'Adding to cart...' : 'Add to cart'}
                </button>
                <Link to={`/products/${product.id}`} className="btn btn-neutral" onClick={()=>document.getElementById('my_modal_2').showModal()}>
                  Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const modal = <Modal />
    return(
      <>
      
        <header className=" m-3 flex justify-center items-center ">
            <Header />
        </header>
        
        <main className="bg-base-200">
            <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row">
              
                        <div>
                            <h1 className="text-[85px] font-bold tracking-wide">SnapBuy</h1>
                            <p className="py-6 tracking-wide leading-relaxed font-bold text-lg">
                              With SnapBuy, you can find premium goods at affordable costs,
                              whether you&apos;re searching for the newest technology, stylish clothing, or daily necessities. 
                              Additionally, shopping has never been easier or safer thanks to lightning-fast checkout and safe payment methods.
                            </p>
                            {modal}
                        </div>
                    </div>
            </div>

            <section >
                <h1 className="text-5xl font-bold  text-center tracking-wide mt-6 mb-10">Our Products</h1>
                <ul className="flex flex-wrap justify-center gap-12 mt-5 mb-[50px]">
                  {dummyProducts.map((product, index) => (
                    <li key={index} className="card bg-base-100 w-72 h-[28rem] mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                        <figure>
                          <img src={product.img} alt={product.alt}  />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">
                            {product.name} 
                            <div className="badge badge-secondary">NEW</div>
                          </h2>
                          <p>{product.description || "If a dog chews shoes whose shoes does he choose?"}</p>
                          <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                          </div>
                        </div>
                    </li>
                  ))}
                </ul>

                  {/* this line display the data that wee add */}
                  <div className=" m-10 mb-16">  
                    {content}
                  </div>
            </section>
            
        </main>
        <Footer />
        <Outlet />
      </>
        
    )
}   

export default Products