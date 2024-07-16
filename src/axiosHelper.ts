import axios from 'axios';
let count = 0;
const axiosInstance = axios.create({

    baseURL: 'http://localhost:5227/api/',

});

axiosInstance.interceptors.request.use((config: any) => {
    console.log(config);
    config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');

    return config;
},
    error => {
        count++;
        console.log(count);


        return Promise.reject(error);
    }

);
axiosInstance.interceptors.response.use((response) => {
    return response;
},
    (error) => {
        if (error.response.status == 401 && !!sessionStorage.getItem('jwt')) {
            sessionStorage.removeItem('jwt');
            window.location.href = '/login';
        }
        return Promise.reject(error);

    }
)
export default axiosInstance;