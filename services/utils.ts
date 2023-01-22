import axiosInstance from './instance'

const getBusinessSectors = async () => {
    const response = await axiosInstance.get('/industries')
    return response.data.result.industries
}


const utilsService = {
getBusinessSectors
}

export default utilsService