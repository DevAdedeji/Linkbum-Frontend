import api from "../../../services/api"

const getData = async (endpoint: string) => {
    try {
        const response = await api.get(endpoint);
        return response;
    } catch (err) {
        throw err;
    }
}

export default getData;