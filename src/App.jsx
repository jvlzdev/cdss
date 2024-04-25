import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  createRoutesFromElements,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Discount from "./components/Discount/Discount";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
// import Product from "./pages/Product/Product";
// import Products from "./pages/Products/Products";
import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Category from "./pages/Category/Category";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import NewProduct from "./pages/NewProduct/NewProduct";

// import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
import { ProtectedLayout } from "./components/ProtectedLayout/ProtectedLayout";
import Sidebar from "./components/Sidebar/Sidebar-copy";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserSignUp from "./pages/UserSignUp/UserSignUp";
import Employees from "./pages/Employees/Employees";
import Dashboard from "./pages/Dashboard/Dashboard";
import Patients from "./pages/Patients/Patients";
import Assessments from "./pages/Assessments/Assessments";
import PatientProfile from "./pages/PatientProfile/PatientProfile";
import Diagnosis from "./pages/Diagnosis/Diagnosis";
import Planning from "./pages/Planning/Planning";
import Implementation from "./pages/Implementation/Implementation";
import Evaluation from "./pages/Evaluation/Evaluation";
// import { AuthLayout } from "./components/AuthLayout/AuthLayout";
// import { useAuth } from "./hooks/useAuth";

const Layout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log("layout", user);

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />

        <Route
          path="/"
          element={
            <ProtectedLayout />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/patients" element={<Patients />} />

          <Route path="/patient-profile" element={<PatientProfile />} />

          <Route path='/assessments' element={<Assessments />} />
          <Route path='/diagnosis' element={<Diagnosis />} />
          <Route path='/planning' element={<Planning />} />
          <Route path='/implementation' element={<Implementation />} />
          <Route path='/evaluation' element={<Evaluation />} />
          {/* <Route path="settings" element={<SettingsPage />} /> */}
        </Route>
      </Route>

      {/* [
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
        // element: <Login />,
        element: <UserLogin />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/signup",
        // element: <SignUp />,
        element: <UserSignUp />,
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
      },
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
] */}
    </>
  )
);

const App = () => {
  // useEffect(() => {
  //   const socket = io("ws://localhost:8080");
  //   socket.off("notification").on("notification", (msgObj, user_id) => {
  //     // logic for notification
  //     if (user_id === user._id) {
  //       dispatch(addNotification(msgObj));
  //     }
  //   });

  //   socket.off("new-order").on("new-order", (msgObj) => {
  //     if (user.isAdmin) {
  //       dispatch(addNotification(msgObj));
  //     }
  //   });
  // }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
