import {
  SONG_FETCH_LOADING,
  SONG_FETCH_MESSAGE,
  SONG_FETCH_ALL,
  SONG_FETCH_SINGLE,
  SONG_FETCH_ERROR
} from "./song_types";

const initial_state = {
  song_loading: false,
  message: "",
  songs: [],
  singleSong: {},
  song_error: ""
};

const song_reducer = (state = initial_state, action) => {
  switch (action.type) {
    case SONG_FETCH_LOADING:
      return {
        ...state,
        song_loading: true
      };
    case SONG_FETCH_MESSAGE:
      return {
        ...state,
        song_loading: false,
        message: action.payload,
        song_error: ""
      };
    case SONG_FETCH_ALL:
      return {
        ...state,
        song_loading: false,
        songs: action.payload,
        song_error: ""
      };
    case SONG_FETCH_SINGLE:
      return {
        ...state,
        song_loading: false,
        singleSong: action.payload,
        song_error: ""
      };
    case SONG_FETCH_ERROR:
      return {
        ...state,
        song_loading: false,
        song_error: action.payload
      };
    default:
      return state;
  }
};

export default song_reducer;
