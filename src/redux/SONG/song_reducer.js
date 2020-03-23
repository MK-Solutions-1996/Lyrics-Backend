import {
  SONG_FETCH_LOADING,
  SONG_FETCH_MESSAGE,
  SONG_FETCH_ALL,
  SONG_FETCH_SINGLE,
  SONG_FETCH_ERROR
} from "./song_types";

const initial_state = {
  loading: false,
  message: "",
  songs: [],
  singleSong: {},
  error: ""
};

const song_reducer = (state = initial_state, action) => {
  switch (action.type) {
    case SONG_FETCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case SONG_FETCH_MESSAGE:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: ""
      };
    case SONG_FETCH_ALL:
      return {
        ...state,
        loading: false,
        songs: action.payload,
        error: ""
      };
    case SONG_FETCH_SINGLE:
      return {
        ...state,
        loading: false,
        singleSong: action.payload,
        error: ""
      };
    case SONG_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default song_reducer;
