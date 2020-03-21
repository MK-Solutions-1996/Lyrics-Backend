import { combineReducers } from 'redux';
import { signin_reducer } from './USER/signin_user';

const root_reducer = combineReducers({
    signin: signin_reducer
});

export default root_reducer;