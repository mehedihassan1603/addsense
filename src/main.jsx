import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Components/Homepage/Home.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Login from "./Components/Authentication/Login/Login.jsx";
import Register from "./Components/Authentication/Register/Register.jsx";
import AuthProvider from "./Components/Authentication/AuthProvider/AuthProvider.jsx";
import PrivateRoute from "./Components/Authentication/PrivateRoute/PrivateRoute.jsx";
import Ads from "./Components/Ads/Ads.jsx";
import AddAds from "./Components/AddAds/AddAds.jsx";
import Details from "./Components/Details/Details.jsx";
import Package from "./Components/Package/Package.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import AddPackage from "./Components/AddPackage/AddPackage.jsx";
import Basic from "./Components/AddPackage/Basic.jsx";
import Standard from "./Components/AddPackage/Standard.jsx";
import Premium from "./Components/AddPackage/Premium.jsx";
import AllPackage from "./Components/Package/AllPackage.jsx";
import PaymentSuccess from "./Components/Payment/PaymentSuccess/PaymentSuccess.jsx";
import PaymentFail from "./Components/Payment/PaymentFailure/PaymentFail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/ads",
        element: <PrivateRoute><Ads></Ads></PrivateRoute>,
      },
      {
        path: "/addads",
        element: <PrivateRoute><AddAds></AddAds></PrivateRoute>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      },
      {
        path: "/ADDPACKAGE",
        element: <PrivateRoute><AddPackage></AddPackage></PrivateRoute>,
      },
      {
        path: "/basic",
        element: <PrivateRoute><Basic></Basic></PrivateRoute>,
      },
      {
        path: "/standard",
        element: <PrivateRoute><Standard></Standard></PrivateRoute>,
      },
      {
        path: "/premium",
        element: <PrivateRoute><Premium></Premium></PrivateRoute>,
      },
      {
        path: "/details/:_id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
      },
      {
        path: "/package",
        element: <PrivateRoute><AllPackage></AllPackage></PrivateRoute>,
      },
      {
        path: "/payment-success",
        element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>,
      },
      {
        path: "/payment-fail",
        element: <PrivateRoute><PaymentFail></PaymentFail></PrivateRoute>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
