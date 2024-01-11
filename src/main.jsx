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
        path: "/details/:_id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
