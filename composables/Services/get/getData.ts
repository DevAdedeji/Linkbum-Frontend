import apiURL from "../../config/config";
import axios from "axios";

const getData = async (endpoint:string)=>{
    try{
       
        const response = await axios.get(apiURL + endpoint);
        return response;
    }catch(err){
        throw err;
    }
}

export default getData;