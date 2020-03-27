import React from "react";
import { Navbar } from "react-bootstrap";
import { logo_icon } from "../constants/imports";
import { NavigationBarDivContainer } from "../components/Customs";

export const TopNavBar = () => (
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
    </Navbar>
  </NavigationBarDivContainer>
);
