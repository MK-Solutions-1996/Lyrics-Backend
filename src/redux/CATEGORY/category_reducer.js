import {
  CATEGORY_FETCH_LOADING,
  CATEGORY_FETCH_MESSAGE,
  CATEGORY_FETCH_ALL,
  CATEGORY_FETCH_SINGLE,
  CATEGORY_FETCH_ERROR
} from "./category_types";

const initial_state = {
  loading: false,
  message: "",
  categories: [],
  singleCategory: {},
  error: ""
};

const category_reducer = (state = initial_state, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case CATEGORY_FETCH_MESSAGE:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: ""
      };
    case CATEGORY_FETCH_ALL:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: ""
      };
    case CATEGORY_FETCH_SINGLE:
      return {
        ...state,
        loading: false,
        singleCategory: action.payload,
        error: ""
      };
    case CATEGORY_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default category_reducer;
