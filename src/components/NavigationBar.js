import React from "react";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../components/Customs";
import { Nav, Navbar } from "react-bootstrap";
import { logo_icon } from "../constants/imports";
import { NavigationBarDivContainer } from "../components/Customs";
import disableBrowserBackButton from "disable-browser-back-navigation";

export const NavigationBar = user => (
  <NavigationBarDivContainer>
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
          <Link
            to={{ pathname: "/Artists", state: { user } }}
            className="ml-auto"
          >
            <ButtonContainer>Artist</ButtonContainer>
          </Link>
          <Link
            to={{ pathname: "/Songs", state: { user } }}
            className="ml-auto"
          >
            <ButtonContainer>Song</ButtonContainer>
          </Link>
          <Link
            to={{ pathname: "/Categories", state: { user } }}
            className="ml-auto"
          >
            <ButtonContainer>Category</ButtonContainer>
          </Link>
          <Link to={{ pathname: "/", state: "" }} className="ml-auto">
            <ButtonContainer onClick={() => disableBrowserBackButton()}>
              Log Out
            </ButtonContainer>
          </Link>
          <Link
            to={{ pathname: "/settings", state: { user } }}
            className="ml-auto"
          >
            <ButtonContainer>
              <i className="fas fa-cog"></i>
            </ButtonContainer>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </NavigationBarDivContainer>
);
