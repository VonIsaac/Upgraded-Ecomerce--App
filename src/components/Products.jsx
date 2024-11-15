
import Header from "./UI/Header";
import { dummyProducts } from "../utils/products";
import Modal from "./UI/Modal";
import { Outlet } from "react-router-dom";
const Products = () => {

    return(
      <>
        <header className=" m-3 flex justify-center items-center ">
            <Header />
        </header>
        
        <main className="bg-base-200">
            <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-5xl font-bold">Box Office News!</h1>
                            <p className="py-6">
                                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id nisi.
                            </p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
            </div>

            <section >
                <Modal>
                  <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" />

                    <label htmlFor="imageUrl">ImageUrl</label>
                    <input type="text" name="imageUrl" id="imageUrl" />

                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" />

                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description"></textarea>
                    <button type="submit"></button>
                  </div>
                </Modal>
                <h1 className="text-5xl font-bold  text-center tracking-wide mt-6 mb-10">Our Products</h1>
                <ul className="flex flex-wrap justify-center gap-12 mt-5 mb-[200px]">
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
                  <div>
                    
                   
                  </div>
            </section>
            
        </main>
        <Outlet />
      </>
        
    )
}   

export default Products