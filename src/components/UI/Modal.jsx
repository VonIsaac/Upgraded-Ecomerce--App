
//import { createPortal } from "react-dom"

const Modal = ({children}) => {

    return(
        <>
        
        <button className="btn btn-neutral btn-primary shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ml-5 " onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Products</button>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
            <form method="dialog" >
                {children}
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
                
        </>
    )
}

export default Modal