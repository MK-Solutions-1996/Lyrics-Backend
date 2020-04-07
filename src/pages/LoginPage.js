import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar";
import { Message } from "primereact/message";
import { useSelector, useDispatch } from "react-redux";
import { signin_action } from "../redux";
import {
    ButtonContainer,
    TopicContainer,
    InputContainer,
    LongLabelContainer,
    MessageContainer,
    SpinnerContainer
} from "../components/Customs";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const signin_state = useSelector(state => state.user);
    const { user_loading, user_error } = signin_state;

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
                    {user_error && user_error.data && (
                        <Message
                            severity="error"
                            style={MessageContainer}
                            text={user_error.data}
                        />
                    )}
                    {typeof user_error === "undefined" ? (
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
                    {user_loading && (
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
