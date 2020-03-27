import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { Message } from "primereact/message";
import $ from "jquery";
import {
  TopicContainer,
  InputContainer,
  SubButtonContainer,
  MessageContainer
} from "../components/Customs";
import { useSelector, useDispatch } from "react-redux";
import { change_pwd_action, get_admin_action } from "../redux";

function Settings() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const signin_state = useSelector(state => state.signin);
  const { users, error } = signin_state;

  useEffect(() => {
    dispatch(get_admin_action());
  }, []);

  var id = "";
  users.map(data => {
    id = data._id;
  });

  const payload = {
    id: id,
    password: currentPwd,
    newPassword: newPwd
  };

  window.setTimeout(function() {
    $(".alert")
      .fadeTo(5000, 0)
      .slideUp(0, function() {
        $(this).remove();
      });
  }, 10000);

  const change_pwd = () => {
    if (newPwd === confirmPwd) {
      dispatch(change_pwd_action(payload));
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="background">
      <NavigationBar />
      <div className="center">
        <div className="card">
          <div className="center">
            <TopicContainer>Change Password</TopicContainer>
          </div>
          <div className="form-group center">
            <InputContainer
              type="password"
              className="form-control"
              id="currentpwd"
              name="currentpassword"
              placeholder="Current Password"
              onChange={e => setCurrentPwd(e.target.value)}
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
            <SubButtonContainer onClick={() => change_pwd()}>
              Change
            </SubButtonContainer>
            <Link to="/mainpage">
              <SubButtonContainer>Cancel</SubButtonContainer>
            </Link>
          </div>
          {error && (
            <Message
              severity="error"
              style={MessageContainer}
              text={error.data}
            />
          )}
          {isError === true ? (
            <div class="alert alert-danger message" role="alert">
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <strong>Error!</strong> New password and Confirm password not
              matched.
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
