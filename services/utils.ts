import axiosInstance from './instance'

const getBusinessSectors = async () => {
    const response = await axiosInstance.get('/industries')
    return response.data.result.industries
}

const getOccupations = async (url:string) => {
    const response = await axiosInstance.get(url)
    return response.data.result.occupations
}

const getOccupationsSkill = async (url: string) => {
    const response = await axiosInstance.get(url)
    return response.data.result.skills
}

const utilsService = {
getBusinessSectors,getOccupations,getOccupationsSkill
}

export default utilsService