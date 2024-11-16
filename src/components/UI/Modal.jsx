
//import { createPortal } from "react-dom"

const Modal = ({children}) => {

    return(
        <>
        
        <button className="btn btn-neutral btn-primary shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ml-5 " onClick={()=>document.getElementById('my_modal_1').showModal()}>Add Products</button>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <div className="modal-action">
            <form method="dialog" className=" flex justify-center items-center flex-col ml-auto mr-auto" >
                {children}
                <div className="">
                    <button className="btn">Close</button>
                    <button className="btn">Sumbit</button>
                </div>
            </form>
            </div>
        </div>
        </dialog>
                
        </>
    )
}

export default Modal