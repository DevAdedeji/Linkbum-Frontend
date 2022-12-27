import axios from "axios";
import apiURL from "../config/config";



const postData =async(endpoint:string, data:Object)=>{
    let token =localStorage.getItem("auth.linkbum")
   axios.defaults.headers.common['Authorization'] = `${token}`
    try{
        const response  = await axios.post(apiURL + endpoint, data);
        return response;
    }catch(err){
        throw err;
    }
}

export const deleteLink =async(endpoint:string)=>{
    let token =localStorage.getItem("auth.linkbum")
   axios.defaults.headers.common['Authorization'] = `${token}`
    try{
        const response  = await axios.delete(apiURL + endpoint);
        return response;
    }catch(err){
        throw err;
    }
}


export default postData;