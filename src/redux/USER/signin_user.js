import Axios from 'axios';

const intial_state = {
    loading: false,
    user: {},
    error: {}
}

//Types
const FETCH_LOADING = 'FETCH_LOADING';
const FETCH_SUCCESS = 'FETCH_LOADING';
const FETCH_ERROR = 'FETCH_ERROR';



const fetchLoading = () => {
    return {
        type: FETCH_LOADING
    }
}

const fetchSuccess = (user) => {
    return {
        type: FETCH_SUCCESS,
        payload: user
    }
}

const fetchError = (error) => {
    return {
        type: FETCH_ERROR,
        payload: error
    }
}


export const signin_action = (payload) => {

    return dispatch => {
        dispatch(fetchLoading());
        Axios({
            method: 'POST',
            url: process.env.REACT_APP_BASE_URL + '/admin/signin',
            data: {
                username: payload.username,
                password: payload.password
            },
            headers: { 'api_key': process.env.REACT_APP_API_KEY }
        })
            .then(res => {
                const result = res.data;
                dispatch(fetchSuccess(result));

            })
            .catch(err => {
                const error = err.response;
                dispatch(fetchError(error.data));

            });
    }
}

export const signin_reducer = (state = intial_state, action) => {
    switch (action.type) {
        case FETCH_LOADING: return {
            ...state,
            loading: true
        }
        case FETCH_SUCCESS: return {
            ...state,
            loading: false,
            user: action.payload
        }
        case FETCH_ERROR: return {
            ...state,
            loading: false,
            error: action.payload
        }
        default: return state
    }
}


