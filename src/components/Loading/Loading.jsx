import { Spinner } from "react-bootstrap";

import "./Loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-overlay position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    </div>
  );
}

export default Loading;
