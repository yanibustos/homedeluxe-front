import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SideTab = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const redirectToAbout = () => {
    handleClose();
    navigate("/about");
  };

  return (
    <>
      {}
      <div
        onClick={handleShow}
        style={{
          position: "fixed",
          top: "40%",
          right: 40,
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "top right",
          backgroundColor: "#000",
          color: "#fff",
          padding: "10px 20px",
          cursor: "pointer",
          zIndex: 400,
          borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          border: '2px solid white',
        }}
      >
        About this project
      </div>

      {}
      <Offcanvas
        show={show}
        onHide={handleClose}
              placement="end"
              scroll
        style={{ backgroundColor: "#000", color: "#fff" }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>About This Project</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img
            src="/img/AboutBackground/AboutBackground.png"
            alt="Home Deluxe"
            style={{ width: "100%", marginBottom: "1rem", borderRadius: "8px" }}
          />
          <p>
            Before beginning development, we focused on structuring the backend of the application.
            We identified the main features and created a Model Entity Relationship (MER) diagram to
            visualize the connections between key entities: Users, Products, Orders, Styles, and
            Admins. Learn more about this project, its purpose, and the technologies used clicking below.
          </p>
          <Button variant="light" onClick={redirectToAbout}>
            Click Here
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideTab;
