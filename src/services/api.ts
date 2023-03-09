import axios from "axios";
import apiURL from './config/config'

const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    }
})

export default axiosInstance