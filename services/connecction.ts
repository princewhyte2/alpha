import axiosInstance from './instance'

const getUserConnections = async() => {
    const response = await axiosInstance.get('/my/connections')
    return response.data
}

const connectionService = {
    getUserConnections
}

export default connectionService