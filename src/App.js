import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Router } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DefaultPage from "./pages/defaultes";
import MainPage from "./pages/MainPage";
import Artists from "./pages/Artists";
import Songs from "./pages/Songs";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";
import ForgotPw from "./pages/ForgotPassword";
import { Provider } from "react-redux";
import store from "./redux/store";
import history from "./history";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginPage}></Route>
          <Route exact path="/mainPage" component={MainPage}></Route>
          <Route exact path="/Artists" component={Artists}></Route>
          <Route exact path="/Songs" component={Songs}></Route>
          <Route exact path="/Categories" component={Categories}></Route>
          <Route exact path="/settings" component={Settings}></Route>
          <Route exact path="/forgotpassword" component={ForgotPw}></Route>
          <Route component={DefaultPage}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
