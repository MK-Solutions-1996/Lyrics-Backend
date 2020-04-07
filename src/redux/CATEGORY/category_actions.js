import Axios from "axios";
import {
  CATEGORY_FETCH_LOADING,
  CATEGORY_FETCH_MESSAGE,
  CATEGORY_FETCH_ALL,
  CATEGORY_FETCH_SINGLE,
  CATEGORY_FETCH_ERROR
} from "./category_types";

const fetchLoading = () => {
  return {
    type: CATEGORY_FETCH_LOADING
  };
};

const fetchMessage = message => {
  return {
    type: CATEGORY_FETCH_MESSAGE,
    payload: message
  };
};

const fetchALL = categories => {
  return {
    type: CATEGORY_FETCH_ALL,
    payload: categories
  };
};

const fetchSingle = category => {
  return {
    type: CATEGORY_FETCH_SINGLE,
    payload: category
  };
};

const fetchError = error => {
  return {
    type: CATEGORY_FETCH_ERROR,
    payload: error
  };
};

export const save_category_action = payload => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "POST",
      url: process.env.REACT_APP_BASE_URL + "/category",
      data: {
        name: payload.name
      },
      headers: { api_key: process.env.REACT_APP_API_KEY }
    })
      .then(() => {
        dispatch(fetchMessage("Saved successfully"));
        dispatch(get_all_categories_action());
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const get_all_categories_action = () => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: process.env.REACT_APP_BASE_URL + "/category",
      headers: { api_key: process.env.REACT_APP_API_KEY }
    })
      .then(res => {
        const result = res.data;
        dispatch(fetchALL(result));
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const delete_category_action = id => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "DELETE",
      url: process.env.REACT_APP_BASE_URL + "/category/" + id,
      headers: { api_key: process.env.REACT_APP_API_KEY }
    })
      .then(() => {
        dispatch(fetchMessage("Deleted successfully"));
        dispatch(get_all_categories_action());
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};
