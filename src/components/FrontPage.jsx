//import Header from "./UI/Header"
import { Link} from "react-router-dom"
const FrontPage = () => {


    return(
      <>
       
        <main >
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: "url(https://i.pinimg.com/736x/13/c3/2c/13c32cbc3e656a88679bdd0b55a79f3c.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md ">
                <h1 className="mb-5 text-6xl font-bold tracking-wide leading-tight uppercase text-slate-950">Welcome to Products</h1>
                <p className="mb-5 text-stone-900 font-bold leading-tight">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                  quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary">
                  <Link to={'/products'}> Get Started</Link>
                </button>
              </div>
            </div>
          </div>
       </main>
      </>
    )
}

export default FrontPage