import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar";
import {
  ButtonContainer,
  TopicContainer,
  InputContainer,
  LongLabelContainer,
  MessageContainer,
  SpinnerContainer
} from "../components/Customs";
import { Message } from "primereact/message";
import { useSelector, useDispatch } from "react-redux";
import { signin_action } from "../redux";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const signin_state = useSelector(state => state.signin);
  const { loading, error } = signin_state;

  const payload = {
    username: username,
    password: password
  };

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
              onChange={e => setUsername(e.target.value)}
            ></InputContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="password"
              className="form-control"
              id="pwd"
              name="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            ></InputContainer>
          </div>
          {error && error.data && (
            <Message
              severity="error"
              style={MessageContainer}
              text={error.data}
            />
          )}
          {typeof error === "undefined" ? (
            <Message
              severity="error"
              style={MessageContainer}
              text="Server is not running this time"
            />
          ) : (
            <div></div>
          )}

          <div className="center">
            <ButtonContainer onClick={() => dispatch(signin_action(payload))}>
              Login
            </ButtonContainer>
          </div>
          {loading && (
            <div className="center">
              <SpinnerContainer className="spinner-border"></SpinnerContainer>
            </div>
          )}
          <div className="center">
            <Link to="/forgotpassword">
              <LongLabelContainer>Forgot your password?</LongLabelContainer>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
