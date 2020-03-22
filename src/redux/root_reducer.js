import { combineReducers } from 'redux';
import { signin_reducer } from './USER/signin_user';
import artist_reducer from './ARTIST/artist_reducer';

const root_reducer = combineReducers({
    signin: signin_reducer,
    artist: artist_reducer
});

export default root_reducer;