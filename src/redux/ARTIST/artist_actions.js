import Axios from "axios";
import {
  ARTIST_FETCH_LOADING,
  ARTIST_FETCH_MESSAGE,
  ARTIST_FETCH_ALL,
  ARTIST_FETCH_SINGLE,
  ARTIST_FETCH_ERROR,
  ARTIST_CLEAR_STATE,
} from "./artist_types";

const fetchLoading = () => {
  return {
    type: ARTIST_FETCH_LOADING,
  };
};

const fetchMessage = (message) => {
  return {
    type: ARTIST_FETCH_MESSAGE,
    payload: message,
  };
};

const fetchALL = (artists) => {
  return {
    type: ARTIST_FETCH_ALL,
    payload: artists,
  };
};

const fetchSingle = (artist) => {
  return {
    type: ARTIST_FETCH_SINGLE,
    payload: artist,
  };
};

const fetchError = (error) => {
  return {
    type: ARTIST_FETCH_ERROR,
    payload: error,
  };
};

const clearState = () => {
  return {
    type: ARTIST_CLEAR_STATE,
  };
};

export const save_artist_action = (formData) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "POST",
      url: process.env.REACT_APP_BASE_URL + "/artist",
      data: formData,
      headers: { api_key: process.env.REACT_APP_API_KEY },
    })
      .then(() => {
        dispatch(fetchMessage("Saved successfully"));
        dispatch(get_all_artists_action());
        dispatch(clear_state_action());
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const get_all_artists_action = () => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: process.env.REACT_APP_BASE_URL + "/artist",
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

export const update_artist_action = (artistId, formData) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "PATCH",
      url: process.env.REACT_APP_BASE_URL + "/artist/" + artistId,
      data: formData,
      headers: { api_key: process.env.REACT_APP_API_KEY },
    })
      .then(() => {
        dispatch(fetchMessage("Updated successfully"));
        dispatch(get_all_artists_action());
        dispatch(clear_state_action());
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const delete_artist_action = (artistId) => {
  return (dispatch) => {
    dispatch(fetchLoading());
    Axios({
      method: "DELETE",
      url: process.env.REACT_APP_BASE_URL + "/artist/" + artistId,
      headers: { api_key: process.env.REACT_APP_API_KEY },
    })
      .then(() => {
        dispatch(fetchMessage("Deleted successfully"));
        dispatch(get_all_artists_action());
        dispatch(clear_state_action());
      })
      .catch((err) => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const clear_state_action = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(clearState());
    }, 1000);
  };
};
