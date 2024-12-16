import { createContext, useEffect, useState } from "react";
import { axiosCart } from "../utils/axiosCart";
import { axiosWishList } from "../utils/axiosWishList";

export const UserContext = createContext();
export default function UserContextProvider({ children }) {
    const [token, setToken] = useState(null)
    useEffect(()=>{
        if (token){
            axiosCart.defaults["headers"].token =token
            axiosWishList.defaults["headers"].token =token
        }
        if(localStorage.getItem("userToken") != null){
            setToken(localStorage.getItem("userToken"))
        }
    },[token])
    return <UserContext.Provider value={ {token , setToken} }>
        {children}
    </UserContext.Provider>
}