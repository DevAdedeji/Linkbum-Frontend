import api from '../../services/api'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import useFetchLink from './fetch'
import useLink from '.';

interface Link {
    id: string;
    link: string;
    title: string;
}

const useUpdateLink = () => {
    const toast = useToast()
    const updating = ref<boolean>(false)
    const showLinkIsInvalid = ref<boolean>(false);
    const { fetchUserData } = useFetchLink()
    const { reloadPreviewIframe } = useLink()
    
    const updateLink = async (data: Link) => {
    try {
        updating.value = true
        const response = await api.put(`api/link/post/${data.id}`, { link: data.link, title: data.title })
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
        updating.value = false
    }
    }

    return { updating, updateLink, showLinkIsInvalid }
}


export default useUpdateLink;