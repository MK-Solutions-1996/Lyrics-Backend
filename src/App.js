import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Router } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage";
import DefaultPage from "./pages/defaultes";
import MainPage from "./pages/mainPage";
import AddArtist from "./pages/artist/addArtist";
import UpdateArtist from "./pages/artist/updateArtist";
import ViewArtists from "./pages/artist/viewArtists";
import AddSong from "./pages/song/addSong";
import UpdateSong from "./pages/song/updateSong";
import ViewSongs from "./pages/song/viewSongs";
import AddCategory from "./pages/category/addCategory";
import UpdateCategory from "./pages/category/updateCategory";
import ViewCategories from "./pages/category/viewCategories";
import { Provider } from 'react-redux';
import store from './redux/store';
import history from './history';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginPage}></Route>
          <Route exact path="/mainPage" component={MainPage}></Route>
          <Route exact path="/addArtist" component={AddArtist}></Route>
          <Route exact path="/updateArtist" component={UpdateArtist}></Route>
          <Route exact path="/viewArtists" component={ViewArtists}></Route>
          <Route exact path="/addSong" component={AddSong}></Route>
          <Route exact path="/updateSong" component={UpdateSong}></Route>
          <Route exact path="/viewSongs" component={ViewSongs}></Route>
          <Route exact path="/addCategory" component={AddCategory}></Route>
          <Route exact path="/updateCategory" component={UpdateCategory}></Route>
          <Route exact path="/viewCategories" component={ViewCategories}></Route>
          <Route component={DefaultPage}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
