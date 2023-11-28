import api from '../../services/api'
import {ref} from 'vue'
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import useLink from '.';

const toast = useToast();
const router = useRouter();

interface Link {
    title: string;
    link: string;
    _id: string;
}
interface User {
    username: string;
    createdAt?: string;
    profilePic: string;
    email: string;
    bio: string;
    links: Array<Link>
}

const user = ref<User>(
    {
        username: "",
        profilePic: "",
        email: "",
        bio: "",
        links: [
          {
            title: "",
            link: "",
            _id: "",
          },
        ],
    }
);
const useFetchLink = () => {
    const loading = ref<boolean>(false)
    const { reloadPreviewIframe } = useLink()
    const fetchUserData = async ( ) => {
        try {
            loading.value = true
            const response = await api.get('api/user/me/details')
            if(response.status === 200){
                user.value = response.data;
                reloadPreviewIframe()
            }
        } catch(err:any){
            console.log(err)
            if (err.response.status === 404) {
                toast.error("User not found, redirected to homepage", {
                    timeout: 3000,
                });
                router.push("/");
            } else {
                toast.error("Something went wrong, please try again", {
                    timeout: 3000,
                });
                router.push("/");
            }
        } finally{
            loading.value = false;
        }
    }

    return { loading, fetchUserData, user }
}


export default useFetchLink;