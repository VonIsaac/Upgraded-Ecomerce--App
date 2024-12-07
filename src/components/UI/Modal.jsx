import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postProducts, queryClient } from "../../utils/https";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
const Modal = () => {
    const navigate = useNavigate()
    //call the email amd price etc 
    const [title, setIstitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('')

  //gather all the state variable
  const formData = {
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  }
  const {mutate, isPending, isError} = useMutation({
    mutationFn: postProducts,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Invalidate products query to refresh list
      <Toast>
        <p>Submit Succesful</p>
      </Toast>
      //if wee succed clear the form 
      setIstitle('');
      setImageUrl('');
      setPrice('');
      setDescription('')
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });



    function handleAddingProduct(e){
        // /cancels the event if it is cancelable,
        e.preventDefault();
        mutate(formData)
        navigate('../')
    }

    return(
        <>
        
        <button className="btn btn-neutral btn-primary shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ml-5 " onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Products</button>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <div className="modal-action">
            <form method="dialog" className=" flex justify-center items-center flex-col ml-auto mr-auto" onSubmit={handleAddingProduct} >
                
                <label className="input input-bordered flex items-center gap-2 mb-5">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text"
                            className="grow"
                            placeholder="Title"
                            name = "title"  
                            id="title" 
                            required
                            value={title}
                            onChange={e => setIstitle(e.target.value)}
                        />
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
                        <input 
                        type="text" 
                        className="grow" 
                        placeholder="ImageUrl" 
                        name="imageUrl" 
                        id="imageUrl" 
                        required
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        />
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
                    <input type="number"
                        className="grow"
                        placeholder="Price"
                        name="price" 
                        id="price"
                        required 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </label>
                    
                <textarea 
                    required 
                    className="textarea 
                    textarea-bordered mb-5" 
                    placeholder="Description" 
                    name="description" 
                    id="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
                {isError && <p className="text-red-500">Failed to add product. Please try again.</p>}
                <button className="btn btn-primary" disabled={isPending}>
                  {isPending ? "Submitting..." : "Submit"}
                </button>
            </form>
            </div>
        </div>
        </dialog>
                
        </>
    )
}

export default Modal