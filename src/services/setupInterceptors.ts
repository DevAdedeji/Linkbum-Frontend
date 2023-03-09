import { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./api";


const setup = () => {
    axiosInstance.interceptors.request.use((config: any) => {
        let token = localStorage.getItem("auth.linkbum")
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    }, (error: AxiosError) => {
        return Promise.reject(error)
    })

    axiosInstance.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    })
}

export default setup;