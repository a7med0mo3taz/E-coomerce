import React, { useEffect } from 'react'

export default function NotFound() {
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Eror 404")
    return (
        <div className='flex justify-center items-start m-80'>
            <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                
                <div className="flex flex-col">
                <div className='text-center mb-3'>
                    <span className=" text-6xl">Not Found</span>
                </div>
                <div className="text-center">
                    <span className="text-6xl">This page doesn’t exist.</span>
                </div>
                </div>
            </div>

        </div>
    )
}
