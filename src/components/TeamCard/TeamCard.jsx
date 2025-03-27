import React from "react";
import { Link } from "react-router-dom";
import "./TeamCard.css";

const TeamCard = ({ name, role, description, image, twitter, linkedin }) => (
  <div className="teamCard-container col-md-4 col-sm-6 mb-4">
    <div className="card team-card text-center shadow-sm p-3">
      <img
        src={image}
        alt={name}
        className="rounded-circle mx-auto mb-3"
        width="120"
        height="120"
      />
      <h5 className="fw-bold">{name}</h5>
      <p className="text-muted">{role}</p>
      <p className="text-muted">{description}</p>
      <div className="d-flex justify-content-center mt-2">
        {twitter && (
          <Link to={twitter} className="me-3 text-muted">
            <i className="bi bi-twitter fs-4"></i>
          </Link>
        )}
        {linkedin && (
          <Link to={linkedin} className="text-muted">
            <i className="bi bi-linkedin fs-4"></i>
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default TeamCard;
