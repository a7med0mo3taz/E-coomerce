import axios from "axios";

export const axiosWishList = axios.create({
    baseURL :`https://ecommerce.routemisr.com/api/v1/wishlist` ,
    headers : {
        token : localStorage.getItem("userToken")
    }
})