import axios from 'axios';

let token:string|null = null
const axiosInstance = axios.create({baseURL: 'https://work-fynder-backend-production.up.railway.app/api', headers: {
        Authorization : `Bearer ${token}`
    }
});

export const setToken = (userToken:string) => {
  token = userToken
}
export default axiosInstance