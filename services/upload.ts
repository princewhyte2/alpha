import axiosInstance from './instance'

const uploadFile = async (formData:FormData) => {
    const response = await axiosInstance.post('/upload/file', formData)
    return response.data
}

const uploadService = {
    uploadFile
}

export default uploadService