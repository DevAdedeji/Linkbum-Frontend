import api from '../../services/api'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import useFetchLink from './fetch'
import useLink from '.';

const useDeleteLink = () => {
    const toast = useToast()
    const loading = ref<boolean>(false)
    const { reloadPreviewIframe } = useLink()
    const { fetchUserData } = useFetchLink()

    const deleteLink = async (id: string) => {
        try {
            loading.value = true
            const response = await api.delete(`api/link/post/${id}`)
            if(response.data.success === true){
                fetchUserData()
                reloadPreviewIframe()
                toast.success(response.data.message, {
                    timeout: 3000,
                });
            } else {
                toast.error(response.data.message, {
                  timeout: 3000,
                });
            }
        } catch(err:any){
            toast.error(
                err.response.data.title ||
                  err.response.data.link ||
                  err.response.data.error ||
                  err.response.data.message ||
                  "Something went wrong, pls try again",
                {
                  timeout: 3000,
                }
            );
        } finally {
            loading.value = false
        }
    }

    return { loading, deleteLink, }
}


export default useDeleteLink;