import React, { useContext, useEffect, useRef, useState } from 'react';
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';

export default function ProductDetails() {
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Details");
    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dotsClass: "custom-dots",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    const { addToCart, isLoading } = useContext(CartContext);
    const { getWishList,addToWishList, deleteProduct, favoriteProducts, loadingFavorites } = useContext(WishListContext);

    const [isFavorite, setIsFavorite] = useState(false);
    const sliderRef = useRef(null);

    const handleAddToWishList = () => {
        if (favoriteProducts[productDetails.id]) {
            setIsFavorite(false);
            deleteProduct(productDetails.id);
        } else {
            setIsFavorite(true);
            addToWishList(productDetails.id);
        }
    };

    const { pId } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    async function getProductDetails() {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + pId);
        setProductDetails(data.data);
    }

    useEffect(() => {
        getProductDetails();
        getWishList();
    }, [pId]);

    useEffect(() => {
        if (productDetails && productDetails.id && favoriteProducts) {
            
            const isProductFavorite = favoriteProducts[productDetails.id];
            console.log("Is Product Favorite:", isProductFavorite);
            console.log("Updated Favorite Products:", favoriteProducts);
            setIsFavorite(!!isProductFavorite); 
        }
    }, [productDetails, favoriteProducts]);




    return (
        <>
            <div className="flex justify-center items-start mt-20 px-10">
                {productDetails ? (
                    <div className="grid grid-cols-1 sm:grid-cols-10 md:grid-cols-10 gap-5 w-full max-w-6xl">
                        <div className="col-span-4">
                            {productDetails?.images.length > 1 ? (
                                <>
                                    <Slider ref={sliderRef} {...settings}>
                                        {productDetails.images.map((img, index) => (
                                            <div key={index} className="w-full">
                                                <img
                                                    src={img}
                                                    className="w-full h-auto"
                                                    alt={productDetails.title || "Product Cover"}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                    <div className="flex justify-center items-center mt-4">
                                        <button
                                            className="prev-button bg-gray-200 hover:bg-gray-300 p-2 rounded-full mx-2"
                                            onClick={() => sliderRef.current.slickPrev()}
                                        >
                                        </button>
                                        <button
                                            className="next-button bg-gray-200 hover:bg-gray-300 p-2 rounded-full mx-2"
                                            onClick={() => sliderRef.current.slickNext()}
                                        >
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <img
                                        src={productDetails.images[0]}
                                        className="w-full h-auto"
                                        alt={productDetails.title || "Product Cover"}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-span-6 flex flex-col justify-center mb-10">
                            <h2 className="text-4xl text-start mb-2">{productDetails.title}</h2>
                            <p className="mb-4 text-start">{productDetails.description}</p>
                            <div className="flex justify-between items-center mb-4">
                                <span className="price">{productDetails.price} EGY</span>
                                <div>
                                    <i className="fa-solid fa-star fa-lg" style={{ color: '#FFD43B' }} />
                                    <span className="bg-blue-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                                        {productDetails.ratingsAverage}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-5">
                                <button
                                    onClick={() => addToCart(productDetails.id)}
                                    className="text-white w-full loadingBg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    {isLoading.addToCart ? (
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                    ) : (
                                        "Add to cart +"
                                    )}
                                </button>

                                <button onClick={handleAddToWishList} className="cursor-pointer">
                                    {loadingFavorites[productDetails.id] ? (
                                        <div className="loadingBg px-2 py-1 rounded-lg"><i className="fa-solid fa-spinner fa-spin" style={{ color: "white" }} /></div>
                                    ) : isFavorite ? (
                                        <i className="fa-solid fa-heart fa-2xl" style={{ color: "red" }} />
                                    ) : (
                                        <i className="fa-solid fa-heart fa-2xl" style={{ color: "black" }} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
}
