import axiosInstance from "./instance"

const joinAsArtisan = async () => {
  const response = await axiosInstance.get('/join/as/artisan')
  return response.data
}

const joinAsEmployer = async () => {
  const response = await axiosInstance.get('/join/as/employer')
  return response.data
}

const getUserProfile = async () => {
  const response = await axiosInstance.get("/my/profile")
  return response.data
}

const addPhoneNumber = async (data:{phone_number:string}) => {
  const response = await axiosInstance.post("/create/phone-number", data)
  return response.data
}

const updateUserProfile = async (data: OnboardingData) => {
  const response = await axiosInstance.patch("/update/profile", data)
  return response.data
}

const getQualifications = async () => {
  const response = await axiosInstance.get("/qualifications")
  return response.data
}

const addUserQualification = async (data: QualificationsPostData) => {
  const response = await axiosInstance.post("/create/my/qualification", data)
  return response.data
}

const updateUserQualification = async (id: string, data: QualificationsPostData) => {
  const response = await axiosInstance.patch(`/user-qualifications/${id}`, data)
  return response.data
}

const deleteUserQualification = async (id: string) => {
  const response = await axiosInstance.delete(`/user-qualifications/${id}`)
  return response.data
}

const addUserWorkHistory = async (data: WorkExperiencePostData) => {
  const response = await axiosInstance.post("/work/histories", data)
  return response.data
}

const updateUserWorkHistory = async (id: string, data: WorkExperiencePostData) => {
  const response = await axiosInstance.patch(`/work/histories/${id}`, data)
  return response.data
}

const deleteUserWorkHistory = async (id: string) => {
  const response = await axiosInstance.delete(`/work/histories/${id}`)
  return response.data
}

const updateHobbies = async (hobbies: string[]) => {
  const response = await axiosInstance.patch("/update/hobbies", { hobbies })
  return response.data
}

const profileFetcher = () => getUserProfile().then((res) => res.result)
const qualifcationsFetcher = () => getQualifications().then((res) => res.result.occupations)

const profileServices = {
  profileFetcher,
  updateUserProfile,
  qualifcationsFetcher,
  addUserQualification,
  addUserWorkHistory,
  updateHobbies,
  updateUserQualification,
  deleteUserQualification,
  updateUserWorkHistory,
  deleteUserWorkHistory,addPhoneNumber,joinAsArtisan,joinAsEmployer
}

export default profileServices
