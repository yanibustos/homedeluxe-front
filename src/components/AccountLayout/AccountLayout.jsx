import { Link, Outlet, useLocation, useMatch } from "react-router-dom";
import "./AccountLayout.css";

function AccountLayout() {
  const location = useLocation();
  const isAccountRoot = location.pathname === "/account";

  return (
    <div className="accountLayout-container bg-white mb-5">
      <div className="container-fluid border-bottom  mb-3">
        <div className="fw-semibold container d-flex justify-content-center justify-content-lg-start py-4 text-uppercase accountLayout-title">
          My Account
        </div>
      </div>
      <div className="container accountLayout-menu-container">
        <div className="row pt-3">
          <div className="col-12 col-lg-3 pb-3 mb-3 border-bottom accountLayout-menu-border">
            <ul className="list-unstyled d-flex flex-row gap-3 gap-lg-0 justify-content-center d-lg-block">
              {["profile", "orders", "wishlist"].map((path) => {
                const match = useMatch(`/account/${path}`);
                const isActive = match || (isAccountRoot && path === "profile");

                return (
                  <li
                    key={path}
                    className="accountLayout-li text-uppercase border-bottom mb-3 pb-3"
                  >
                    <Link
                      to={path}
                      className={`text-decoration-none account-link ${isActive ? "active" : ""}`}
                    >
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </Link>
                  </li>
                );
              })}
              <li className="accountLayout-li text-uppercase border-bottom mb-3 pb-3">
                <Link to="/logout" className="text-decoration-none account-link">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-9 ps-lg-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountLayout;
