import { createContext, useState } from "react";
import React from 'react';
import { axiosWishList } from "../utils/axiosWishList";
import toast from "react-hot-toast";

export const WishListContext = createContext();

export default function WishListProvider({ children }) {
    const [loadingFavorites, setLoadingFavorites] = useState({});
    const [favoriteProducts, setFavoriteProducts] = useState({});
    const [isLoading, setIsLoading] = useState({
        getWishList: false,
        clearWishList: false,
        deleteProduct: false,
        addToWishList: false,
    });
    const [error, setError] = useState({
        getWishList: null,
        clearWishList: null,
        deleteProduct: null,
        addToWishList: null,
    });
    const [wishListData, setWishListData] = useState(null);

    // جلب قائمة المنتجات المفضلة
    async function getWishList() {
        setIsLoading((prev) => ({ ...prev, getWishList: true }));
        try {
            const { data } = await axiosWishList.get();
            setWishListData(data.data);
            // تحديث المفضلات
            const favoriteMap = data.data.reduce((acc, product) => {
                acc[product._id] = true; // فرضية أن كل منتج في القائمة المفضلة
                return acc;
            }, {});
            setFavoriteProducts(favoriteMap);
        } catch (err) {
            setError((prev) => ({
                ...prev,
                getWishList: err.response?.data?.message || "Failed to fetch wish list.",
            }));
        } finally {
            setIsLoading((prev) => ({ ...prev, getWishList: false }));
        }
    }

    // إزالة المنتج من المفضلة
    async function deleteProduct(id) {
        setIsLoading((prev) => ({ ...prev, deleteProduct: true }));
        try {
            const { data } = await axiosWishList.delete(`/${id}`);
            setWishListData(data.data);
            toast.success("Successfully deleted from Wish List!", {
                icon: "✅",
            });
            setFavoriteProducts((prev) => {
                const updatedFavorites = { ...prev };
                delete updatedFavorites[id]; // إزالة المنتج من المفضلة
                return updatedFavorites;
            });
        } catch (err) {
            setError((prev) => ({
                ...prev,
                deleteProduct: err.response?.data?.message || "Failed to delete product.",
            }));
        } finally {
            setIsLoading((prev) => ({ ...prev, deleteProduct: false }));
        }
    }

    // إضافة المنتج إلى المفضلة
    async function addToWishList(id) {
        setLoadingFavorites((prev) => ({ ...prev, [id]: true })); // إظهار حالة التحميل
        setIsLoading((prev) => ({ ...prev, addToWishList: true }));
        try {
            const { data } = await axiosWishList.post("", { productId: id });
            setWishListData(data.data);
            toast.success("Successfully added to Wish List!", {
                icon: "❤️",
            });
            setFavoriteProducts((prev) => ({
                ...prev,
                [id]: true, // إضافة المنتج إلى المفضلة
            }));
        } catch (err) {
            setError((prev) => ({
                ...prev,
                addToWishList: err.response?.data?.message || "Failed to add product.",
            }));
        } finally {
            setLoadingFavorites((prev) => ({ ...prev, [id]: false })); // إخفاء حالة التحميل
            setIsLoading((prev) => ({ ...prev, addToWishList: false }));
        }
    }

    return (
        <WishListContext.Provider
            value={{
                getWishList,
                addToWishList,
                deleteProduct,
                wishListData,
                error,
                isLoading,
                loadingFavorites,
                favoriteProducts,
            }}
        >
            {children}
        </WishListContext.Provider>
    );
}
