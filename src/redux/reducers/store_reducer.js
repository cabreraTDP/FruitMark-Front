import {GET_STORES, SET_AVAILABLE_STORES, SET_LIST_STORES, SET_SOURCE, SET_TARGET, STORE_TRANSFER} from '../actions/types';

const initialState = {
    stores: [],
    list_stores: [],
    available_stores: [],
    target_store: {city:'Marsela'},
    source_store: {city:'Paris'}
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case GET_STORES:
            return {
                ...state,
                stores: payload
            }
        case SET_LIST_STORES:
                return {
                    ...state,
                    list: payload
                }
        case SET_AVAILABLE_STORES:
            return {
                ...state,
                available_stores: payload
            }
        case SET_SOURCE:
            return {
                ...state,
                source_store: payload
            }
        case SET_TARGET:
            return {
                ...state,
                target_store: payload
            }
        case STORE_TRANSFER:
            return {
                ...state,
                stores: [
                    ...state.stores.filter(store => store.city != payload.city),
                    {
                        ...state.stores.filter((store) => store.city === payload.city)[0],
                        total: state.stores.filter(store => store.city === payload.city)[0].total + payload.numberOfFruits,
                        stock: [
                            ...state.stores.filter((store) => store.city === payload.city)[0]['stock'].filter(item=> item.fruit!=payload.fruit),
                            {
                                fruit:payload.fruit,
                                quantity: state.stores.filter((store) => store.city === payload.city)[0]['stock'].filter(item=> item.fruit===payload.fruit)[0].quantity + payload.numberOfFruits
                            },
                        ]}
                    
                ]
            }
        default:
            return state;
    };
}