import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar";
import $ from "jquery";
import { Message } from "primereact/message";
import { useSelector, useDispatch } from "react-redux";
import { get_verification_code_action, forgot_pwd_action } from "../redux";
import {
  TopicContainer,
  InputContainer,
  SubButtonContainer,
  SpinnerContainer,
  MessageContainer
} from "../components/Customs";

function ForgotPassword() {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPwd] = useState("");
  const [confirmPassword, setConfirmPwd] = useState("");

  const dispatch = useDispatch();
  const signin_state = useSelector(state => state.user);
  const { loading, error, users } = signin_state;

  const payload = {
    verificationCode: verificationCode,
    newPassword: newPassword,
    confirmPassword: confirmPassword
  };

  //success messages timeout function
  window.setTimeout(function() {
    $(".alert")
      .fadeTo(2000, 0)
      .slideUp(2000, function() {
        $(this).remove();
      });
  }, 3000);

  return (
    <div className="background">
      <TopNavBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>Forgot Password</TopicContainer>
          </div>
          <div className="center oppositedirection">
            <SubButtonContainer
              onClick={() => dispatch(get_verification_code_action())}
            >
              Send Verification Code
            </SubButtonContainer>
            {users === "Email is sent" ? (
              <div class="alert alert-success message" role="alert">
                <strong>Success!</strong> {users}
              </div>
            ) : (
              <div></div>
            )}
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
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
