import axiosInstance from './instance'

const getApprovedUserConnections = async() => {
    const response = await axiosInstance.get('/my/approved/connections')
    return response.data.result.approvedConnections
}

const getUnApprovedUserConnections = async() => {
    const response = await axiosInstance.get('/unapproved/connections')
    return response.data.result.unapprovedConnections
} 

const sendConnectionRequest = async (userId:string) => {
    const response = await axiosInstance.get(`/send/connection/request/${userId}`)
    return response.data
}

const acceptConnectionRequest = async (requestId: string) => {
   const response = await axiosInstance.get(`/accept/connection/request/${requestId}`)
    return response.data
}

const rejectConnectionRequest = async (requestId:string) => {
    const response = await axiosInstance.get(`/reject/connection/request/${requestId}`)
    return response.data
}

const unFollowConnection = async (userId: string) => {
    const response = await axiosInstance.get(`/unfollow/connection/${userId}`)
    return response.data
}

const connectionService = {unFollowConnection,
    getApprovedUserConnections,sendConnectionRequest,acceptConnectionRequest,rejectConnectionRequest,getUnApprovedUserConnections
}

export default connectionService