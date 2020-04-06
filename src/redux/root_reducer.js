import { combineReducers } from "redux";
import user_reducer from "./USER/user_reducer";
import artist_reducer from "./ARTIST/artist_reducer";
import category_reducer from "./CATEGORY/category_reducer";
import song_reducer from "./SONG/song_reducer";

const root_reducer = combineReducers({
  user: user_reducer,
  artist: artist_reducer,
  category: category_reducer,
  song: song_reducer
});

export default root_reducer;
