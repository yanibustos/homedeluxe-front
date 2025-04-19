import React, { useState, useEffect, useRef } from "react";

import ChevronIcon from "../Chevron/ChevronIcon";

import "./CustomSelect.css";

function CustomSelect({ selectedValue, onSelect }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSelect = (e) => {
    const value = e.target.dataset.value;
    if (value) {
      onSelect(value);
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select-container" ref={selectRef} onClick={handleToggle}>
      <div className="custom-select">
        <span>Order by: {selectedValue}</span>
        <ChevronIcon isOpen={open} />
      </div>
      {open && (
        <div className="custom-select-options" onClick={handleSelect}>
          <span data-value="Recent" className="custom-select-option">
            Recent
          </span>
          <span data-value="Lower Price" className="custom-select-option">
            Lower Price
          </span>
          <span data-value="Higher Price" className="custom-select-option">
            Higher Price
          </span>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
