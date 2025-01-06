import { useMutation } from "@tanstack/react-query";
import { queryClient, postOrder } from "../../utils/https";


const CheckoutModal = () => {

    const {mutate, isPending,} = useMutation({
        mutationFn: postOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['post-cart'],
            })
        },
        onError: (error) => {
            console.error('Error adding product to cart:', error);
        }
    })

    const handleCheckout = () => {
        console.log('Checking out all products');
        
        mutate()
    }


    return(
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <p className="py-4">Do you want to checkout all your cart&apos;s?</p>
            <div className="modal-action">
            <form method="dialog" >
                {/* if there is a button in form, it will close the modal */}
              
            </form>
            <div className="grid grid-cols-2 gap-4">
                    <button className="btn " onClick={handleCheckout}>
                        {isPending ? 'Checking out...' : 'Checkout'}
                    </button>
                    <button className="btn">Cancel</button>
                </div>
            </div>
        </div>
    </dialog>
    )
}
export default CheckoutModal;