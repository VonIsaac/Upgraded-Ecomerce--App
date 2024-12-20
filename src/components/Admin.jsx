  import { getAllProducts, deleteProducts, queryClient } from "../utils/https"
  import { useQuery, useMutation } from "@tanstack/react-query"
  import Loading from "./UI/Loading"
  import ErrorBlock from "./UI/Error" 
  import Header from "./UI/Header"
  import Footer from "./UI/Footer"
  import EditModal from "./UI/EditModal"
  import { Link } from "react-router-dom"
  const Admin = () => {
    
    // useQuery to get data 
      const {data, isPending, isError} = useQuery({
          queryKey: ['admin-get-all'],
          queryFn: ({signal}) => getAllProducts({signal})
      });

      //useMutation to delete data
      const {
        mutate, 
        isPending: pendingDeletion, 
        isError: errorDeletion
      } = useMutation({
        mutationFn: deleteProducts,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['products'],
            refetchType: 'none'
          })
        },
        onError: (error) => {
          console.error('Error deleting product:', error);
        },
      })

      const handleDeleteProduct = (id) => {
        // pass the id parameters in mutate
        mutate({id})
      }


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
                      {errorDeletion && <p className="text-red-500">Failed to add product. Please try again.</p> }
                      <td className="justify-evenly flex items-center">
                          <Link to={`/admin/${product.id}?edit=true`} className="btn btn-success tracking-wide" onClick={()=>document.getElementById('my_modal_2').showModal()}>
                            Edit
                          </Link>
                          <button className="btn btn-error tracking-wide" onClick={() => handleDeleteProduct(product.id)}> {/* use the id as a argument in a callback function*/}
                            {pendingDeletion ? 'Deleting...': 'Delete'}
                          </button>
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
          <EditModal />
          <Header />
          <main className="m-16">
              {content}
              <div className="join grid grid-cols-2">
                  <button className="join-item btn btn-outline">
                      <Link to ='/products'>
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