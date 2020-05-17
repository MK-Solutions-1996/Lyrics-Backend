import Axios from "axios";
import {
  SONG_FETCH_LOADING,
  SONG_FETCH_MESSAGE,
  SONG_FETCH_ALL,
  SONG_FETCH_SINGLE,
  SONG_FETCH_ERROR,
  SONG_CLEAR_STATE,
} from "./song_types";

const fetchLoading = () => {
  return {
    type: SONG_FETCH_LOADING,
  };
};

const fetchMessage = (message) => {
  return {
    type: SONG_FETCH_MESSAGE,
    payload: message,
  };
};

const fetchALL = (songs) => {
  return {
    type: SONG_FETCH_ALL,
    payload: songs,
  };
};

const fetchSingle = (song) => {
  return {
    type: SONG_FETCH_SINGLE,
    payload: song,
  };
};

const fetchError = (error) => {
  return {
    type: SONG_FETCH_ERROR,
    payload: error,
  };
};

const clearState = () => {
  return {
    type: SONG_CLEAR_STATE,
  };
};

export const save_song_action = (formData) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "POST",
      url: process.env.REACT_APP_BASE_URL + "/song",
      data: formData,
      headers: { api_key: process.env.REACT_APP_API_KEY },
    })
      .then(() => {
        dispatch(fetchMessage("Saved successfully"));
        dispatch(clear_state_action());
        dispatch(get_all_songs_action());
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const get_all_songs_action = () => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: process.env.REACT_APP_BASE_URL + "/song",
      headers: { api_key: process.env.REACT_APP_API_KEY },
    })
      .then((res) => {
        const result = res.data;
        dispatch(fetchALL(result));
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const update_song_action = (songId, formData) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "PATCH",
      url: process.env.REACT_APP_BASE_URL + "/song/" + songId,
      data: formData,
      headers: { api_key: process.env.REACT_APP_API_KEY },
    })
      .then(() => {
        dispatch(fetchMessage("Updated successfully"));
        dispatch(clear_state_action());
        dispatch(get_all_songs_action());
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const delete_song_action = (songId) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "DELETE",
      url: process.env.REACT_APP_BASE_URL + "/song/" + songId,
      headers: { api_key: process.env.REACT_APP_API_KEY },
    })
      .then(() => {
        dispatch(fetchMessage("Deleted successfully"));
        dispatch(clear_state_action());
        dispatch(get_all_songs_action());
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const clear_state_action = () => {
  return (dispatch) => {
    dispatch(clearState());
  };
};
