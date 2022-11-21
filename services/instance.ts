import axios from 'axios';


const axiosInstance = axios.create({baseURL: 'https://work-fynder-backend-production.up.railway.app/api'
});


export default axiosInstance