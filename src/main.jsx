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
import SmsForm from "./Components/SMS/SmsForm.jsx";
import Users from "./Components/Users/Users.jsx";
import StandardPayment from "./Components/Payment/ManualPayment/StandardPayment.jsx";
import PremiumPayment from "./Components/Payment/ManualPayment/PremiumPayment.jsx";
import AdminRoute from "./Components/Dashboard/AdminRoute.jsx";
import OthersInfo from "./Components/OthersInfo/OthersInfo.jsx";
import Profile from "./Components/Profile.jsx/Profile.jsx";
import User from "./Components/Profile.jsx/User.jsx";
import UserEdit from "./Components/Profile.jsx/UserEdit.jsx";
import SmsHistory from "./Components/SMS/SmsHistory.jsx";
import SmsAllHistory from "./Components/SMS/SmsAllHistory.jsx";
import UserHome from "./Components/Profile.jsx/UserHome.jsx";
import DashHome from "./Components/Dashboard/DashHome.jsx";
import AllAds from "./Components/AllAds/AllAds.jsx";
import EditForm from "./Components/AllAds/EditForm.jsx";
import Sms from "./Components/SMS/Sms.jsx";
import SmsTemplate from "./Components/SMS/SmsTemplate.jsx";
import AboutUsSection from "./Components/AboutUsSection/AboutUsSection.jsx";
import SmsContactForm from "./Components/SMS/SmsContactForm.jsx";
import SmsContact from "./Components/SMS/SmsContact.jsx";
import CreateBlogAds from "./Components/Blog/CreateBlogAds.jsx";
import BlogList from "./Components/Blog/BlogList.jsx";
import Blog from "./Components/Blog/Blog.jsx";
import ViewBlog from "./Components/Blog/ViewBlog.jsx";
import AdminLogin from "./Components/Authentication/Login/AdminLogin.jsx";
import Privacy from "./Components/Privacy/Privacy.jsx";
import Terms from "./Components/Privacy/Terms.jsx";
import Disclaimer from "./Components/Privacy/disclaimer.jsx";
import ContactUs from "./Components/Contact/ContactUs.jsx";

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
        path: "/adminlogin",
        element: <AdminLogin></AdminLogin>,
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
        path: "/blog",
        element: <PrivateRoute><Blog></Blog></PrivateRoute>,
      },
      {
        path: "/about",
        element: <AboutUsSection></AboutUsSection>
      },
      {
        path: "/privacy",
        element: <Privacy></Privacy>
      },
      {
        path: "/terms",
        element: <Terms></Terms>
      },
      {
        path: "/disclaimer",
        element: <Disclaimer></Disclaimer>
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>
      },
      {
        path: "/details/:_id",
        element: <PrivateRoute><Details></Details></PrivateRoute>,
      },
      {
        path: "/seemore/:_id",
        element: <PrivateRoute><ViewBlog></ViewBlog></PrivateRoute>,
      },
      {
        path: "/package",
        element: <PrivateRoute><AllPackage></AllPackage></PrivateRoute>,
      },
      {
        path: "/manual",
        element: <PrivateRoute><ManualPayment></ManualPayment></PrivateRoute>,
      },
      {
        path: "/standardpay",
        element: <PrivateRoute><StandardPayment></StandardPayment></PrivateRoute>,
      },
      {
        path: "/premiumpay",
        element: <PrivateRoute><PremiumPayment></PremiumPayment></PrivateRoute>,
      },
      
      {
        path: "/sms",
        element: <PrivateRoute><SmsForm></SmsForm></PrivateRoute>,
      },
      
    ],
  },
  {
    path: "/payment-success",
    element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>,
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
    path: "/profile",
    element: <Profile></Profile>,
    children: [
      {
        path:"profile",
        element:<UserHome></UserHome>
      },
      {
        path:"user",
        element:<User></User>
      },
      {
        path:"useredit",
        element:<UserEdit></UserEdit>
      },
      {
        path: "smsHistory",
        element: <SmsHistory></SmsHistory>,
      },
      {
        path: "myinfo",
        element: <MyInfo></MyInfo>,
      },
      {
        path: "sms",
        element: <SmsForm></SmsForm>
      },
      {
        path: "contact",
        element: <SmsContactForm></SmsContactForm>
      },
      {
        path: "contactemplate",
        element: <SmsContact></SmsContact>
      },
      {
        path: "smstemplate",
        element: <SmsTemplate></SmsTemplate>
      },
      {
        path: "package",
        element: <AllPackage></AllPackage>
      },
    ]
  },
  {
    path: "/dashboard",
    element: <AdminRoute><Dashboard></Dashboard></AdminRoute>,
    children:[
      {
        path: "",
        element:<DashHome></DashHome>
      },
      {
        path: "addads",
        element: <AddAds></AddAds>,
      },
      {
        path: "allAds",
        element: <AllAds></AllAds>,
      },
      {
        path: "addpackage",
        element:<AddPackage></AddPackage>,
      },
      {
        path: "basic",
        element:<Basic></Basic>,
      },
      {
        path: "standard",
        element:<Standard></Standard>,
      },
      {
        path: "premium",
        element:<Premium></Premium>,
      },
      {
        path: "history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "addinfo",
        element: <AddInfo></AddInfo>,
      },
      {
        path: "othersinfo",
        element: <OthersInfo></OthersInfo>,
      },
      {
        path: "appinfo",
        element: <AppInfo></AppInfo>,
      },
      {
        path: "number",
        element: <ManualHistory></ManualHistory>,
      },
      {
        path: "smsAllHistory",
        element: <SmsAllHistory></SmsAllHistory>,
      },
      {
        path: "smsinfo",
        element: <Sms></Sms>,
      },
      {
        path: "userinfo",
        element: <Users></Users>,
      },
      {
        path: "createBlog",
        element: <CreateBlogAds></CreateBlogAds>,
      },
      {
        path: "blogList",
        element: <BlogList></BlogList>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
