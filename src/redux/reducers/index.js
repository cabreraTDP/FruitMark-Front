import {combineReducers} from 'redux';

import auth from './auth_reducer';
import store from './store_reducer';

const appReducer = combineReducers({auth, store});

const rootReducer = (state,action) => {
    return appReducer(state,action);
}

export default rootReducer;