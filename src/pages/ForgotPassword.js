import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar";
import {
  TopicContainer,
  InputContainer,
  SubButtonContainer,
  SpinnerContainer
} from "../components/Customs";
import { useSelector, useDispatch } from "react-redux";
import { get_verification_code_action, forgot_pwd_action } from "../redux";

function ForgotPassword() {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPwd] = useState("");
  const [confirmPassword, setConfirmPwd] = useState("");

  const dispatch = useDispatch();
  const signin_state = useSelector(state => state.signin);
  const { loading, error } = signin_state;

  const payload = {
    verificationCode: verificationCode,
    newPassword: newPassword,
    confirmPassword: confirmPassword
  };

  return (
    <div className="background">
      <TopNavBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>Forgot Password</TopicContainer>
          </div>
          <div className="center direction">
            <SubButtonContainer
              onClick={() => dispatch(get_verification_code_action())}
            >
              Send Verification Code
            </SubButtonContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="text"
              className="form-control"
              id="code"
              name="verificationcode"
              placeholder="Verification Code"
              onChange={e => setVerificationCode(e.target.value)}
            ></InputContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="password"
              className="form-control"
              id="newpwd"
              name="newpassword"
              placeholder="New Password"
              onChange={e => setNewPwd(e.target.value)}
            ></InputContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="password"
              className="form-control"
              id="confirmpwd"
              name="confirmpassword"
              placeholder="Confirm Password"
              onChange={e => setConfirmPwd(e.target.value)}
            ></InputContainer>
          </div>
          <div className="center direction">
            <SubButtonContainer
              onClick={() => dispatch(forgot_pwd_action(payload))}
            >
              Ok
            </SubButtonContainer>
            <Link to="/">
              <SubButtonContainer>Cancel</SubButtonContainer>
            </Link>
          </div>
          {loading && (
            <div className="center">
              <SpinnerContainer className="spinner-border"></SpinnerContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
