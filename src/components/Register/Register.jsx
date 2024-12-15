import React, { useContext, useEffect, useState } from 'react'
import "./Register.css"
import * as Yup from "yup"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
export default function Register() {
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Sign Up")
    const { token, setToken } = useContext(UserContext)
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(values) {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            navigate("/log-in")
            localStorage.setItem("userToken", data.token)
            toast.success('Successfully Registered!')
            setToken(data.token)
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    const yupSchema = Yup.object().shape({
        name: Yup.string().required().min(5).max(15),
        email: Yup.string().email().required().matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, "Email is not valid"),
        password: Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, `Password requirements : At least one uppercase letter (A-Z) - At least one lowercase letter (a-z) - At least one digit (0-9) - At least one special character (#, ?, !, @, $, %, ^, &, *, -) - At least 8 characters in length.`),
        rePassword: Yup.string().required("Re-password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
        Phone: Yup.string().required().matches(/^01[0-2][0-9]{8}$/, "Phone number is not valid"),
    });


    const formic = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            Phone: "",
        },
        validationSchema: yupSchema,
        onSubmit: handleSubmit,
    })



    return (
        <>
            <div className="container mx-auto">
                <div className=" flex flex-col justify-center  register mx-auto max-w-4xl gap-5  mt-32 px-10 ">
                    <div>
                        <h2 className='text-start text-2xl mb-2'>Register Now</h2>
                    </div>
                    {
                        errorMsg &&
                        <div className="p-4 mb-4 text-start text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {errorMsg}
                        </div>
                    }
                    <form onSubmit={formic.handleSubmit} className="   w-full gap-5 mb-20">

                        {/* name */}
                        <div className="relative z-0 w-full mb-5 group ">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name :</label>
                            <input onChange={formic.handleChange} onBlur={formic.handleBlur} value={formic.values.name} type="text" name="name" id="name" className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 max-w-4xl block w-full p-2.5" required />
                            {
                                formic.errors.name && (
                                    <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        {formic.errors.name}</div>
                                )}
                        </div>


                        {/* email */}
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email :</label>
                            <input onChange={formic.handleChange} onBlur={formic.handleBlur} value={formic.values.email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full max-w-4xl p-2.5" required />
                        </div>
                        {
                            formic.errors.email &&
                            <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formic.errors.email}
                            </div>
                        }


                        {/* password */}
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password :</label>
                            <input onChange={formic.handleChange} onBlur={formic.handleBlur} value={formic.values.password} type="password" name="password" id="password" className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block max-w-4xl w-full p-2.5" required />
                        </div>
                        {
                            formic.errors.password &&
                            <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formic.errors.password}
                            </div>
                        }


                        {/* Re Password */}
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-password :</label>
                            <input onChange={formic.handleChange} onBlur={formic.handleBlur} value={formic.values.rePassword} type="password" name="rePassword" id="rePassword" className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block max-w-4xl w-full p-2.5" required />
                        </div>
                        {
                            formic.errors.rePassword &&
                            <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formic.errors.rePassword}
                            </div>
                        }


                        {/* Phone number */}
                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="Phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone :</label>
                            <input onChange={formic.handleChange} onBlur={formic.handleBlur} value={formic.values.Phone} type="text" name="Phone" id="Phone" className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 max-w-4xl block w-full p-2.5" required />

                        </div>

                        {
                            formic.errors.Phone &&
                            <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formic.errors.Phone}
                            </div>
                        }

                        <div className="flex justify-end">

                            {formic.isValid && formic.dirty ? (
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="text-white disabled:opacity-40 bg-green-500 default-btn hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center" >
                                    {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Register Now"}
                                </button>) : (
                                <button
                                    type="submit"
                                    className="disabled-btn" disabled>
                                    Register Now
                                </button>
                            )}</div>
                    </form>
                </div>
            </div>
        </>
    )
}

