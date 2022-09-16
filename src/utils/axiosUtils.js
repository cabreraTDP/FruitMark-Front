import axios from 'axios';
import config from '../../config';

const URL = config.URL;

export const Get = async(url, body = {}, options={withCredentials: true}, auth=false, token='') => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options
        }
    }

    if(auth){config.headers['Authorization'] = token}

    const bodyString = JSON.stringify(body);

    try {   
        const route = URL+url;
        const res = await axios.get(route, bodyString, config);
        return res;
    }catch(e){
        console.error('Error during request', e);
    }
    return null
}

export const Post = async(url, body = {}, options={withCredentials: true}, auth=false, token='') => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options
        }
    }
    if(auth){config.headers['Authorization'] = token}
    const bodyString = JSON.stringify(body);
    try {   
        const route = URL+url;
        const res = await axios.post(route, bodyString, config);
        
        return res;
    }catch(e){
        console.error('Error during request', e);
    }
    return null
}