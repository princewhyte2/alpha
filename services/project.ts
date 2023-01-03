import axiosInstance from './instance'

const addProjects = async (data:ProjectPostData) => {
    const response = await axiosInstance.post('/projects',data)
    return response.data
}

const getAllProjects = async () => {
    const response = await axiosInstance.get('/projects')
    return response.data
}

const updateProject = async (id: string, data: ProjectPostData) => {
    const response = await axiosInstance.patch(`/projects/${id}`, data)
    return response.data
}

const deleteProject = async (id: string) => {
    const response = await axiosInstance.delete(`projects/${id}`)
    return response.data
}

const projectFetcher = () => getAllProjects().then((res) => res.result.data)


const projectService = { addProjects,projectFetcher,updateProject,deleteProject }

export default projectService