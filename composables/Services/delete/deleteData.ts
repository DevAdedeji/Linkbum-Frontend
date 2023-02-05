import api from "../../../services/api"
const deleteLink = async (endpoint: string) => {
    try {
        const response = await api.delete(endpoint);
        return response;
    } catch (err) {
        throw err;
    }
}

export default deleteLink;