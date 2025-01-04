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
                <h1 className="mb-5 text-6xl font-bold tracking-wide leading-tight uppercase text-slate-950">Welcome to SnapBuy</h1>
                <p className="mb-5 text-xl tracking-wide leading-relaxed font-bold text-slate-950">The best place to shop for your favorite products</p>
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