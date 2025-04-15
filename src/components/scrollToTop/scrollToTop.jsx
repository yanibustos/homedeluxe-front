import React, { useEffect, useState } from "react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "100px",
          right: "30px",
          zIndex: 1000,
          width: "50px",
          height: "50px",
          backgroundColor: "#000",
          color: "#fff",
          border: "2px solid #fff",
          borderRadius: "50%",
          display: visible ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.4)",
          cursor: "pointer",
          transition: "transform 0.3s ease, background-color 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.backgroundColor = "#333";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "#000";
        }}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/059897738531" 
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 1000,
          width: "50px",
          height: "50px",
          backgroundColor: "#25D366",
          color: "#fff",
          border: "2px solid #fff",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.4)",
          cursor: "pointer",
          transition: "transform 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="Contact by Whatsapp"
      >
        <FaWhatsapp size={22} />
      </a>
    </>
  );
};

export default ScrollToTopButton;