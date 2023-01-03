import axiosInstance from './instance'

const uploadFile = async (formData:FormData) => {
    const response = await axiosInstance.post('/upload/file', formData)
    return response.data
}

const uploadMultipleFiles = async (formData:FormData) => {
    const response = await axiosInstance.post('/upload/multiple/files', formData)
    return response.data
}
const uploadService = {
    uploadFile,uploadMultipleFiles
}

export default uploadService