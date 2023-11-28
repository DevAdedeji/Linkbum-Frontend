import api from '../../services/api'
import {reactive, ref} from 'vue'
import { useToast } from 'vue-toastification'
import { isValidUrl } from '../utils/validURL'
import useLink from '.'
import useFetchLink from './fetch'

interface Link {
    link: string;
    title: string
}

const useCreateLink = () => {
    const form = reactive<Link>({
        link: "",
        title: "",
    })
    const showLinkIsInvalid = ref<boolean>(false)
    const toast = useToast()
    const loading = ref<boolean>(false)
    const { toggleAddLinkComponent, reloadPreviewIframe } = useLink()
    const { fetchUserData } = useFetchLink()
    const createLink = async ( ) => {
        // const isLinkValid = isValidUrl(form.link);
        const isLinkValid = true
        if(isLinkValid){
            showLinkIsInvalid.value = false
            try{
                loading.value = true
                const response = await api.post('api/link/post', form)
                if (response.data.sucess === true) {
                    await fetchUserData()
                    reloadPreviewIframe()
                    form.link = "";
                    form.title = "";
                    toggleAddLinkComponent()
                    toast.success(response.data.message, {
                        timeout: 3000,
                    });
                } else {
                    toast.error(response.data.message, {
                        timeout: 3000,
                    });
                }
            } catch (err: any) {
                toast.error(
                    err.response.data.title || err.response.data.link || err.response.data.error,
                    {
                      timeout: 3000,
                    }
                  );
                loading.value = false;
            }
        } else {
            showLinkIsInvalid.value = true
        }
        
    }

    return { loading, createLink, form, showLinkIsInvalid }
}


export default useCreateLink;