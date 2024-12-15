import React from 'react';
import "./BrandDetails.css";
import Loading from '../Loading/Loading';

export default function BrandDetails({ brand, closeInfoCard }) {
    return (
        <>
            {
                brand == null ? <Loading /> :
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                        <div className="relative flex flex-col justify-center items-center p-4 w-full max-w-lg move max-h-full bg-white border-b rounded-t-lg shadow">

                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900  text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={closeInfoCard}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only"></span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4 bg-white flex flex-col md:flex-row justify-around items-center w-full max-w-lg move">
                            <div className="info">
                                <p className=" text-5xl leading-relaxed brand-title ">{brand.name}</p>
                                <p className="text-base leading-relaxed text-gray-500 ">
                                    {brand.slug}
                                </p>
                            </div>
                            <div className="image">
                                <img src={brand.image} alt="" />
                            </div>
                        </div>

                        <div className="flex justify-end  p-4 w-full max-w-lg move max-h-full border-t bg-white rounded-b-lg shadow ">

                            <button
                                onClick={closeInfoCard}
                                className="py-2.5 px-5 mr-3 text-sm  font-medium text-white bg-gray-500 rounded-lg border border-gray-200 hover:bg-gray-700  focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
            }

        </>
    );
}



