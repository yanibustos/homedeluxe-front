import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";

function Logout() {
  const dispatch = useDispatch();

  dispatch(logout());

  return <Navigate to="/" />;
}

export default Logout;
