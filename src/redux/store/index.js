import {legacy_createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

const store = legacy_createStore(
    reducers,
    {},
    compose(
        applyMiddleware(thunk)
    )
);

export default store;