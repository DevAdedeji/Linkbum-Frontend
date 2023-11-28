import {ref} from 'vue'
import { useRoute } from 'vue-router'

const showAddLinkComponent = ref<boolean>(false)
const previewIframe = ref<HTMLIFrameElement>() as any;

const useLink = () => {
    const route = useRoute()
    const username = localStorage.getItem("linkbum.username");
    const url = `https://linkbum.vercel.app/${username}`;
    const toggleAddLinkComponent = () => {
        showAddLinkComponent.value = !showAddLinkComponent.value
    }
    const reloadPreviewIframe = () =>{
        if(!route.path.includes('settings')){
            previewIframe.value.src = previewIframe.value.src;
        }
    }
    return { showAddLinkComponent, toggleAddLinkComponent, url, reloadPreviewIframe, previewIframe }
}

export default useLink