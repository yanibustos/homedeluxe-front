import { Link } from "react-router-dom";
import "./NotFound.css";
function NotFound() {
  return (
    <div className="not-found-container container d-flex justify-content-center align-items-center flex-column">
      <div className="not-found-card d-flex justify-content-center align-items-center flex-column">
        <h1>404</h1>
        <p>Sorry, we couldn't find this page</p>
        <Link to={"/"} className="button">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
