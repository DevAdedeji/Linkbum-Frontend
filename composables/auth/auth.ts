import axios from "axios";
import apiURL from "../config/config";

const auth = async (data:Object, endpoint:string)=>{
    try{
        const response = await axios.post(apiURL+'/api/auth'+endpoint, data);
        return response;
    }catch(err){
        throw err;
    }
}

export default auth;