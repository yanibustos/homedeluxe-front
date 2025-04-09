import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { clearCart } from "../../redux/shoppingCartSlice";

function Logout() {
  const dispatch = useDispatch();

  dispatch(clearCart());
  dispatch(logout());

  return <Navigate to="/" />;
}

export default Logout;
