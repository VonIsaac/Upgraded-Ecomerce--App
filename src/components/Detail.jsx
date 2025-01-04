import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "./UI/Loading";
import ErrorBlock from "./UI/Error";
import { getIdProducts } from "../utils/https";

const Detail = () => {

    const params = useParams()
    const {data, isPending, isError} = useQuery({
        queryKey: ["get-product-by-id"],
        queryFn: ({signal}) => getIdProducts({signal, id:params.id })
    });

    let content; 

    if(isPending){
        content = <Loading />
    }

    if(isError){
        content = <ErrorBlock  title="An error occurred" message= 'Failed to fetch events' />
    }

    if(data){
        content = (
            <div className=" flex justify-center items-center flex-col">
                <img src={data.product.imageUrl} alt={data.product.title} className=" w-[250px]"/>
                <h1>{data.product.title}</h1>
                <p>₱{data.product.price}</p>
                <p>{data.product.description}</p>
            </div>
        )
    }




    return(
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">           
            {content}
        </div>
        </dialog>
    )
}

export default Detail