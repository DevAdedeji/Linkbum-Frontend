import api from '../../services/api'
const useUploadImage = () => {
    const uploadImage = async ( file: any) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
        const timestamp = Math.round(new Date().getTime() / 1000).toString()
        const unsignedUploadPreset = 'ml_default';
        let data;
        try {
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
            const fd = new FormData();
            fd.append('upload_preset', unsignedUploadPreset);
            fd.append("api_key", apiKey)
            fd.append("timestamp", timestamp)
            fd.append('file', file);
            const response = await fetch(url, {
                method: "POST",
                body: fd
            })
            data = await response.json()
            if(data.error) throw new Error(data.error.message)
        } catch (err:any){
            throw new Error(err)
        }
        return {
            imageURL: data.secure_url
        }
    } 
    return { uploadImage }
}

export default useUploadImage