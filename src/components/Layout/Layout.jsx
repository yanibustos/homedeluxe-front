import { Outlet } from "react-router-dom";

import NavMenu from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTopButton from "../scrollToTop/scrollToTop";

import "./Layout.css";
import SideTab from "../sidebarTab/sidebarTab";

function Layout() {
  return (
    <div className="layout-container">
      <NavMenu />
      <Outlet />
      <Footer />
      <SideTab />
      <ScrollToTopButton />
    </div>
  );
}

export default Layout;
