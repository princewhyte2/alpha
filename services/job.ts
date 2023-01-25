import axiosInstance from './instance'

const postJob = async(data:any) => {
    const response = await axiosInstance.post('/jobs',data)
    return response.data
}



const updateJob = async (jobId: string, data: any) => {
    const response = await axiosInstance.patch(`/jobs/${jobId}`, data)
    return response.data
}

const getAllJobs = async (url:string) => {
    const response = await axiosInstance.get(url)
    return response.data.result.data
}

const deleteJob = async (jobId: string) => {
    const response = await axiosInstance.delete(`/jobs/${jobId}`)
    return response.data
}

const applyForJob = async (jobId: string) => {
    const response = await axiosInstance.post(`/jobs/${jobId}/applications`)
    return response.data
}

const getJobById = async (url: string) => {
    const response = await axiosInstance.get(url)
    return response.data
}

const getJobApplicants = async (url: string) => {
    const response = await axiosInstance.get(url)
    return response.data.result.applications
}

const jobService = {
    postJob,getAllJobs,updateJob,deleteJob,applyForJob,getJobApplicants,getJobById
}

export default jobService