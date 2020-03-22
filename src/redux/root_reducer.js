import { combineReducers } from "redux";
import { signin_reducer } from "./USER/signin_user";
import artist_reducer from "./ARTIST/artist_reducer";
import category_reducer from "./CATEGORY/category_reducer";
import song_reducer from "./SONG/song_reducer";

const root_reducer = combineReducers({
  signin: signin_reducer,
  artist: artist_reducer,
  category: category_reducer,
  song: song_reducer
});

export default root_reducer;
