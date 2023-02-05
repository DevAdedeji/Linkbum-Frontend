import api from "../../../services/api"
const putData = async (endpoint: string, data: Object) => {

    try {
        const response = await api.put(endpoint, data);
        return response;
    } catch (err) {
        throw err;
    }
}
export default putData;