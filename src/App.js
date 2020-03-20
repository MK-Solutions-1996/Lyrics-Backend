import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import "./App.css";
//import { Provider } from "react-redux";
import LoginPage from "../src/pages/login";
import DefaultPage from "../src/pages/defaultes";
import ViewCategory from "./pages/category/viewCategories";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage}></Route>
      <Route exact path="/viewCategory" component={ViewCategory}></Route>
      <Route component={DefaultPage}></Route>
    </Switch>
  );
}

export default App;
