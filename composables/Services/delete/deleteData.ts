import axios from "axios";
import apiURL from "../../config/config";
const deleteLink =async(endpoint:string)=>{
    let token =localStorage.getItem("auth.linkbum")
   axios.defaults.headers.common['Authorization'] = `${token}`
    try{
        const response  = await axios.delete(apiURL + endpoint);
        return response;
    }catch(err){
        throw err;
    }
}

export default deleteLink;