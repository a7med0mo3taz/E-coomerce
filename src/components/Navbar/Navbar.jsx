import React, { useState, useContext, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./Navbar.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
    const { numOfCartItems, getCart } = useContext(CartContext)
    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("userToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, [setToken]);

    function logOut() {
        localStorage.removeItem("userToken");
        setToken(null);
        navigate("/log-in");
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-white z-50 dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex md:flex-nowrap flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={""} className="flex items-center justify-center">
                        <i className="fa-solid fa-cart-shopping fa-2xl" style={{ color: '#4ea64a' }} />
                        <h1 className="text-2xl font-bold">Fresh Cart</h1>
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {
                            !token ? (
                                <div className="signInBtn flex gap-4">
                                    <Link to={"/log-in"} type="button" className="text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 default-btn font-medium rounded-lg text-sm px-4 py-2 text-center">Log In</Link>
                                    <Link to={"/register"} type="button" className="text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium default-btn rounded-lg text-sm px-4 py-2 text-center">Register</Link>
                                </div>
                            ) : (
                                <>
                                    <div className="leftNav flex items-center gap-4">
                                        <div className="cart-icon relative">
                                            <div className="counter absolute px-3  flex justify-center items-center text-white">
                                                {numOfCartItems}
                                            </div>
                                            <Link to={"/cart"}>
                                                <i className="fa-solid fa-cart-shopping fa-2xl" style={{ color: '#575757' }} />
                                            </Link>
                                        </div>
                                        <span onClick={() => logOut()} type="button" className="text-white bg-red-700 hover:bg-red-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Log out</span>
                                    </div>
                                </>
                            )
                        }
                        {token && (
                            <button
                                data-collapse-toggle="navbar-cta"
                                type="button"
                                onClick={toggleMenu}
                                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-cta"
                                aria-expanded={isMenuOpen ? "true" : "false"}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        )}
                    </div>


                    <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`} id="navbar-cta">
                        {
                            token &&
                            <ul className="flex flex-col p-4 lg:p-0 font-medium lg:space-x-8 rtl:space-x-reverse lg:flex-row md:flex-row lg:mt-0 lg:border-0 lg:bg-white">
                                <li>
                                    <NavLink to={""} className="block py-2 md:px-1 nav-link text-center  md:bg-transparent focus:text-green-700 md:text-black md:p-0" aria-current="page">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/cart"} className="block py-2 md:px-1 nav-link text-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent focus:text-green-700 md:hover:text-green-700 md:p-0">Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/wish-list"} className="block py-2 md:px-1 nav-link text-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent focus:text-green-700 md:hover:text-green-700 md:p-0">Wish list</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/products"} className="block py-2 md:px-1 nav-link text-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent focus:text-green-700 md:hover:text-green-700 md:p-0">Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/categories"} className="block py-2 md:px-1 nav-link text-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent focus:text-green-700 md:hover:text-green-700 md:p-0">Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/brands"} className="block py-2 md:px-1 nav-link text-center text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent focus:text-green-700 md:hover:text-green-700 md:p-0">Brands</NavLink>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}
