import api from "../../../services/api"

const postData = async (endpoint: string, data: Object) => {
    try {
        const response = await api.post(endpoint, data);
        return response;
    } catch (err) {
        throw err;
    }
}







export default postData;