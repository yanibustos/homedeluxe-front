import { Outlet } from "react-router-dom";
import "./AccountLayout.css";

function AccountLayout() {
  return (
    <div className="accountLayout-container">
      AccountLayout
      <Outlet />
    </div>
  );
}

export default AccountLayout;
