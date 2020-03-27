import Axios from "axios";
import history from "../../history";

const intial_state = {
  loading: false,
  user: "",
  users: [],
  error: ""
};

//Types
const FETCH_LOADING = "FETCH_LOADING";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const FETCH_ALL = "FETCH_ALL";

const fetchLoading = () => {
  return {
    type: FETCH_LOADING
  };
};

const fetchSuccess = user => {
  return {
    type: FETCH_SUCCESS,
    payload: user
  };
};

const fetchALL = users => {
  return {
    type: FETCH_ALL,
    payload: users
  };
};

const fetchError = error => {
  return {
    type: FETCH_ERROR,
    payload: error
  };
};

export const signin_action = payload => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "POST",
      url: process.env.REACT_APP_BASE_URL + "/admin/signin",
      data: {
        username: payload.username,
        password: payload.password
      },
      headers: { api_key: process.env.REACT_APP_API_KEY },
      timeout: 4000
    })
      .then(res => {
        const result = res.data;
        history.push("/mainPage");
        dispatch(fetchSuccess(result));
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const get_admin_action = () => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: process.env.REACT_APP_BASE_URL + "/admin",
      headers: { api_key: process.env.REACT_APP_API_KEY },
      timeout: 4000
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

export const change_pwd_action = payload => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "PATCH",
      url: process.env.REACT_APP_BASE_URL + "/admin",
      data: {
        id: payload.id,
        password: payload.password,
        newPassword: payload.newPassword
      },
      headers: { api_key: process.env.REACT_APP_API_KEY },
      timeout: 4000
    })
      .then(res => {
        const result = res.data;
        history.push("/mainPage");
        dispatch(fetchSuccess(result));
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const get_verification_code_action = () => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "GET",
      url: process.env.REACT_APP_BASE_URL + "/admin/verification",
      headers: { api_key: process.env.REACT_APP_API_KEY },
      timeout: 4000
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

export const forgot_pwd_action = payload => {
  return dispatch => {
    dispatch(fetchLoading());
    Axios({
      method: "PATCH",
      url: process.env.REACT_APP_BASE_URL + "/admin/forgot",
      data: {
        verificationCode: payload.verificationCode,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword
      },
      headers: { api_key: process.env.REACT_APP_API_KEY },
      timeout: 4000
    })
      .then(res => {
        const result = res.data;
        history.push("/mainPage");
        dispatch(fetchSuccess(result));
      })
      .catch(err => {
        const error = err.response;
        dispatch(fetchError(error));
      });
  };
};

export const signin_reducer = (state = intial_state, action) => {
  switch (action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: ""
      };
    case FETCH_ALL:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ""
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
