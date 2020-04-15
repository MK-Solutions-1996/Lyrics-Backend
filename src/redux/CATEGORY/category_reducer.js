import {
  CATEGORY_FETCH_LOADING,
  CATEGORY_FETCH_MESSAGE,
  CATEGORY_FETCH_ALL,
  CATEGORY_FETCH_SINGLE,
  CATEGORY_FETCH_ERROR,
  CATEGORY_CLEAR_STATE,
} from "./category_types";

const initial_state = {
  category_loading: false,
  message: "",
  categories: [],
  singleCategory: {},
  category_error: "",
};

const category_reducer = (state = initial_state, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_LOADING:
      return {
        ...state,
        category_loading: true,
      };
    case CATEGORY_FETCH_MESSAGE:
      return {
        ...state,
        category_loading: false,
        message: action.payload,
        category_error: "",
      };
    case CATEGORY_FETCH_ALL:
      return {
        ...state,
        category_loading: false,
        categories: action.payload,
        category_error: "",
      };
    case CATEGORY_FETCH_SINGLE:
      return {
        ...state,
        category_loading: false,
        singleCategory: action.payload,
        category_error: "",
      };
    case CATEGORY_FETCH_ERROR:
      return {
        ...state,
        category_loading: false,
        category_error: action.payload,
      };
    case CATEGORY_CLEAR_STATE:
      return initial_state;
    default:
      return state;
  }
};

export default category_reducer;
