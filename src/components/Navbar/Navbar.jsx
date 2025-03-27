import React from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import "./Navbar.css";



function NavMenu() {

  return <div className="navbar-container fixed-top">
    <Navbar collapseOnSelect expand="lg" >
      <Container className="gx-1">
        <Navbar.Brand className="mb-2 logo" href="#home" ><img src="../img/logo-white.png" alt="Home-Deluxe"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link" href="#Catalog">Catalog</Nav.Link>
            <Nav.Link className="nav-link" href="#Featured">Featured</Nav.Link>
            <Nav.Link className="nav-link" href="#AboutUs">About us</Nav.Link>

          </Nav>
          <Nav>
            <Nav.Link className="nav-font" href="#deets">My Account</Nav.Link>
            <Nav.Link className="nav-font" eventKey={2} href="#memes">
              logocarrito*
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
  </div>;
  
}

export default NavMenu;