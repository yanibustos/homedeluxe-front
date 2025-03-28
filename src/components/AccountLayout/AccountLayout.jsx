import { Link, Outlet, useLocation, useMatch } from "react-router-dom";
import "./AccountLayout.css";

function AccountLayout() {
  const location = useLocation();
  const isAccountRoot = location.pathname === "/account";

  return (
    <div className="accountLayout-container vh-100 bg-white">
      <div className="container-fluid border-bottom  mb-3">
        <div className="fw-semibold container d-flex justify-content-center justify-content-lg-start py-4 text-uppercase accountLayout-title">
          Account
        </div>
      </div>
      <div className="container-lg accountLayout-menu-container">
        <div className="row">
          <div className="col-12 col-lg-3">
            <ul className="list-unstyled d-flex flex-row gap-3 gap-lg-0 justify-content-center d-lg-block">
              {["profile", "orders", "wishlist"].map((path) => {
                const match = useMatch(`/account/${path}`);
                const isActive = match || (isAccountRoot && path === "profile");

                return (
                  <li key={path} className="text-uppercase border-bottom mb-3 pb-3">
                    <Link
                      to={path}
                      className={`text-decoration-none account-link ${isActive ? "active" : ""}`}
                    >
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </Link>
                  </li>
                );
              })}
              <li className="text-uppercase border-bottom mb-3 pb-3">
                <Link to="/logout" className="text-decoration-none account-link">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-9"></div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
