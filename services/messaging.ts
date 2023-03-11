import axiosInstance from './instance'

const sendMessage = async(chatId:string,data:{receiver_id:string,message:string}) => {

    const response = await axiosInstance.post(`/messages/${chatId}`,data)
    return response.data
}

const getMessageById = async (url: string) => {
    const response = await axiosInstance.get(url)
    return response.data.result
}

const getAllConversations = async () => {
    const response = await axiosInstance.get('/conversations')
    return response.data.result.data
}

const getConversationsById = async (url:string) => {
    const response = await axiosInstance.get(url)
    return response.data.result
}

const messagingService = {
    sendMessage,getMessageById,getAllConversations,getConversationsById
}

export default messagingService