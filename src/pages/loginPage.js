import React from "react";
import { Link } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar";
import {
  ButtonContainer,
  TopicContainer,
  InputContainer,
  LongLabelContainer
} from "../components/Customs";

function login() {
  return (
    <div className="background">
      <TopNavBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>Sign In</TopicContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="text"
              className="form-control"
              id="usr"
              name="username"
              placeholder="User Name"
            ></InputContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="password"
              className="form-control"
              id="pwd"
              name="password"
              placeholder="Password"
            ></InputContainer>
          </div>
          <div className="center">
            <Link to="/mainPage">
              <ButtonContainer>Login</ButtonContainer>
            </Link>
          </div>
          <div className="center">
            <Link to="/">
              <LongLabelContainer>Forgot your password?</LongLabelContainer>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
