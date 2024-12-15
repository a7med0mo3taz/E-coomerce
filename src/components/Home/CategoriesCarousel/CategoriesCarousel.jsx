import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick'
import './CategoriesCarousel.css'
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading/Loading';

export default function CategoriesCarousel() {
    const sliderRef = useRef(null);

    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        dotsClass: "custom-dots",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
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
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["categories"],
        queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
        staleTime: 1000 * 60 * 15
    })
    return (
        <div className="w-full px-10 relative">
            {isLoading && <Loading/>}
            {isError && <p>Error: {error.message}</p>}
            {!isLoading && !isError && data?.data?.data.length > 0 && (
                <>

                    <Slider ref={sliderRef} {...settings}>
                        {data.data.data.map((category) => (
                            <div className="p-3" key={category.id}>
                                <img
                                    src={category.image}
                                    className="h-[300px] w-full object-cover rounded-lg shadow-md"
                                    alt={category.name}
                                />
                                <h3 className="text-base mt-3 w-[300px]">{category.name}</h3>
                            </div>
                        ))
                        }
                    </Slider>
                    <div className="flex justify-center items-center">
                        <div
                            className="prev-button"
                            onClick={() => sliderRef.current.slickPrev()}
                        >
                        </div>
                        <div
                            className="next-button"
                            onClick={() => sliderRef.current.slickNext()}
                        >
                        </div>
                    </div>

                </>
            )}
            </div>
    )
}
