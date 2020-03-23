import React, { useEffect } from "react";
import { NavigationBar } from "../components/NavigationBar";
import { useSelector, useDispatch } from 'react-redux';
import {
  get_all_artists_action,
  get_all_categories_action,
  get_all_songs_action
} from '../redux';

function MainPage() {


  return (
    <div className="background">
      <NavigationBar />
    </div>
  );
}

export default MainPage;
