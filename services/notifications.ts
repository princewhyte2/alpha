import axiosInstance from './instance'


const getALlNotifications = async () => {
    const response = await axiosInstance.get('/notifications')
    return response.data
}

const markReadNotification = async (notificationid: string) => {
    const response = await axiosInstance.get(`/mark/notification/${notificationid}/read`)
    return response.data
}


const notificationsServices = {
    getALlNotifications,markReadNotification
}

export default notificationsServices