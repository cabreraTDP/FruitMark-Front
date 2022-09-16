import {AUTH_LOGIN} from '../actions/types';

const initialState = {
    isSignedIn: false,
    token: null
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isSignedIn: true,
                token: payload.token
            };
        default:
            return state;
    };
}