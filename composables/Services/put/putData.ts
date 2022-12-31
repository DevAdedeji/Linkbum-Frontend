import axios from "axios";
import apiURL from "../../config/config";
const putData =async(endpoint:string, data:Object)=>{
    let token =localStorage.getItem("auth.linkbum")
   axios.defaults.headers.common['Authorization'] = `${token}`
    try{
        const response  = await axios.put(apiURL + endpoint, data);
        return response;
    }catch(err){
        throw err;
    }
}
export default putData;