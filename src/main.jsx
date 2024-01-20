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
import Success from "./Components/Payment/PaymentSuccess/Success.jsx";
import PaymentHistory from "./Components/Payment/PaymentHistory/PaymentHistory.jsx";
import ManualPayment from "./Components/Payment/ManualPayment/ManualPayment.jsx";
import AddInfo from "./Components/AddInfo/AddInfo.jsx";
import ManualHistory from "./Components/ManualHistory/ManualHistory.jsx";
import MyInfo from "./Components/MyInfo/MyInfo.jsx";
import AppInfo from "./Components/AppInfo/AppInfo.jsx";

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
        path: "/success",
        element: <PrivateRoute><Success></Success></PrivateRoute>,
      },
      {
        path: "/payment-fail",
        element: <PrivateRoute><PaymentFail></PaymentFail></PrivateRoute>,
      },
      {
        path: "/history",
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>,
      },
      {
        path: "/manual",
        element: <PrivateRoute><ManualPayment></ManualPayment></PrivateRoute>,
      },
      {
        path: "/addinfo",
        element: <PrivateRoute><AddInfo></AddInfo></PrivateRoute>,
      },
      {
        path: "/appinfo",
        element: <PrivateRoute><AppInfo></AppInfo></PrivateRoute>,
      },
      {
        path: "/number",
        element: <PrivateRoute><ManualHistory></ManualHistory></PrivateRoute>,
      },
      {
        path: "/myinfo",
        element: <PrivateRoute><MyInfo></MyInfo></PrivateRoute>,
      },
    ],
  },
  {
    path: "/payment-success",
    element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
