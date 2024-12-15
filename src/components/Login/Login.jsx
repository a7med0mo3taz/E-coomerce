import React, { useContext, useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
export default function Login() {
    const usePageTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    usePageTitle("Log In")
    const { token, setToken } = useContext(UserContext)
    const [errorMsg, setErrorMsg] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    async function handleLogin(values) {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            navigate("/")
            localStorage.setItem("userToken", data.token)
            toast.success('Successfully Log in!')
            setToken(data.token)
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
        finally {
            setIsLoading(false)
        }
    }
    const yupSchema = Yup.object().shape({
        email: Yup.string()
            .email().required().matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, "Email is not valid. Ensure it follows the format: example@domain.com"),
        password: Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, `password is not valid `),
    });


    const formic = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yupSchema,
        onSubmit: handleLogin,
    })

    return (
        <div className="container mx-auto">
            <div className="flex flex-col justify-center register mx-auto max-w-full  gap-5 mt-32 px-10">

                <div>
                    <h2 className='text-start text-2xl mb-2'>Login Now</h2>
                </div>

                {errorMsg && (
                    <div className="p-4 mb-4 text-start text-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={formic.handleSubmit} className="w-full gap-5 mb-20">
                    {/* email */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email :</label>
                        <input
                            onChange={formic.handleChange}
                            onBlur={formic.handleBlur}
                            value={formic.values.email}
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full max-w-full p-2.5"
                            required
                        />
                    </div>

                    {formic.errors.email && (
                        <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {formic.errors.email}
                        </div>
                    )}

                    {/* password */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password :</label>
                        <input
                            onChange={formic.handleChange}
                            onBlur={formic.handleBlur}
                            value={formic.values.password}
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full max-w-full p-2.5"
                            required
                        />
                    </div>

                    {formic.errors.password && (
                        <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {formic.errors.password}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="resetPass mb-4 sm:mb-0">
                            <Link to={"/forget-password"} className='text-xl hover:text-green-600 duration-100'>Forget your password?</Link>
                        </div>

                        {formic.isValid && formic.dirty ? (
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="text-white default-btn disabled:opacity-40 bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-4 py-2 text-center w-full sm:w-auto"
                            >
                                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login Now"}
                            </button>
                        ) : (
                            <button type="submit" className="disabled-btn w-full text-base sm:w-auto" disabled>
                                Login Now
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>

    )
}
