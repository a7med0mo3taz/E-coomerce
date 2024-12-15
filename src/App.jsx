import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Cart from './components/Cart/Cart'
import WishList from './components/WishList/WishList'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import ProductDetails from './components/productDetails/productDetails'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import UserContextProvider from './Context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import WishListContextProvider from './Context/WishListContext'

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />, children: [
        { path: "register", element: <Register /> },

        { path: "log-in", element: <Login /> },

        { path: "forget-password", element: <ForgetPassword /> },

        { path: "verify-code", element: <VerifyCode /> },

        { path: "update-password", element: <UpdatePassword /> },

        {
          path: "", element:
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
        },

        {
          path: "cart", element:
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
        },

        {
          path: "/check-out", element:
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
        },
        {
          path: `/allorders`, element:
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
        },

        {
          path: "wish-list", element:
            <ProtectedRoute>
              <WishListContextProvider>
                <WishList />
              </WishListContextProvider>
            </ProtectedRoute>
        },

        {
          path: "products", element:
            <ProtectedRoute>
                <Products />
            </ProtectedRoute>
        },

        {
          path: "product-details/:pId", element:
            <ProtectedRoute>
              <WishListContextProvider>

                <ProductDetails />
              </WishListContextProvider>
            </ProtectedRoute>
        },

        {
          path: "categories", element:
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
        },

        {
          path: "brands", element:
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
        },

        { path: "*", element: <NotFound /> }
      ]
    }
  ])
  const myClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 15
      }
    }
  })
  return (
    <QueryClientProvider client={myClient}>
      <CartContextProvider>
        <UserContextProvider>
          <Toaster
            position="top-right"
            reverseOrder={false} />
          <RouterProvider router={router} />

        </UserContextProvider>
      </CartContextProvider>
    </QueryClientProvider>

  )
}

export default App


