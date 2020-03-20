import React from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../components/Customs";
import { Nav, Navbar } from "react-bootstrap";
import { logo_icon } from "../constants/imports";
import styled from "styled-components";
const Styles = styled.div`
  .navbar {
    background-color: var(--mainRed);
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: var(--mainBlack);
    font-size: 1.2rem;
    margin: 0.2rem 0.5rem 0.2rem 0;
    font-weight: bold;
    &:hover {
      color: white;
    }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: var(--mainBlack);
    &:hover {
      color: white;
    }
  }
`;
export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <img src={logo_icon} alt="logo" className="navbar-brand logo" />
      </Navbar.Brand>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5">
          <div className="nav-link">SINHALA LYRICS</div>
        </li>
      </ul>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link href="/viewCategory">Artist</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/viewCategory">Song</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/viewCategory">Category</Nav.Link>
          </Nav.Item>
          <Link to="/" className="ml-auto">
            <ButtonContainer>Log Out</ButtonContainer>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);
