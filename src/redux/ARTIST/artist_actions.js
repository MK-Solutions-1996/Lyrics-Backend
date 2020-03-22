import Axios from 'axios';
import {
    FETCH_LOADING,
    FETCH_MESSAGE,
    FETCH_ALL,
    FETCH_SINGLE,
    FETCH_ERROR
} from './artist_types';


const fetchLoading = () => {
    return {
        type: FETCH_LOADING
    };
};

const fetchMessage = message => {
    return {
        type: FETCH_MESSAGE,
        payload: message
    };
};

const fetchALL = artists => {
    return {
        type: FETCH_ALL,
        payload: artists
    };
};

const fetchSingle = artist => {
    return {
        type: FETCH_ALL,
        payload: artist
    };
};


const fetchError = error => {
    return {
        type: FETCH_ERROR,
        payload: error
    };
};


export const save_artist_action = payload => {
    return dispatch => {
        dispatch(fetchLoading());
        Axios({
            method: "POST",
            url: process.env.REACT_APP_BASE_URL + "/artist",
            data: {
                sinhalaName: payload.sinhalaName,
                singlishName: payload.singlishName,
                period: payload.period
            },
            headers: { api_key: process.env.REACT_APP_API_KEY }
        })
            .then(() => {
                //history.push('/mainPage');
                dispatch(fetchMessage('Saved successfully'));
                dispatch(get_all_artists_action());
            })
            .catch(err => {
                const error = err.response;
                dispatch(fetchError(error));
            });
    };
};


export const get_all_artists_action = () => {
    return dispatch => {
        dispatch(fetchLoading());
        Axios({
            method: "GET",
            url: process.env.REACT_APP_BASE_URL + "/artist",
            headers: { api_key: process.env.REACT_APP_API_KEY }
        })
            .then((res) => {
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


export const update_artist_action = (artistId, payload) => {

    const update_payload = [
        { key: "sinhalaName", value: payload.sinhalaName },
        { key: "singlishName", value: payload.singlishName },
        { key: "period", value: payload.period }
    ];

    console.log("update_payload:",update_payload);
    console.log("artistId:",artistId);

    return dispatch => {
        dispatch(fetchLoading());
        Axios({
            method: "PATCH",
            url: process.env.REACT_APP_BASE_URL + "/artist/" + artistId,
            data: update_payload,
            headers: { api_key: process.env.REACT_APP_API_KEY }
        })
            .then(() => {
                //history.push('/mainPage');
                dispatch(fetchMessage('Updated successfully'));
                dispatch(get_all_artists_action());
            })
            .catch(err => {
                const error = err.response;
                dispatch(fetchError(error));
            });
    };
};


export const delete_artist_action = (artistId) => {
    return dispatch => {
        dispatch(fetchLoading());
        Axios({
            method: "DELETE",
            url: process.env.REACT_APP_BASE_URL + "/artist/" + artistId,
            headers: { api_key: process.env.REACT_APP_API_KEY }
        })
            .then(() => {
                //history.push('/mainPage');
                dispatch(fetchMessage('Deleted successfully'));
                dispatch(get_all_artists_action());
            })
            .catch(err => {
                const error = err.response;
                dispatch(fetchError(error));
            });
    };
};



