import React from 'react'
import   "./Loading.css"
export default function Loading() {
    return (
        <>
        <div className="loading flex justify-center items-center bg-gray-500 opacity-75 text-white fixed top-0 bottom-0 right-0 left-0 z-40">
        <i className="fa fa-spinner fa-spin fa-5x" />
        </div>
        </>
    )
}
