import Axios from "axios";
import {
  SONG_FETCH_LOADING,
  SONG_FETCH_MESSAGE,
  SONG_FETCH_ALL,
  SONG_FETCH_SINGLE,
  SONG_FETCH_ERROR
} from "./song_types";

const fetchLoading = () => {
  return {
    type: SONG_FETCH_LOADING
  };
};

const fetchMessage = message => {
  return {
    type: SONG_FETCH_MESSAGE,
    payload: message
  };
};

const fetchALL = songs => {
  return {
    type: SONG_FETCH_ALL,
    payload: songs
  };
};

const fetchSingle = song => {
  return {
    type: SONG_FETCH_SINGLE,
    payload: song
  };
};

const fetchError = error => {
  return {
    type: SONG_FETCH_ERROR,
    payload: error
  };
};

export const save_song_action = payload => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "POST",
      url: process.env.REACT_APP_BASE_URL + "/song",
      data: {
        sinhalaTitle: payload.sinhalaTitle,
        singlishTitle: payload.singlishTitle,
        artistId: payload.artistId,
        categories: payload.categories,
        song: payload.song,
        likes: payload.likes
      },
      headers: { api_key: process.env.REACT_APP_API_KEY }
    })
      .then(() => {
        //history.push('/mainPage');
        dispatch(fetchMessage("Saved successfully"));
        dispatch(get_all_songs_action());
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const get_all_songs_action = () => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: process.env.REACT_APP_BASE_URL + "/song",
      headers: { api_key: process.env.REACT_APP_API_KEY }
    })
      .then(res => {
        //history.push('/mainPage');
        const result = res.data;
        dispatch(fetchALL(result));
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const update_song_action = (songId, payload) => {
  const update_payload = [
    { key: "sinhalaTitle", value: payload.sinhalaTitle },
    { key: "singlishTitle", value: payload.singlishTitle },
    { key: "artistId", value: payload.artistId },
    { key: "categories", value: payload.categories },
    { key: "song", value: payload.song },
    { key: "likes", value: payload.likes }
  ];

  console.log("update_payload:", update_payload);
  console.log("SongId:", songId);

  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "PATCH",
      url: process.env.REACT_APP_BASE_URL + "/song/" + songId,
      data: update_payload,
      headers: { api_key: process.env.REACT_APP_API_KEY }
    })
      .then(() => {
        //history.push('/mainPage');
        dispatch(fetchMessage("Updated successfully"));
        dispatch(get_all_songs_action());
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const delete_song_action = songId => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "DELETE",
      url: process.env.REACT_APP_BASE_URL + "/song/" + songId,
      headers: { api_key: process.env.REACT_APP_API_KEY }
    })
      .then(() => {
        //history.push('/mainPage');
        dispatch(fetchMessage("Deleted successfully"));
        dispatch(get_all_songs_action());
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};
