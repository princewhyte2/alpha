import axiosInstance from './instance'

const getBusinessSectors = async () => {
    const response = await axiosInstance.get('/industries')
    return response.data.result.industries
}

const getAllSkills =async () => {
    const response = await axiosInstance.get('/skills')
    return response.data.result.skills.data
}

const getOccupations = async (url:string) => {
    const response = await axiosInstance.get(url)
    return response.data.result.occupations
}

const getOccupationsSkill = async (url: string) => {
    const response = await axiosInstance.get(url)
    return response.data.result.skills
}

const searchUsers = async (url: string) => {
    const response = await axiosInstance.get(url)
    return response.data.result.data
}

const contactUs = async (postData:{
    "name":string,
    "email": string,
    "phone_number" : string,
    "description": string
}) => {
    const response = await axiosInstance.post('/contact-us',postData)
    return response.data
}

const utilsService = {
getBusinessSectors,getOccupations,getOccupationsSkill,searchUsers,getAllSkills,contactUs
}

export default utilsService