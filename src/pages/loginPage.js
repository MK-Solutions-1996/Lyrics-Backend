import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar";
import {
  ButtonContainer,
  TopicContainer,
  InputContainer,
  LongLabelContainer
} from "../components/Customs";

import { useSelector, useDispatch } from 'react-redux';
import { signin_action } from '../redux';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const payload = {
    username: username,
    password: password
  };

  const dispatch = useDispatch();
  const signin_state = useSelector(state => state.signin);
  const { loading, user, error } = signin_state;

  console.log('error:', error);

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
              onChange={(e) => setUsername(e.target.value)}
            ></InputContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="password"
              className="form-control"
              id="pwd"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></InputContainer>
          </div>
          <div className="center">
            {/* <Link to="/mainPage">
              <ButtonContainer onClick={() => dispatch(signin_action(payload))}>Login</ButtonContainer>
            </Link> */}
            <ButtonContainer onClick={() => dispatch(signin_action(payload))}>Login</ButtonContainer>
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

export default Login;
