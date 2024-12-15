import React, { useEffect } from 'react'
import Carousel from './Carousel/Carousel'
import CategoriesCarousel from './CategoriesCarousel/CategoriesCarousel'
import Products from '../Products/Products'

export default function Home() {
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Home")
    return (
        <>
            <div className="flex my-24 py-5  flex-col items-center justify-center">
                <Carousel/>
                <CategoriesCarousel/>
                <Products />
            </div>
        </>
    )
}
