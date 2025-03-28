import React from "react";

const CloseModalBtn = ({ handleClose }) => (
  <p className="d-sm-none d-block pt-3 close-modal mt-auto" onClick={handleClose}>
    <span className="ico me-2"></span>
    <span>Close and Continue Shopping</span>
  </p>
);

export default CloseModalBtn;
