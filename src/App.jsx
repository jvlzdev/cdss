import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Discount from './components/Discount/Discount';
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
// import Product from "./pages/Product/Product";
// import Products from "./pages/Products/Products";
import './App.css'
import SignUp from "./pages/SignUp/SignUp";
import Login from './pages/Login/Login';
import Category from './pages/Category/Category';
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import NewProduct from "./pages/NewProduct/NewProduct";

import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

const Layout = () => {
  return (
    <div>
      <Discount />
      <Navbar />
      <Categories />
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/category/:category",
        element: <Category />,
      },
      {
        path: "/new-product",
        element: <NewProduct />,
      },
      {
        path: "*",
        element: <Home />,
      }
      // {
      //   path: "/products/:id",
      //   element: <Products />,
      // },
      // {
      //   path: "/product/:id",
      //   element: <Product />,
      // },
    ],
  },
]);

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log('user', user)
  useEffect(() => {
    const socket = io("ws://localhost:8080");
    socket.off("notification").on("notification", (msgObj, user_id) => {
      // logic for notification
      if (user_id === user._id) {
        dispatch(addNotification(msgObj));
      }
    });

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user.isAdmin) {
        dispatch(addNotification(msgObj));
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
