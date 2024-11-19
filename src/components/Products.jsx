
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
                  
                  <label className="input input-bordered flex items-center gap-2 mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Title" name = "title"  id="title"/>
                  </label>

                  <label className="input input-bordered flex items-center gap-2 mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="ImageUrl" name="imageUrl" id="imageUrl" />
                  </label>
                  
                  
                  <label className="input input-bordered flex items-center gap-2 mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="number" className="grow" placeholder="Price" name="price" id="price" />
                  </label>
                  
                  <textarea className="textarea textarea-bordered mb-5" placeholder="Description" name="description" id="description"></textarea>
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