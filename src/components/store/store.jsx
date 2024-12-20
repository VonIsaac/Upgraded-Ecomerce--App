import { createContext, useContext } from "react";
import { editProducts,getEditProducts, } from "../../utils/https";
import { useMutation, useQuery, } from "@tanstack/react-query";

const StoreContext = createContext();


const StoreContexProvider = ({children}) => {
    //for mutatin
    const {mutate: mutateProduct} = useMutation(editProducts);


    const getEditProduct = useQuery({
        queryFn: getEditProducts,
    })
    const value = {
        mutateProduct,
        getEditProduct
    }





    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export const useProductsContextProvider = () => {
    return useContext(StoreContext)
}

export default StoreContexProvider