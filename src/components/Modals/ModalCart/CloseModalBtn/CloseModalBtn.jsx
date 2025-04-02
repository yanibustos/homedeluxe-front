import React from "react";

import "./CloseModalBtn.css";

const CloseModalBtn = ({ handleClose }) => (
  <p className="close-modal d-sm-none d-block pt-3 mt-auto" onClick={handleClose}>
    <span className="ico me-2"></span>
    <span>Close and Continue Shopping</span>
  </p>
);

export default CloseModalBtn;
