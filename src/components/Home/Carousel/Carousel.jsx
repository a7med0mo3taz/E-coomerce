import React, { useRef } from 'react'
import "./Carousel.css"
import backBag from "../../../assets/back-bag.jpg"
import babyChair from "../../../assets/baby-chair.jpg"
import rings from "../../../assets/ring.jpg"
import audioDevice from "../../../assets/audio-devies.jpg"
import bags from "../../../assets/download.jpg"
import Slider from 'react-slick'

export default function Carousel() {
    const sliderRef = useRef(null);
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

    return (
        <>
            <div className="container flex flex-col items-center justify-center mb-10 md:flex-row">
            <div className="slider max-w-[324px]">
                <Slider ref={sliderRef} {...settings}>
                    <div >
                        <img
                            src={backBag}
                            className="w-[324px] h-[450px] object-cover"
                            alt={backBag}
                        />
                    </div>
                    <div >
                        <img
                            src={babyChair}
                            className="w-[324px] h-[450px] object-cover"
                            alt={babyChair}
                        />
                    </div>
                    <div >
                        <img
                            src={rings}
                            className="w-[324px] h-[450px] object-cover"
                            alt={rings}
                        />
                    </div>

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
            </div>
            <div className="photos ">
                <div className="photo1">
                    <img src={bags} className='w-[324px] h-[260px]' alt="bags" />
                </div>
                <div className="photo2">
                    <img src={audioDevice} className='w-[324px] h-[260px]' alt="bags" />
                </div>
            </div>
            </div>
        </>
    )
}
