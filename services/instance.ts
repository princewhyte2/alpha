import axios from 'axios';
import Cookies from 'js-cookie'



const axiosInstance = axios.create({baseURL: 'http://workfynder.test/api',withCredentials: true,
});

axiosInstance.interceptors.request.use( function(config:any) {
    const token = Cookies.get("access_token"); 
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  })

export default axiosInstance