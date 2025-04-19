import React, { useState } from "react";
import { Offcanvas, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import fetchApi from "../../api/fetchApi";
import { FaSyncAlt, FaBookOpen } from "react-icons/fa";

const SideTab = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const redirectToAbout = () => {
    handleClose();
    navigate("/about");
  };

  const handleReset = async () => {
    try {
      const response = await fetchApi({
        method: "get",
        url: "/resetDB",
      });
      if (response.msg === "Database reset completed") {
        toast.success("Database refresh completed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
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
          border: "2px solid white",
        }}
      >
        About this project
      </div>

      <Offcanvas
        className="bg-dark"
        show={show}
        onHide={handleClose}
        placement="end"
        scroll
        style={{ color: "#fff" }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title style={{ fontWeight: "600" }}>About This Project</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body style={{ paddingBottom: "90px" }}>
          <img
            src="/img/AboutBackground/AboutBackground.png"
            alt="Home Deluxe"
            style={{ width: "100%", marginBottom: "1rem", borderRadius: "8px" }}
          />
          <p>
            Welcome to <strong>Home Deluxe</strong>! This e-commerce website is a project developed
            by students from the Coding Bootcamp at Hack Academy.
          </p>
          <Button variant="light" onClick={redirectToAbout} className="w-100">
            <FaBookOpen style={{ marginRight: "6px" }} />
            Read more
          </Button>

          <hr style={{ borderColor: "#666" }} />

          <div>
            <h5>Test Login Credentials</h5>
            <Badge bg="secondary" className="mb-2">
              User
            </Badge>
            <p className="d-flex flex-column">
              Email: userprueba@gmail.com <br />
              Password: password123
            </p>
            <Badge bg="secondary" className="mb-2">
              Admin
            </Badge>
            <p>
              Email: admin@homedeluxe.com <br />
              Password: password123
            </p>
          </div>

          <hr style={{ borderColor: "#666" }} />
          <p>If you want fresh data to begin testing, use the button below:</p>
        </Offcanvas.Body>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "1rem",
            borderTop: "1px solid #333",
            background: "#111",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Button variant="danger" onClick={handleReset} className="w-100">
            <FaSyncAlt style={{ marginRight: "6px" }} />
            Reset DB
          </Button>
        </div>
      </Offcanvas>
    </>
  );
};

export default SideTab;
