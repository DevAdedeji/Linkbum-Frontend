import api from '../../services/api'

const useUploadImage = () => {
    const uploadImage = async ( file: any) => {
        const cloudName = 'dtomoi7fb';
        const unsignedUploadPreset = 'ml_default';
        try {
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
            const fd = new FormData();
            fd.append('upload_preset', unsignedUploadPreset);
            fd.append('file', file);
            const response = await api.post(url, fd);
            console.log(response)
        } catch (err){
            console.log(err)
        }
    } 
    return { uploadImage }
}

export default useUploadImage