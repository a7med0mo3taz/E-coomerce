import { createContext, useState } from "react";
import { axiosCart } from "../utils/axiosCart";
import toast from "react-hot-toast";
import axios from "axios";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState({
        getCart: false,
        clearCart: false,
        deleteProduct: false,
        addToCart: false,
        updateProduct: false,
        checkOut: false
    });

    const [error, setError] = useState({
        getCart: null,
        clearCart: null,
        deleteProduct: null,
        addToCart: null,
        updateProduct: null,
        checkOut: null
    });

    const [numOfCartItems, setNumOfCartItems] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(null);
    const [cartData, setCartData] = useState(null);

    async function getCart() {
        setIsLoading((prev) => ({ ...prev, getCart: true }));
        try {
            const { data } = await axiosCart.get();
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartData(data.data);
        } catch (err) {
            setError((prev) => ({ ...prev, getCart: err.response?.data?.message || "Failed to fetch cart." }));
        } finally {
            setIsLoading((prev) => ({ ...prev, getCart: false }));
        }
    }

    async function clearCart() {
        setIsLoading((prev) => ({ ...prev, clearCart: true }));
        try {
            const { data } = await axiosCart.delete();
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartData(data.data);
            toast.success("Successfully deleted Your cart!", {
                icon: "✅",
            });
        } catch (err) {
            setError((prev) => ({ ...prev, clearCart: err.response?.data?.message || "Failed to clear cart." }));
        } finally {
            setIsLoading((prev) => ({ ...prev, clearCart: false }));
        }
    }

    async function deleteProduct(id) {
        setIsLoading((prev) => ({ ...prev, deleteProduct: true }));
        try {
            const { data } = await axiosCart.delete(`/${id}`);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartData(data.data);
            toast.success("Successfully deleted from cart!", {
                icon: "✅",
            });
            
        } catch (err) {
            setError((prev) => ({ ...prev, deleteProduct: err.response?.data?.message || "Failed to delete product." }));
        } finally {
            setIsLoading((prev) => ({ ...prev, deleteProduct: false }));
        }
    }

    async function addToCart(id) {
        setIsLoading((prev) => ({ ...prev, addToCart: true }));
        try {
            const { data } = await axiosCart.post("", { productId: id });
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartData(data.data);
            toast.success("Successfully added to cart!", {
                icon: "🛒✅",
            });
        } catch (err) {
            setError((prev) => ({ ...prev, addToCart: err.response?.data?.message || "Failed to add product." }));
        } finally {
            setIsLoading((prev) => ({ ...prev, addToCart: false }));
        }
    }

    async function updateProduct(id, count) {
        setIsLoading((prev) => ({ ...prev, updateProduct: true }));
        try {
            const { data } = await axiosCart.put(`/${id}`, { count });
            setTotalCartPrice(data.data.totalCartPrice);
            setCartData(data.data);
        } catch (err) {
            setError((prev) => ({ ...prev, updateProduct: err.response?.data?.message || "Failed to update product." }));
        } finally {
            setIsLoading((prev) => ({ ...prev, updateProduct: false }));
        }
    }

    async function checkOutSession(cartId, shippingAddress) {
        setIsLoading((prev) => ({ ...prev, checkOut: true }));
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
                { shippingAddress },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                    
                }
            );
            window.location.href = data.session.url
            toast.success("Checkout session created successfully!", {
                icon: "✅",
            });
        } catch (err) {
            setError((prev) => ({ ...prev, checkOut: err.response?.data?.message || "Failed to create checkout session." }));
        } finally {
            setIsLoading((prev) => ({ ...prev, checkOut: false }));
        }
    }

    return (
        <CartContext.Provider
            value={{
                addToCart,
                updateProduct,
                getCart,
                checkOutSession,
                deleteProduct,
                clearCart,
                isLoading,
                error,
                numOfCartItems,
                totalCartPrice,
                cartData,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
