import {AUTH_LOGIN} from './types';
import {Post} from '../../utils/axiosUtils';

export const login = (data) => {
    return async(dispatch, getState) => {
        try {
            const res = await Post('/users/signIn', data);
            if(res){
                await dispatch(
                    {
                        type: AUTH_LOGIN,
                        payload: 
                            {
                                isSignedIn: True,
                                token: res.data.token
                            }
                    }
                )
            }
            return null
        } catch (e) {
            console.log(e.message);
            return null
        }
    }
}