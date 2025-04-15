import React from "react";

import "./CategoryCard.css";

function CategoryCard({ image, name }) {
  return (
    <div className="categoryCard-container">
      <img src={image} alt={name} />
    </div>
  );
}

export default CategoryCard;
