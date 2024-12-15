import React, { useContext, useEffect, useState } from 'react'
import "./Cart.css"
import Loading from '../Loading/Loading';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
  const usePageTitle = (title) => {
    useEffect(() => {
      document.title = title;
    }, [title]);
  };
  usePageTitle("Cart")
  const navigate = useNavigate()
  const { deleteProduct, updateProduct, getCart, checkOutSession, clearCart, isLoading, error, numOfCartItems, totalCartPrice, cartData } = useContext(CartContext)

  const [cartIsLoading, setCartIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    increment: null,
    decrement: null,
    deleteBtn: null,
    checkOut: null
  });

  useEffect(() => {
    getCart();
  }, [])

  if (cartData == null || isLoading == true) {
    return <Loading />
  }
  const handleClearCart = async () => {
    setCartIsLoading(true);
    await clearCart();
    setCartIsLoading(false);
    navigate("/")
  };
  const toCheckOut = async () => {
    await checkOutSession()
    navigate("/check-out")
  }
  return (
    <>
      <div className="container mx-auto cart flex flex-col  p-12 mt-32 rounded-lg my-20">
        <div className="head flex items-center justify-between mb-6">
          <div className="card-title">
            <h5 className='text-3xl font-bold'>Cart Shop</h5>
          </div>
          <div className="checkOut">
            <button
              onClick={async () => {
                setLoadingStates((prev) => ({ ...prev, checkOut: true })); 
                await toCheckOut(); 
                setLoadingStates((prev) => ({ ...prev, checkOut: false })); 
              }}
              disabled={loadingStates.checkOut} 
              type="button"
              className="text-white disabled:opacity-75 bg-green-700 hover:bg-green-800 px-4 py-2 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {loadingStates.checkOut ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Check Out"
              )}
            </button>
          </div>
        </div>
        <div className="total-info flex items-center justify-between">
          <div className="total-price">
            <h5>total price :  <span className='total-number text-xl' > {totalCartPrice} </span></h5>
          </div>
          <div className="total-items">
            <h5>total number of items :  <span className='total-number text-xl'> {numOfCartItems} </span></h5>
          </div>
        </div>
        <div className="cart-details">
          {
            cartData?.products?.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-10 sm:grid-cols-10 md:grid-cols-10 gap-5 w-full max-w-6xl my-4 p-2 border-b"
              >

                <div className="col-span-10 md:col-span-2 p-4">
                  <img
                    src={item.product.imageCover}
                    className="md:w-32 w-full max-h-full"
                    alt={item.title}
                  />
                </div>

                <div className="col-span-10 md:col-span-8 flex justify-between items-center">
                  <div className="info">
                    <h5 className="text-xl mb-2">{item.product.title}</h5>
                    <h6 className="mb-2">{item.price} EGP</h6>
                    <button
                      disabled={loadingStates.deleteBtn === item.product.id}
                      onClick={async () => {
                        setLoadingStates((prev) => ({ ...prev, deleteBtn: item.product.id }));
                        await deleteProduct(item.product.id);
                        setLoadingStates((prev) => ({ ...prev, deleteBtn: null }));
                      }}
                      type="button"
                      className="text-white disabled:opacity-75 bg-red-700 hover:bg-red-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                      {loadingStates.deleteBtn === item.product.id ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Delete"
                      )}
                    </button>

                  </div>

                  <div className="quantity flex items-center">
                    <button
                      disabled={isLoading.updateProduct}
                      onClick={async () => {
                        setLoadingStates((prev) => ({ ...prev, increment: item.product.id }));
                        await updateProduct(item.product.id, item.count + 1);
                        setLoadingStates((prev) => ({ ...prev, increment: null }));
                      }}
                      className=" count-btn disabled:opacity-75 text-white hover:bg-green-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                      {loadingStates.increment === item.product.id ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "+"
                      )}
                    </button>

                    <span className="px-4">{item.count}</span>

                    <button
                      onClick={async () => {
                        setLoadingStates((prev) => ({ ...prev, decrement: item.product.id }));
                        await updateProduct(item.product.id, item.count - 1);
                        setLoadingStates((prev) => ({ ...prev, decrement: null }));
                      }}
                      className="count-btn text-white hover:bg-green-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                      {loadingStates.decrement === item.product.id ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "-"
                      )}
                    </button>
                  </div>

                </div>

              </div>
            ))
          }
          <div className="clear-btn flex justify-center items-center">

            <button
              disabled={isLoading.clearCart}
              onClick={handleClearCart}
              type="button"
              className="text-white disabled:opacity-75 bg-red-700 hover:bg-red-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-6 py-4 mt-4 text-center"
            >
              {cartIsLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Clear Your Cart"
              )}
            </button>

          </div>

        </div>
      </div>
    </>
  )
}
