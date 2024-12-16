import React, { useEffect } from 'react'
import Error from "../../assets/error.svg"
export default function NotFound() {
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Eror 404")
    return (
        <div className='flex flex-col justify-center items-center gap-5 m-80'>
            <div className="photo">
                <img src={Error} alt="errorMsg" />
            </div>
            <div className="text">
                <h2 className='text-3xl '>Not Found Page</h2>
            </div>
        </div>


    )
}
