import { getAllProducts } from "../utils/https"
import { useQuery } from "@tanstack/react-query"
import Loading from "./UI/Loading"
import ErrorBlock from "./UI/Error" 
import Header from "./UI/Header"
import Footer from "./UI/Footer"
import Link from "antd/es/typography/Link"

const Admin = () => {

    const {data, isPending, isError} = useQuery({
        queryKey: ['admin-get-all'],
        queryFn: ({signal}) => getAllProducts({signal})
    });

    let content 

    if(isPending){
        content = <Loading />
    }

    if(isError){
        <ErrorBlock />
    }
    

    //format date to readable format
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric',  hour: 'numeric',  minute: 'numeric', hour12: true,} 
        return new Date(date).toLocaleDateString("en-PH", options)
      } 


    if (data) {
        content = (
          <div className="overflow-x-auto m-16">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th className=" text-lg tracking-wide">Title</th>
                  <th className=" text-lg tracking-wide">Price</th>
                  <th className=" text-lg tracking-wide">Description</th>
                  <th className=" text-lg tracking-wide">Created At</th>
                  <th className=" text-lg tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.product.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{formatDate(product.createdAt)}</td>
                    <td className="justify-evenly flex items-center">
                        <button className="btn btn-success tracking-wide">Edit </button>
                        <button className="btn btn-error tracking-wide">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      
         
    return(
     <>
        <Header />
        <main className="m-16">
            {content}
            <div className="join grid grid-cols-2">
                <button className="join-item btn btn-outline">
                    <Link to ='../'>
                        Previous page
                    </Link>
                </button>
                <button className="join-item btn btn-outline">
                    Next
                </button>
            </div>
        </main>
        <Footer />

     </>
        
    )
}

export default Admin