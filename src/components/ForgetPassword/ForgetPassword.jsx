import React, { useEffect, useState } from 'react'
import "./ForgetPassword.css"
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup"
import { useFormik } from 'formik';
export default function ForgetPassword() {
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Reset Password")
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    async function handleReset(values) {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
            navigate("/verify-code")
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
        finally {
            setIsLoading(false)
        }
    }
    const yupSchema = Yup.object().shape({
        email: Yup.string().email().required().matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, "Email is not valid"),
    });


    const formic = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: yupSchema,
        onSubmit: handleReset,
    })
    return (
        <div className="container mx-auto">
            <div className=" flex flex-col justify-center  register mx-auto  gap-5  mt-32 px-10 ">

<div>
    <h2 className='text-start text-2xl mb-2'>Please enter your email address</h2>
</div>
{
    errorMsg && (
        <div className="p-4 mb-4 text-start text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errorMsg}
        </div>
    )
}



<form onSubmit={formic.handleSubmit} className="   w-full gap-5 mb-20">


    {/* email */}
    <div className="relative z-0 w-full mb-5 group">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email :</label>
        <input onChange={formic.handleChange} onBlur={formic.handleBlur} value={formic.values.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full  p-2.5" required />
    </div>
    {
        formic.errors.email &&
        <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formic.errors.email}
        </div>
    }

    <div className="flex justify-between items-center">

        {formic.isValid && formic.dirty ? (
            <button
                disabled={isLoading}
                type="submit"
                className="text-white disabled:opacity-40 bg-green-500 default-btn hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-4 py-2 text-center" >
                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verify"}
            </button>) : (
            <button
                type="submit"
                className="disabled-btn" disabled>
                Verify
            </button>
        )}</div>
</form>


</div>
        </div>
    )
}
