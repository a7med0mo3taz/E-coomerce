import axios from "axios";

export const axiosCart = axios.create({
    baseURL: "https://ecommerce.routemisr.com/api/v1/cart",
    headers: {
        token: localStorage.getItem("userToken")
    }
})