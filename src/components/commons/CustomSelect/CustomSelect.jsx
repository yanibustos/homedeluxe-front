import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import ChevronIcon from "../Chevron/ChevronIcon";

import "./CustomSelect.css";

function CustomSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Recommended");
  const selectRef = useRef(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSelect = (e) => {
    const value = e.target.dataset.value;
    if (value) {
      setSelected(e.target.textContent);
      setOpen(false);
      toast.warning("Sorry, this feature is still under development");
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
        <span>Order by: {selected}</span>
        <ChevronIcon isOpen={open} />
      </div>
      {open && (
        <div className="custom-select-options" onClick={handleSelect}>
          <span data-value="recommended" className="custom-select-option">
            Recommended
          </span>
          <span data-value="recent" className="custom-select-option">
            Recent
          </span>
          <span data-value="category" className="custom-select-option">
            Category
          </span>
          <span data-value="lowerPrice" className="custom-select-option">
            Lower Price
          </span>
          <span data-value="higherPrice" className="custom-select-option">
            Higher Price
          </span>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
