import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Brands.css";
import Loading from '../Loading/Loading';
import BrandDetails from '../BrandDetails/BrandDetails';
import { useQuery } from '@tanstack/react-query';

export default function Brands() {
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };

    usePageTitle("Brands");

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);
    const {isLoading , isError ,error , data} = useQuery({
        queryKey: ["brands"],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/brands`),
        staleTime: 1000 * 60 *15
    })

    function openInfoCard(brand) {
        setSelectedBrand(brand);
        setIsInfoCardOpen(true);
    }

    function closeInfoCard() {
        setIsInfoCardOpen(false);
        setSelectedBrand(null);
    }

    function renderBrands() {
        return data?.data?.data.map((brand) => (
            <div key={brand.id} onClick={() => openInfoCard(brand)} className="card hover:shadow-green-600 shadow-lg duration-75 cursor-pointer">
                <div className="bg-white border border-gray-200 rounded-lg">
                    <img className="rounded-t-lg" src={brand.image} alt={brand.name} />
                    <div className="p-5">
                        <h5 className="mb-2 text-xl text-center tracking-tight text-gray-900">{brand.name}</h5>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div className="mt-40">
            <h2 className="text-center text-4xl mb-5 font-bold title">All Brands</h2>
            

{
                isLoading &&
                <Loading />
            }
            {
                isError &&
                <div>Error: {error.message}</div>
            }
            {
                !isLoading && !isError && data?.data?.data.length > 0 ?
                    (
                        <div className="my-20 mx-auto max-w-7xl justify-items-center align-items-center px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {renderBrands()}
                        </div>
                    ) : (
                        <Loading/>
                    )}
            {isInfoCardOpen && selectedBrand && (
                <BrandDetails brand={selectedBrand} closeInfoCard={closeInfoCard} />
            )}
        </div>
    );
}
