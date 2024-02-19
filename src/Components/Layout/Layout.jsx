import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import BottomNavbar from "../Homepage/BottomNavbar";

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <BottomNavbar></BottomNavbar>
        </div>
    );
};

export default Layout;