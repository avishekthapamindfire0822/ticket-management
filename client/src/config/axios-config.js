import axios from 'axios';
import API_URL_CONSTANTS from '../constants/api-url.constants';
const axiosInstance = axios.create({
  baseURL: API_URL_CONSTANTS.BASE_URL,
});

export default axiosInstance;
