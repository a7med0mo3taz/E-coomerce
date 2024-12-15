import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext';

export default function WishList() {
  const usePageTitle = (title) => {
    useEffect(() => {
      document.title = title;
    }, [title]);
  };
  usePageTitle("Wish List");
  const { getWishList, wishListData, deleteProduct, error, isLoading } = useContext(WishListContext);
  const { addToCart } = useContext(CartContext);

  const [loadingStates, setLoadingStates] = useState({
    increment: null,
    deleteBtn: null,
  });

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <div className="container mx-auto cart flex flex-col  p-12 mt-32 rounded-lg my-20">
        <div className="head flex items-center justify-between mb-6">
          <div className="card-title">
            <h5 className='text-3xl font-bold'>My Wish List</h5>
          </div>
        </div>
        <div className="cart-details col-span-10 md:col-span-6">
          {wishListData?.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-10 sm:grid-cols-10 md:grid-cols-10 gap-5 w-full max-w-6xl my-4 p-2 border-b"
            >
              <div className="col-span-10 md:col-span-2 md:p-4">
                <img
                  src={item.imageCover}
                  className=" md:w-32 w-full max-h-full"
                  alt={item.title}
                />
              </div>

              <div className="col-span-10 md:col-span-8 flex justify-between items-center">
                <div className="info">
                  <h5 className="text-xl mb-2">{item.title}</h5>
                  <h6 className="mb-2">{item.price} EGP</h6>
                  <button
                    disabled={loadingStates.deleteBtn === item._id}
                    onClick={async () => {
                      setLoadingStates((prev) => ({ ...prev, deleteBtn: item._id }));
                      await deleteProduct(item._id);
                      await getWishList(); 
                      setLoadingStates((prev) => ({ ...prev, deleteBtn: null }));
                    }}
                    type="button"
                    className="text-white disabled:opacity-75 bg-red-700 hover:bg-red-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    {loadingStates.deleteBtn === item._id ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>

                <button
                  disabled={loadingStates.increment === item._id}
                  onClick={async () => {
                    setLoadingStates((prev) => ({ ...prev, increment: item._id }));
                    await addToCart(item._id);
                    setLoadingStates((prev) => ({ ...prev, increment: null }));
                  }}
                  className="text-white disabled:opacity-75 bg-green-700 hover:bg-green-800 px-4 py-2 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl me-2 mb-2"
                >
                  {loadingStates.increment === item._id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Add to cart +"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
