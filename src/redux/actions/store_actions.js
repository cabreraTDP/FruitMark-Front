import {GET_STORES} from './types';
import {Get, Post} from '../../utils/axiosUtils';

export const getInitialData = () => {
    return async(dispatch, getState) => {
        try {
            const res = await Get('/stores');
            if(res){
                await dispatch(
                    {
                        type: GET_STORES,
                        payload: res.data.data
                    }
                )
            }
            
            return null
        }catch(e){
            console.log(e.message);
            return null
        }
    }
}

export const getAllStores = () => {
    return async(dispatch, getState) => {
        return state
    }
}