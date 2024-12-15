import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import babyChair from "../../assets/baby-chair.jpg";
import backBag from "../../assets/back-bag.jpg";
import jewelry from "../../assets/ring.jpg";

export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                <div>
                    <img src={backBag} alt="backBag" className="w-full h-60 object-cover" />
                </div>
                <div>
                    <img src={babyChair} alt="babyChair" className="w-full h-60 object-cover" />
                </div>
                <div>
                    <img src={jewelry} alt="jewelry" className="w-full h-60 object-cover" />
                </div>
            </Slider>
        </div>
    );
}
