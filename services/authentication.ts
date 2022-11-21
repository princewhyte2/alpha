import axiosInstance from './instance'

let token:string|null = null
const setToken = (userToken:string) => {
  token = userToken
}
const emailLogin = async (email:string, password:string):Promise<any> => {
    const data = {email,password,login_mode:'email'}
    const response = await axiosInstance.post('/auth/login', data)
    return response.data
}

const phoneLogin = async (phone_number: string, password: string):Promise<any> => {
     const data = {phone_number,password,login_mode:'phone'}
    const response = await axiosInstance.post('/auth/login', data)
    return response.data
}

const forgotPasswordEmail = async (email:string):Promise<any> => {
     const data = {email,forgot_mode:'email'}
    const response = await axiosInstance.post('/auth/forgot-password', data ,{
        headers: {
             Authorization : `Bearer ${token}`
        }
    })
    return response.data
}

const forgotPasswordPhone = async (phone_number:string):Promise<any> => {
     const data = {phone_number,forgot_mode:'phone'}
    const response = await axiosInstance.post('/auth/forgot-password', data ,{
        headers: {
             Authorization : `Bearer ${token}`
        }
    })
    return response.data
}

const resetPassword = async (data: { token: string, password: string,email_or_phone_number:string }):Promise<any> => {

    const response = await axiosInstance.post('/auth/reset-password', data,{
        headers: {
             Authorization : `Bearer ${token}`
        }
    })
    return response.data
}

const userRegistration = async (data:{
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    password: string
}):Promise<any> => {
    const response = await axiosInstance.post('/auth/register', data)
    return response.data
}

const verifyEmail = async (otp:string) => {
    const response = await axiosInstance.get(`/auth/email/verify/${otp}`,{
        headers: {
             Authorization : `Bearer ${token}`
        }
    })
    return response.data
}

const resendEmailToken = async () => {
    const response = await axiosInstance.get("/auth/email/resend/token", {
        headers: {
             Authorization : `Bearer ${token}`
        }
    })
    return response.data
}

const authService = {setToken,emailLogin,phoneLogin,forgotPasswordEmail,forgotPasswordPhone,resetPassword,userRegistration,verifyEmail,resendEmailToken}

export default authService