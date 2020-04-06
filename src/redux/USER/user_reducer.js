import {
  USER_FETCH_LOADING,
  USER_FETCH_MESSAGE,
  USER_FETCH_ALL,
  USER_FETCH_SINGLE,
  USER_FETCH_ERROR
} from "./user_types";

const initial_state = {
  user_loading: false,
  message: "",
  users: [],
  singleUser: {},
  user_error: ""
};

const user_reducer = (state = initial_state, action) => {
  switch (action.type) {
    case USER_FETCH_LOADING:
      return {
        ...state,
        user_loading: true
      };
    case USER_FETCH_MESSAGE:
      return {
        ...state,
        user_loading: false,
        message: action.payload,
        user_error: ""
      };
    case USER_FETCH_ALL:
      return {
        ...state,
        user_loading: false,
        users: action.payload,
        user_error: ""
      };
    case USER_FETCH_SINGLE:
      return {
        ...state,
        user_loading: false,
        singleUser: action.payload,
        user_error: ""
      };
    case USER_FETCH_ERROR:
      return {
        ...state,
        user_loading: false,
        user_error: action.payload
      };
    default:
      return state;
  }
};

export default user_reducer;
