import { ChangeEvent, ReactElement, useRef, useState, FormEvent, useCallback, MutableRefObject } from "react"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Chip from "@mui/material/Chip"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import EmailIcon from "@mui/icons-material/Email"
import InputAdornment from "@mui/material/InputAdornment"
import Autocomplete from "@mui/material/Autocomplete"
import DialogContent from "@mui/material/DialogContent"
import CircularProgress from "@mui/material/CircularProgress"
import CloseIcon from "@mui/icons-material/Close"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import { AlertColor } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import CancelIcon from "@mui/icons-material/Cancel"
import OutlinedInput from "@mui/material/OutlinedInput"
import Tooltip from "@mui/material/Tooltip"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Avatar from "@mui/material/Avatar"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme, Theme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import DeleteIcon from "@mui/icons-material/Delete"
import PhoneIcon from "@mui/icons-material/Phone"
import { styled } from "@mui/material/styles"
import Stack from "@mui/material/Stack"
import AddIcon from "@mui/icons-material/Add"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import ProfileLayout from "../../../components/layouts/profile"
import useSWR, { useSWRConfig } from "swr"
import profileServices from "../../../services/profile"
import locationService from "../../../services/location"
import uploadService from "../../../services/upload"
import { hobbiesList } from "../../../utils"
import { ErrorComponent } from "../../../components/alert"
import { Router, useRouter } from "next/router"
import NavLayout from "../../../components/layouts/nav"
import EmployerProfileLayout from "../../../components/layouts/employerProfile"
import utilsService from "../../../services/utils"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}))

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", maxWidth: "440px" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress sx={{ borderRadius: 5, height: 10 }} variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

function Page() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const router = useRouter()
  const [countryId, setCountryId] = useState("160")
  const { mutate } = useSWRConfig()
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const { data: countryList } = useSWR("countries", locationService.countriesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const { data: statesList } = useSWR(`country_id=${countryId}`, locationService.statesFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const { data: qualificationsList } = useSWR(`qualificationsList`, profileServices.qualifcationsFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const { data: occupations } = useSWR(`/occupations`, utilsService.getOccupations, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false)
  const [isEditOccupation, setIsEditOccupation] = useState(false)
  const [isEditEducation, setIsEditEducation] = useState(false)
  const [isEditWorkHistory, setIsEditWorkHistory] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const [isEditHobbies, setIsEditHobbies] = useState(false)
  const [educationId, setEducationId] = useState<UserQualification | undefined>()
  const [workId, setWorkId] = useState<UserWorkHistory | undefined>()

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  //profile refs
  const titleRef = useRef<HTMLInputElement>()
  const firstNameRef = useRef<HTMLInputElement>()
  const middleNameRef = useRef<HTMLInputElement>()
  const lastNameRef = useRef<HTMLInputElement>()
  const genderRef = useRef<HTMLInputElement>()
  const dobRef = useRef<HTMLInputElement>()
  const stateRef = useRef<HTMLInputElement>()
  const otherNumberRef = useRef<HTMLInputElement>()

  //qualification refs
  const institutionRef = useRef<HTMLInputElement>()
  const graduationDateRef = useRef<HTMLInputElement>()
  const qualificationIdRef = useRef<HTMLInputElement>()

  //work experience refs
  const companyNameRef = useRef<HTMLInputElement>()
  const jobTitleRef = useRef<HTMLInputElement>()
  // const workStartDateRef = useRef<HTMLInputElement>()
  const [workStartDateRef, setWorkStartDateRef] = useState("")
  const workEndDateRef = useRef<HTMLInputElement>()
  const workSummaryRef = useRef<HTMLInputElement>()
  const presentWorkRef = useRef<HTMLInputElement>(null)
  const [isPresentWork, setIsPresentWork] = useState(Boolean(workId?.end_date === null) || false)

  //loading states
  const [isOnBoardingLoading, setIsOnBoardingLoading] = useState(false)
  const [isWorkloading, setIsWorkLoading] = useState(false)
  const [isEducationLoading, setIsEducationLoading] = useState(false)

  const [hobbies, setHobbies] = useState<string[]>(() => user?.hobbies ?? [])

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setIsImageLoading(true)
    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadService.uploadFile(formData)
      const item = res.result.file.id
      const resp = await profileServices.updateUserProfile({ profile_image_id: item } as any)
      //console.log(resp)
      mutate("userProfile")
    } catch (error: any) {
      setType("error")
      if (error.response) {
        setMessage(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
      setIsError(true)
    } finally {
      setIsImageLoading(false)
    }
  }

  const handleOnBoarding = async (e: any) => {
    e.preventDefault()
    const data = {
      title: titleRef.current?.value,
      first_name: firstNameRef.current?.value,
      last_name: lastNameRef.current?.value,
      middle_name: middleNameRef.current?.value || "",
      date_of_birth: dobRef.current?.value,
      gender: genderRef.current?.value,
      country_id: countryId,
      state_id: stateRef.current?.value,
      // other_phone_number: otherNumberRef.current?.value,
      ...(Boolean(otherNumberRef.current?.value) && { other_phone_number: otherNumberRef.current?.value }),
      // phone_number: user?.phone_number,
    }
    setIsOnBoardingLoading(true)
    try {
      const response = await profileServices.updateUserProfile(data as OnboardingData)

      setMessage(response?.message)
      setType("success")
      setIsError(true)
      setIsEditPersonalInfo(false)
      mutate("userProfile")
    } catch (error: any) {
      setType("error")
      if (error.response) {
        setMessage(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
      setIsError(true)
    } finally {
      setIsOnBoardingLoading(false)
    }
  }

  const handleAddQualifications = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = {
        qualification_id: Number(qualificationIdRef.current?.value),
        course_of_study: "",
        institution: institutionRef.current?.value,
        month_of_graduation: new Date(graduationDateRef.current?.value as string).getMonth() + 1,
        year_of_graduation: new Date(graduationDateRef.current?.value as string).getFullYear(),
      }
      setIsEducationLoading(true)
      try {
        if (educationId) {
          const response = await profileServices.updateUserQualification(
            String(educationId.detail.id),
            data as QualificationsPostData,
          )
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          mutate("userProfile")
        } else {
          const response = await profileServices.addUserQualification(data as QualificationsPostData)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          mutate("userProfile")
        }
        onCloseEducationBootstrapDialog()
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        setIsError(true)
      } finally {
        setIsEducationLoading(false)
      }
    },
    [educationId],
  )

  const handleAddWorkExperience = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = {
        company_name: companyNameRef.current?.value,
        job_title: jobTitleRef.current?.value,
        start_month: new Date(workStartDateRef).getMonth() + 1,
        start_year: new Date(workStartDateRef).getFullYear(),
        ...(!isPresentWork && { end_month: new Date(workEndDateRef.current?.value as string).getMonth() + 1 }),
        ...(!isPresentWork && { end_year: new Date(workEndDateRef.current?.value as string).getFullYear() }),
        summary: workSummaryRef.current?.value,
      }

      setIsWorkLoading(true)
      try {
        if (workId) {
          const response = await profileServices.updateUserWorkHistory(
            String(workId.id),
            data as WorkExperiencePostData,
          )
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          mutate("userProfile")
        } else {
          const response = await profileServices.addUserWorkHistory(data as WorkExperiencePostData)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          mutate("userProfile")
        }
        onCloseWorkHistoryBootstrapDialog()
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        setIsError(true)
      } finally {
        setIsWorkLoading(false)
      }
    },
    [workId, isPresentWork],
  )

  const handleUpateHobbies = async () => {
    if (!hobbies?.length) {
      setIsEditHobbies(false)
      return
    }
    try {
      const response = await profileServices.updateHobbies(hobbies)
      setMessage(response?.message)
      setType("success")
      setIsError(true)
      mutate("userProfile")
    } catch (error: any) {
      setType("error")
      if (error.response) {
        setMessage(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
      setIsError(true)
    }
    setIsEditHobbies(false)
  }

  //close modals
  const onCloseEducationBootstrapDialog = useCallback(() => {
    setIsEditEducation(false)
    setEducationId(undefined)
  }, [])

  const onCloseWorkHistoryBootstrapDialog = useCallback(() => {
    setIsEditWorkHistory(false)
    setWorkId(undefined)
    setIsPresentWork(false)
  }, [])

  const handleIsPresentWorkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPresentWork(event.target.checked)
  }

  const handleDeleteEducation = useCallback(
    (id: string) => async (e: any) => {
      try {
        const response = await profileServices.deleteUserQualification(id)
        setMessage(response?.message)
        setType("success")
        setIsError(true)
        mutate("userProfile")
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        setIsError(true)
      }
    },
    [],
  )

  const handleDeleteWorkHistory = useCallback(
    (id: string) => async (e: any) => {
      try {
        const response = await profileServices.deleteUserWorkHistory(id)
        setMessage(response?.message)
        setType("success")
        setIsError(true)
        mutate("userProfile")
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        setIsError(true)
      }
    },
    [],
  )

  const [userOccupation, setUserOccupation] = useState<
    | {
        id: number
        name: string
        active: number
        industry_id: number
      }
    | any
  >({ id: 0, name: "", active: 0, industry_id: 0 })
  const [isOccupationLoading, setIsOccupationLoading] = useState(false)
  const [occupationId, setOccupationId] = useState(undefined)

  const [userSkills, setUserSkills] = useState<
    {
      id: number
      name: string
      active: number
      industry_id: number
    }[]
  >([])

  const { data: skills, error: skillsError } = useSWR(
    userOccupation?.id ? `/occupations/${userOccupation?.id}/skills` : null,
    utilsService.getOccupationsSkill,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  // //console.log("skills", skills)

  const defaultProps = {
    options: occupations,
    getOptionLabel: (option: { id: number; name: string; active: number; industry_id: number }) => option.name,
  }

  const handleCreateOccupation = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = {
        occupation_id: userOccupation.id,
        skills: userSkills.map((item) => item.id),
      }

      setIsOccupationLoading(true)
      try {
        if (occupationId) {
          const response = await profileServices.updateOccupation(occupationId, data as CreateOccupationData)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          mutate("userProfile")
        } else {
          const response = await profileServices.createOccupation(data as CreateOccupationData)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          mutate("userProfile")
        }
        onCloseOccupationModal()
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        setIsError(true)
      } finally {
        setIsOccupationLoading(false)
      }
    },
    [userSkills, occupationId],
  )

  const onCloseOccupationModal = useCallback(() => {
    setIsEditOccupation(false)
    setOccupationId(undefined)
    setUserSkills([])
    setUserOccupation({ id: 0, name: "", active: 0, industry_id: 0 })
  }, [])

  const handleDeleteOccupation = useCallback(
    (id: string) => async (e: any) => {
      try {
        const response = await profileServices.deleteUserOccupation(id)
        setMessage(response?.message)
        setType("success")
        setIsError(true)
        mutate("userProfile")
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        setIsError(true)
      }
    },
    [],
  )

  const handleEditOccupation = useCallback(
    (item: any) => () => {
      setOccupationId(item.occupations.id)
      setUserSkills(item.user_skills)
      setUserOccupation(item)
      setIsEditOccupation(true)
    },
    [],
  )

  const handleViewImage = useCallback(
    (imageUrl: string) => () => {
      if (!imageUrl) return
      window?.open(
        imageUrl,
        "targetWindow",
        `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=yes,
                                    width=400,
                                    height=400`,
      )
    },
    [],
  )

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="h6" sx={{ my: 1, color: "primary.dark", fontSize: { xs: 16, md: 20 } }}>
          Profile Information
        </Typography>
        {!matches && (
          <IconButton
            aria-label="close"
            onClick={() => router.push("/artisan/feed")}
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>
        )}
      </Stack>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {matches && (
            <Grid item md={2}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  isImageLoading ? (
                    <CircularProgress />
                  ) : (
                    <IconButton sx={{ bgcolor: "primary.main" }} aria-label="upload picture" component="label">
                      <input onChange={handleFileChange} hidden accept="image/*" type="file" />
                      <PhotoCameraIcon sx={{ color: "white" }} />
                    </IconButton>
                  )
                }
              >
                <Avatar
                  sx={{ width: "140px", height: "140px" }}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  src={user?.relationships.profile_image?.url}
                  onClick={handleViewImage(user?.relationships.profile_image?.url)}
                />
              </Badge>
            </Grid>
          )}
          <Grid item xs={12} md={10}>
            <Stack direction="row" spacing={4}>
              {!matches && (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    isImageLoading ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        size="small"
                        sx={{ bgcolor: "primary.main" }}
                        aria-label="upload picture"
                        component="label"
                      >
                        <input onChange={handleFileChange} hidden accept="image/*" type="file" />
                        <PhotoCameraIcon fontSize="inherit" sx={{ color: "white" }} />
                      </IconButton>
                    )
                  }
                >
                  <Avatar
                    sx={{ width: "64px", height: "64px" }}
                    alt={`${user?.first_name} ${user?.last_name}`}
                    src={user?.relationships.profile_image?.url}
                    onClick={handleViewImage(user?.relationships.profile_image?.url)}
                  />
                </Badge>
              )}
              {/* <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#4D5761" }} variant="body1" gutterBottom>
                  Profile Completion
                </Typography>

                <LinearProgressWithLabel value={80} />
              </Box> */}
            </Stack>

            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              {!isEditPersonalInfo ? (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      pb: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
                  >
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }} variant="body1">
                          Personal Information
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          size="small"
                          onClick={() => setIsEditPersonalInfo(true)}
                          variant="text"
                          startIcon={<BorderColorIcon fontSize="inherit" />}
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography
                      sx={{ color: "primary.dark", mt: "1.5rem", fontSize: { xs: 13, md: 16 } }}
                      variant="body1"
                    >
                      Title
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }} variant="h6">
                      {user?.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      py: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          First Name
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.first_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Middle Name
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.middle_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Last Name
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.last_name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      py: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Date of Birth
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.date_of_birth ? new Date(user?.date_of_birth).toDateString() : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Gender
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.gender}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Email
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      py: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Phone Number
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.phone_number}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Other Phone
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.other_phone_number}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      py: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Country
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.relationships?.country?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          State
                        </Typography>
                        <Typography
                          sx={{ color: "primary.dark", mt: "1rem", fontSize: { xs: 16, md: 20 } }}
                          variant="h6"
                        >
                          {user?.relationships?.state?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              ) : (
                <Box
                  component={"form"}
                  onSubmit={handleOnBoarding}
                  sx={{
                    width: "100%",
                    px: { xs: "1rem", md: "3rem" },
                    pb: "1rem",
                  }}
                >
                  <Typography sx={{ color: "primary.dark", mb: "3rem", fontSize: { xs: 16, md: 20 } }} variant="body1">
                    Update your personal information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        required
                        id="profile-title"
                        inputRef={titleRef}
                        defaultValue={user?.title || ""}
                        placeholder="e.g Fashion Designer, Plumber e.t.c"
                        label="Job title"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        defaultValue={user?.first_name || ""}
                        fullWidth
                        inputRef={firstNameRef}
                        id="profile-firstName"
                        label="First Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        defaultValue={user?.middle_name || ""}
                        fullWidth
                        inputRef={middleNameRef}
                        id="profile-midName"
                        label="Middle Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        defaultValue={user?.last_name || ""}
                        fullWidth
                        inputRef={lastNameRef}
                        id="profile-lastName"
                        label="Last Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                          labelId="gender-select-label"
                          id="gender-select"
                          defaultValue={user?.gender || ""}
                          placeholder="Gender"
                          label="Gender"
                          required
                          inputRef={genderRef}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="date"
                        label="Date of Birth"
                        type="date"
                        required
                        inputRef={dobRef}
                        defaultValue={user?.date_of_birth}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Email"
                        id="email-start-adornment"
                        disabled
                        required
                        defaultValue={user?.email || ""}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Phone Number"
                        id="phone-number-start-adornment"
                        defaultValue={user?.phone_number || ""}
                        disabled
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Other Number "
                        id="phone-number-start-adornment"
                        inputRef={otherNumberRef}
                        defaultValue={user?.other_phone_number || ""}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="city-simple-select-label">Country</InputLabel>
                        <Select
                          labelId="city-select-label"
                          id="city-select"
                          value={user?.relationships.country?.id || countryId}
                          label="Country"
                          onChange={({ target }) => setCountryId(target.value)}
                        >
                          {countryList?.map((country: { id: number; name: string }) => (
                            <MenuItem key={country.id} value={country.id}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="state-simple-select-label">State</InputLabel>
                        <Select
                          labelId="state-select-label"
                          id="state-select"
                          defaultValue={user?.relationships.state?.id || ""}
                          label="Gender"
                          inputRef={stateRef}
                        >
                          {statesList?.map((state: { id: number; name: string }) => (
                            <MenuItem key={state.id} value={state.id}>
                              {state.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={5}>
                      <Stack spacing={2} direction="row">
                        <Button onClick={() => setIsEditPersonalInfo(false)} fullWidth color="error" variant="outlined">
                          Cancel
                        </Button>
                        <LoadingButton loading={isOnBoardingLoading} type="submit" fullWidth variant="contained">
                          Save
                        </LoadingButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", pb: "1rem" }}>
                <Stack
                  sx={{ px: { xs: "1rem", md: "3rem" } }}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }}>
                    Your Occupations and Skills
                  </Typography>

                  {matches ? (
                    <Button onClick={() => setIsEditOccupation(true)} variant="text" startIcon={<AddIcon />}>
                      Add Occupation & Skills
                    </Button>
                  ) : (
                    <IconButton onClick={() => setIsEditOccupation(true)} aria-label="add an alarm">
                      <AddIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                  )}
                </Stack>
                {user?.relationships.occupations?.map((item: any) => (
                  <Box
                    key={item.id}
                    sx={{
                      width: "100%",
                      borderBottom: { xs: "1px dashed #3E4095", md: "none" },
                      px: { xs: "1rem", md: "3rem" },
                    }}
                  >
                    <Grid
                      key={item}
                      sx={{
                        py: "1.5rem",
                      }}
                      container
                      spacing={2}
                    >
                      <Grid item xs={12} md={4}>
                        <Typography sx={{ color: "primary.dark", mb: 1, fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Occupation
                        </Typography>
                        <Stack alignItems="flex-end" direction="row" spacing={1}>
                          <Chip label={item.name} />
                        </Stack>
                      </Grid>
                      <Grid sx={{ position: "relative" }} item xs={12} md={8}>
                        <Typography sx={{ color: "primary.dark", mb: 1, fontSize: { xs: 13, md: 16 } }} variant="body1">
                          Skills
                        </Typography>
                        <Stack alignItems="flex-end" direction="row" spacing={1}>
                          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, my: 2 }}>
                            {item.user_skills.map((item: any) => (
                              <Chip key={item.id} label={item.name} />
                            ))}
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ position: { xs: "absolute", md: "relative" }, top: 0, right: 0 }}
                          >
                            <IconButton
                              onClick={handleEditOccupation(item)}
                              size="small"
                              color="secondary"
                              aria-label="add an alarm"
                            >
                              <BorderColorIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton
                              onClick={handleDeleteOccupation(item.occupations.id)}
                              size="small"
                              color="secondary"
                              aria-label="add an alarm"
                            >
                              <DeleteIcon fontSize="inherit" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, pb: "1rem" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }} variant="body1">
                    Educational Qualification
                  </Typography>

                  {matches ? (
                    <Button onClick={() => setIsEditEducation(true)} variant="text" startIcon={<AddIcon />}>
                      Add Educational Qualification
                    </Button>
                  ) : (
                    <IconButton onClick={() => setIsEditEducation(true)} aria-label="add an alarm">
                      <AddIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                  )}
                </Stack>
                {user?.relationships.qualifications?.map((item: UserQualification) => (
                  <Grid key={item.id} sx={{ pt: "1.5rem", position: "relative" }} container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="body1">
                        {item.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          {item.detail?.institution}
                        </Typography>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          {`${months[new Date(item.detail.graduation_date).getMonth()]} ${new Date(
                            item.detail.graduation_date,
                          ).getUTCFullYear()}`}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Stack mt={1} alignItems="center" direction={{ xs: "column", md: "row" }} spacing={1}>
                        {/* <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          {`${months[new Date(item.detail.graduation_date).getMonth()]} ${new Date(
                            item.detail.graduation_date,
                          ).getUTCFullYear()}`}
                        </Typography> */}

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ position: { xs: "absolute", md: "relative" }, top: 0, bottom: 0, right: 0 }}
                        >
                          <IconButton
                            onClick={() => {
                              setEducationId(item)
                              setIsEditEducation(true)
                            }}
                            size="small"
                            color="secondary"
                            aria-label="add an alarm"
                          >
                            <BorderColorIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleDeleteEducation(String(item.detail.id))}
                            color="secondary"
                            aria-label="add an alarm"
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, pb: "1rem" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }} variant="body1">
                    Work History
                  </Typography>

                  {matches ? (
                    <Button onClick={() => setIsEditWorkHistory(true)} variant="text" startIcon={<AddIcon />}>
                      Add Work History
                    </Button>
                  ) : (
                    <IconButton onClick={() => setIsEditWorkHistory(true)} aria-label="add an alarm">
                      <AddIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                  )}
                </Stack>
                {user?.relationships.work_histories?.map((item: UserWorkHistory) => (
                  <Grid key={item.id} sx={{ pt: "1.5rem" }} container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                        {item.company_name}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          {item.job_title}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 13, md: 16 } }} variant="body1">
                          {`${months[new Date(item.start_date).getMonth()]} ${new Date(
                            item.start_date,
                          ).getUTCFullYear()}`}{" "}
                          -{" "}
                          {item.end_date === null
                            ? "present"
                            : `${months[new Date(item.end_date).getMonth()]} ${new Date(
                                item.end_date,
                              ).getUTCFullYear()}`}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack mt={0} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark", fontSize: { xs: 12, md: 16 } }} variant="body1">
                          {item.summary}
                        </Typography>

                        <IconButton
                          onClick={() => {
                            setWorkId(item)
                            setIsEditWorkHistory(true)
                          }}
                          color="secondary"
                          aria-label="add an alarm"
                          size="small"
                        >
                          <BorderColorIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleDeleteWorkHistory(String(item.id))}
                          color="secondary"
                          aria-label="add an alarm"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              {!isEditHobbies ? (
                <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }} variant="body1">
                      Hobbies
                    </Typography>

                    <Button
                      size="small"
                      onClick={() => setIsEditHobbies(true)}
                      variant="text"
                      startIcon={<BorderColorIcon fontSize="inherit" />}
                    >
                      Edit
                    </Button>
                  </Stack>
                  <Stack sx={{ mt: "1rem", gap: 1, flexWrap: "wrap" }} alignItems="center" direction="row">
                    {user?.hobbies?.map((hobby: string) => (
                      <Chip key={hobby} label={hobby} />
                    ))}
                  </Stack>
                </Box>
              ) : (
                <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }} variant="body1">
                        Update your Hobbies
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Autocomplete
                        multiple
                        fullWidth
                        value={hobbies}
                        options={hobbiesList}
                        onChange={(_ev, val) => setHobbies(val)}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" placeholder="Update your Hobbies" />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Stack spacing={2} direction="row">
                        <Button onClick={() => setIsEditHobbies(false)} fullWidth color="error" variant="outlined">
                          Cancel
                        </Button>
                        <Button onClick={() => handleUpateHobbies()} fullWidth variant="contained">
                          Save
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <BootstrapDialog
        PaperProps={{ style: { margin: 8 } }}
        open={isEditOccupation}
        fullWidth
        onClose={onCloseOccupationModal}
        aria-labelledby="occupation-modal-title"
        aria-describedby="occupation-modal-description"
      >
        <BootstrapDialogTitle id="occupation-dialog-title" onClose={onCloseOccupationModal}>
          {occupationId ? "Update" : "Add"} Occupation and Skills
        </BootstrapDialogTitle>
        <DialogContent>
          {/* <TextField
            fullWidth
            id="profile-Ocupation"
            label="Ocupation"
            placeholder="Choose a sector"
            variant="outlined"
            sx={{ my: "1rem" }}
          /> */}
          <Box onSubmit={handleCreateOccupation} component="form">
            <Grid sx={{ pt: 2 }} container spacing={2}>
              {occupations && (
                <Grid item xs={12}>
                  <Autocomplete
                    fullWidth
                    value={userOccupation}
                    {...defaultProps}
                    onChange={(_ev, val) => setUserOccupation(val)}
                    renderInput={(params) => (
                      <TextField {...params} label="Ocupation" variant="outlined" placeholder="Select occupation" />
                    )}
                  />
                </Grid>
              )}
              {userOccupation?.id && !skillsError && !skills ? (
                <Grid item xs={12}>
                  <CircularProgress />
                </Grid>
              ) : null}
              {skills && (
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    fullWidth
                    value={userSkills}
                    options={skills}
                    onChange={(_ev, val) => setUserSkills(val)}
                    getOptionLabel={(option: { id: number; name: string; active: number; industry_id: number }) =>
                      option.name
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skills (Select/add as many skills as you have)"
                        variant="outlined"
                        placeholder="Your skills"
                      />
                    )}
                  />
                </Grid>
              )}
            </Grid>
            <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
              <LoadingButton
                disabled={userSkills.length < 1}
                type="submit"
                fullWidth={!matches}
                loading={isOccupationLoading}
                sx={{ px: 6 }}
                variant="contained"
              >
                Save
              </LoadingButton>
            </Stack>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        PaperProps={{ style: { margin: 8 } }}
        open={isEditEducation}
        onClose={onCloseEducationBootstrapDialog}
        aria-labelledby="qualification-modal-title"
        aria-describedby="qualification-modal-description"
      >
        <BootstrapDialogTitle id="education-modal" onClose={onCloseEducationBootstrapDialog}>
          {educationId ? "Update " : `Add `}Educational Qualification
        </BootstrapDialogTitle>
        <DialogContent>
          <Box onSubmit={handleAddQualifications} component="form">
            <Grid sx={{ pt: 2 }} container spacing={2}>
              <Grid item xs={12} md={5}>
                <FormControl required fullWidth>
                  <InputLabel id="qualification-simple-select-label">Qualification</InputLabel>
                  <Select
                    labelId="qualification-select-label"
                    id="qualification-select"
                    defaultValue={educationId?.id || ""}
                    label="Qualification"
                    required
                    inputRef={qualificationIdRef}
                  >
                    {qualificationsList?.map((item: Qualifications) => (
                      <MenuItem title={item.description} key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  fullWidth
                  id="profile-institute"
                  label="Institution/School"
                  placeholder="Institution/school attended"
                  variant="outlined"
                  required
                  defaultValue={educationId?.detail?.institution || ""}
                  inputRef={institutionRef}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  id="date"
                  label="Graduation Date"
                  type="date"
                  defaultValue={educationId?.detail?.graduation_date || ""}
                  fullWidth
                  required
                  inputRef={graduationDateRef}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
              <LoadingButton
                loading={isEducationLoading}
                type="submit"
                fullWidth={!matches}
                sx={{ px: 6 }}
                variant="contained"
              >
                {educationId ? "Update " : `Save `}
              </LoadingButton>
            </Stack>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <BootstrapDialog
        PaperProps={{ style: { margin: 8 } }}
        open={isEditWorkHistory}
        onClose={onCloseWorkHistoryBootstrapDialog}
        aria-labelledby="workhistory-modal-title"
        aria-describedby="workhistory-modal-description"
      >
        <BootstrapDialogTitle id="title-work-history" onClose={onCloseWorkHistoryBootstrapDialog}>
          {workId ? "Update " : `Add `} Work History
        </BootstrapDialogTitle>
        <DialogContent>
          <Box onSubmit={handleAddWorkExperience} component={"form"}>
            <Grid sx={{ pt: 2 }} container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="profile-company"
                  label="Company"
                  placeholder="Name of Company"
                  defaultValue={workId?.company_name || ""}
                  variant="outlined"
                  required
                  inputRef={companyNameRef}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="profile-job-title"
                  label="Job Title"
                  required
                  defaultValue={workId?.job_title || ""}
                  placeholder="Your job title"
                  variant="outlined"
                  inputRef={jobTitleRef}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="date"
                  label="Start Date*"
                  type="date"
                  // inputRef={workStartDateRef}
                  onChange={({ target }) => setWorkStartDateRef(target.value)}
                  required
                  defaultValue={workId?.start_date || ""}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  disabled={isPresentWork}
                  inputRef={workEndDateRef}
                  inputProps={{
                    min: workStartDateRef,
                    // max: "2020-08-20",
                  }}
                  required
                  defaultValue={workId?.end_date || ""}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControlLabel
                  sx={{ mt: 1 }}
                  control={
                    <Checkbox checked={isPresentWork} onChange={handleIsPresentWorkChange} inputRef={presentWorkRef} />
                  }
                  label="I’m currently working here."
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="profile-job-summary"
                  label="Summary of Work Done"
                  placeholder="What was your job"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                  defaultValue={workId?.summary || ""}
                  inputRef={workSummaryRef}
                />
              </Grid>
            </Grid>

            <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
              <LoadingButton
                loading={isWorkloading}
                type="submit"
                fullWidth={!matches}
                sx={{ px: 6 }}
                variant="contained"
              >
                {workId ? "Update " : `Save `}
              </LoadingButton>
            </Stack>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </NavLayout>
  )
}

Page.requireAuth = true

export default Page
