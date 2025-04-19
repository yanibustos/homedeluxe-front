import React from "react";

import "./CategoryCard.css";
import { Link } from "react-router-dom";

function CategoryCard({ image, name, slug }) {
  return (
    <div className="categoryCard-container">
      <Link to={`products/categories/${slug}`}>
        <img src={image} alt={name} />
      </Link>
    </div>
  );
}

export default CategoryCard;
