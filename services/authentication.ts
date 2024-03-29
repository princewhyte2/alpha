import axiosInstance from './instance'


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

const socialLogin = async (token: string) => {
    const data = { token }
    const response = await axiosInstance.post('/auth/social/login', data)
    return response.data
}

const socialSignUp =async (token:string) => {
      const data = { token }
    const response = await axiosInstance.post('/auth/social/signup', data)
    return response.data
}

const forgotPasswordEmail = async (email:string):Promise<any> => {
     const data = {email,forgot_mode:'email'}
    const response = await axiosInstance.post('/auth/forgot-password', data )
    return response.data
}

const forgotPasswordPhone = async (phone_number:string):Promise<any> => {
     const data = {phone_number,forgot_mode:'phone'}
    const response = await axiosInstance.post('/auth/forgot-password', data )
    return response.data
}

const resetPassword = async (data: { token: string, password: string,email_or_phone_number:string }):Promise<any> => {

    const response = await axiosInstance.post('/auth/reset-password', data)
    return response.data
}

const userRegistration = async (data:{
    first_name: string,
    last_name: string,
    email: string,
    referral_code?:string,	
    phone_number: string,
    password: string
}):Promise<any> => {
    const response = await axiosInstance.post('/auth/register', data)
    return response.data
}

const verifyEmail = async (otp:string) => {
    const response = await axiosInstance.get(`/auth/email/verify/${otp}`)
    return response.data
}

const resendEmailToken = async () => {
    const response = await axiosInstance.get("/auth/email/resend/token",)
    return response.data
}

const googleLogin = async () => {
    const response = await axiosInstance.get('/auth/social/login/google')
    return response.data
}

const faceBookLogin = async () => {
    const response = await axiosInstance.get('/auth/social/login/facebook')
    return response.data
}

const authService = {socialSignUp,socialLogin,faceBookLogin,googleLogin, emailLogin,phoneLogin,forgotPasswordEmail,forgotPasswordPhone,resetPassword,userRegistration,verifyEmail,resendEmailToken}

export default authService