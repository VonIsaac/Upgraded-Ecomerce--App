
import Header from "./UI/Header"
const Products = () => {

    return(
      <>
        <header className=" m-3 flex justify-center items-center ">
            <Header />
        </header>
        
        <main>
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
        </main>
      </>
        
    )
}   

export default Products