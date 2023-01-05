import axiosInstance from './instance'

const getUserSecurityQuestions = async () => {
    const response = await axiosInstance.get('/my/security/question')
    return response.data
}

const saveUserSecurityQuestion = async (data:SecurityQuestionPostData) => {
    const response = await axiosInstance.post('/create/security/question/answer', data)
    return response.data
}

const getSecurityQuestions = async () => {
    const response = await axiosInstance.get('/security-questions')
    return response.data
}

const updatePassword = async (data:UpdatePasswordPostData) => {
    const response = await axiosInstance.patch('/update/password',data)
    return response.data
}

const getSecurityQuestionsFetcher = () => getSecurityQuestions().then(res => res.result.questions)
const getUserSecurityQuestionsFetcher = () => getUserSecurityQuestions().then(res=>res.result)

const securityService = {
    getSecurityQuestionsFetcher,saveUserSecurityQuestion,getUserSecurityQuestionsFetcher,updatePassword
}

export default securityService