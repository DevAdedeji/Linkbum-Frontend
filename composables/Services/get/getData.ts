import apiURL from "../../config/config";
import axios from "axios";

const getData = async (endpoint:string)=>{
    try{
        let token = localStorage.getItem("auth.linkbum");
        if(token){
            axios.defaults.headers.common["Authorization"] = `${token}`;
        }
        const response = await axios.get(apiURL + endpoint);
        return response;
    }catch(err){
        throw err;
    }
}

export default getData;