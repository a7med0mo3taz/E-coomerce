import React, { useContext, useEffect, useState } from 'react';
import "./CheckOut.css";
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import * as Yup from "yup"

export default function CheckOut() {
    // Custom hook to set page title
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };

    usePageTitle("CheckOut"); // Set page title

    const [isLoading, setIsLoading] = useState(false); // State for loading status
    const [errorMsg, setErrorMsg] = useState(""); // State for error messages

    const { checkOutSession, cartData } = useContext(CartContext); // Access context functions and data


    const yupSchema = Yup.object().shape({
        details: Yup.string().required(),
        phone: Yup.string().required(),
        city: Yup.string().required(),
        }); 
    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema: yupSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorMsg("");
            try {
                await checkOutSession(cartData?._id, values);
            } catch (error) {
                setErrorMsg(error.message || "Failed to process the checkout. Please try again.");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className="container mx-auto">
            <div className="flex flex-col justify-center register mx-auto max-w-full gap-5 mt-32 px-10">
                <h2 className='text-start text-2xl mb-2'>Check out</h2>


                {/* Checkout form */}
                <form onSubmit={formik.handleSubmit} className="w-full gap-5 mb-20">
                    {/* Details input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details :</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.details}
                            type="text"
                            name="details"
                            id="details"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full max-w-full p-2.5"
                            required
                        />
                    </div>

                    {/* Phone input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone :</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            type="tel"
                            name="phone"
                            id="phone"
                            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full max-w-full p-2.5"
                            required
                        />
                    </div>

                    {/* City input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City :</label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                            type="text"
                            name="city"
                            id="city"
                            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full max-w-full p-2.5"
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <button
                            type="submit"
                            className={`text-white default-btn ${!formik.isValid || !formik.dirty || isLoading ? "disabled:opacity-40" : ""} bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-4 py-2 text-center w-full sm:w-auto`}
                            disabled={!formik.isValid || !formik.dirty || isLoading}
                        >
                            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Pay Now"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
