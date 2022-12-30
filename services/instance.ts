import axios from 'axios';


const axiosInstance = axios.create({baseURL: 'https://backend-staging.workfynder.com/api',withCredentials: true,
});

axiosInstance.interceptors.request.use( function(config:any) {
    const token = localStorage.getItem("access_token"); 
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  })

export default axiosInstance