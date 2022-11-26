import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'dev' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PRODUCTION
});

axiosInstance.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response && response.data,
    error => Promise.reject(error)
);

export default axiosInstance;
