import {baseurl} from '@/utils/networkConfig';
import axios from 'axios';

const api = axios.create({
    baseURL: baseurl,
    withCredentials: true,
})


api.interceptors.request.use(
    (config)=>{
        if(config.data instanceof FormData){
            delete config.headers['Content-Type'];
        }else{
            config.headers['Content-Type'] = 'application/json';
        }
    
    return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        return Promise.reject(error);
    }
)

export default api;