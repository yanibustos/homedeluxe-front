import { Outlet } from "react-router-dom";

import NavMenu from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "./Layout.css";

function Layout() {
  return (
    <div className="layout-container vh-100">
      <NavMenu />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
