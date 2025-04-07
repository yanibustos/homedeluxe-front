import React from "react";

import "./ChevronIcon.css";

function ChevronIcon({ isOpen = false, className = "" }) {
  return (
    <div className="chevron-icon-container">
      <span className={`chevron ${isOpen ? "rotated" : ""} ${className}`}></span>
    </div>
  );
}

export default ChevronIcon;
