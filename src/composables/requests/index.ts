import api from "../../services/api"

const useRequest = () => {

    const deleteData = async (endpoint: string) => {
        try {
            const response = await api.delete(endpoint);
            return response;
        } catch (err) {
            throw err;
        }
    }

    const getData = async (endpoint: string) => {
        try {
            const response = await api.get(endpoint);
            return response;
        } catch (err) {
            throw err;
        }
    }

    const postData = async (endpoint: string, data: Object) => {
        try {
            const response = await api.post(endpoint, data);
            return response;
        } catch (err) {
            throw err;
        }
    }

    const putData = async (endpoint: string, data: Object) => {

        try {
            const response = await api.put(endpoint, data);
            return response;
        } catch (err) {
            throw err;
        }
    }


    return { deleteData, getData, postData, putData }
}

export default useRequest