import { ChangeEvent, ReactElement, useRef, useState, FormEvent, useCallback } from "react"
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
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import { AlertColor } from "@mui/material"
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
import Stack from "@mui/material/Stack"
import AddIcon from "@mui/icons-material/Add"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import ProfileLayout from "../../components/layouts/profile"
import useSWR, { useSWRConfig } from "swr"
import profileServices from "../../services/profile"
import locationService from "../../services/location"
import uploadService from "../../services/upload"
import { hobbiesList } from "../../utils"
import { ErrorComponent } from "../../components/alert"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
]

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  px: { xs: 2, md: 4 },
  pb: 4,
  pt: 3,
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
  const [countryId, setCountryId] = useState("160")
  const { mutate } = useSWRConfig()
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const { data: countryList } = useSWR("countries", locationService.countriesFetcher)
  const { data: statesList } = useSWR(`country_id=${countryId}`, locationService.statesFetcher)
  const { data: qualificationsList } = useSWR(`qualificationsList`, profileServices.qualifcationsFetcher)
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false)
  const [isEditOccupation, setIsEditOccupation] = useState(false)
  const [isEditEducation, setIsEditEducation] = useState(false)
  const [isEditWorkHistory, setIsEditWorkHistory] = useState(false)

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

  //qualification refs
  const institutionRef = useRef<HTMLInputElement>()
  const graduationDateRef = useRef<HTMLInputElement>()
  const qualificationIdRef = useRef<HTMLInputElement>()

  //work experience refs
  const companyNameRef = useRef<HTMLInputElement>()
  const jobTitleRef = useRef<HTMLInputElement>()
  const workStartDateRef = useRef<HTMLInputElement>()
  const workEndDateRef = useRef<HTMLInputElement>()
  const workSummaryRef = useRef<HTMLInputElement>()

  const [hobbies, setHobbies] = useState<string[]>(() => user?.hobbies)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadService.uploadFile(formData)
      const item = res.result.file.id
      const resp = await profileServices.updateUserProfile({ profile_image_id: item })
      console.log(resp)
      mutate("userProfile")
    } catch (error: any) {
      setType("error")
      if (error.response) {
        setMessage(error.response.data.message)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error", error.message)
      }
      setIsError(true)
    }
  }

  const handleOnBoarding = async () => {
    const data = {
      title: titleRef.current?.value,
      first_name: firstNameRef.current?.value,
      last_name: lastNameRef.current?.value,
      middle_name: middleNameRef.current?.value,
      date_of_birth: dobRef.current?.value,
      gender: genderRef.current?.value,
      country_id: countryId,
      state_id: stateRef.current?.value,
      // "profile_image_id":
    }
    try {
      const response = await profileServices.updateUserProfile(data as OnboardingData)
      mutate("userProfile")
      console.log("response", response)
    } catch (error: any) {
      setType("error")
      if (error.response) {
        setMessage(error.response.data.message)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error", error.message)
      }
      setIsError(true)
    }
  }

  const handleAddQualifications = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = {
        qualification_id: Number(qualificationIdRef.current?.value),
        course_of_study: "",
        institution: institutionRef.current?.value,
        month_of_graduation: new Date(graduationDateRef.current?.value as string).getMonth(),
        year_of_graduation: new Date(graduationDateRef.current?.value as string).getFullYear(),
      }

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
        onCloseEducationModal()
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log("Error", error.message)
        }
        setIsError(true)
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
        start_month: new Date(workStartDateRef.current?.value as string).getMonth(),
        start_year: new Date(workStartDateRef.current?.value as string).getFullYear(),
        end_month: new Date(workEndDateRef.current?.value as string).getMonth(),
        end_year: new Date(workEndDateRef.current?.value as string).getFullYear(),
        summary: workSummaryRef.current?.value,
      }

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
        onCloseWorkHistoryModal()
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log("Error", error.message)
        }
        setIsError(true)
      }
    },
    [workId],
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
        console.log(error.request)
      } else {
        console.log("Error", error.message)
      }
      setIsError(true)
    }
    setIsEditHobbies(false)
  }

  //close modals
  const onCloseEducationModal = useCallback(() => {
    setIsEditEducation(false)
    setEducationId(undefined)
  }, [])

  const onCloseWorkHistoryModal = useCallback(() => {
    setIsEditWorkHistory(false)
    setWorkId(undefined)
  }, [])

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
          console.log(error.request)
        } else {
          console.log("Error", error.message)
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
          console.log(error.request)
        } else {
          console.log("Error", error.message)
        }
        setIsError(true)
      }
    },
    [],
  )

  // console.log("profile", user)

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        Profile Information
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {matches && (
            <Grid item md={2}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <IconButton sx={{ bgcolor: "primary.main" }} aria-label="upload picture" component="label">
                    <input onChange={handleFileChange} hidden accept="image/*" type="file" />
                    <PhotoCameraIcon sx={{ color: "white" }} />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{ width: "140px", height: "140px" }}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  src={user?.relationships.profile_image?.url}
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
                    <IconButton
                      size="small"
                      sx={{ bgcolor: "primary.main" }}
                      aria-label="upload picture"
                      component="label"
                    >
                      <input onChange={handleFileChange} hidden accept="image/*" type="file" />
                      <PhotoCameraIcon fontSize="small" sx={{ color: "white" }} />
                    </IconButton>
                  }
                >
                  <Avatar
                    sx={{ width: "64px", height: "64px" }}
                    alt={`${user?.first_name} ${user?.last_name}`}
                    src={user?.relationships.profile_image?.url}
                  />
                </Badge>
              )}
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#4D5761" }} variant="body1" gutterBottom>
                  Profile Completion
                </Typography>
                <LinearProgressWithLabel value={80} />
              </Box>
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
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Personal Information
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => setIsEditPersonalInfo(true)}
                          variant="text"
                          startIcon={<BorderColorIcon />}
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography sx={{ color: "primary.dark", mt: "1.5rem" }} variant="body1">
                      Title
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
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
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          First Name
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.first_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Middle Name
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.middle_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Last Name
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
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
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Date of Birth
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.date_of_birth ? new Date(user?.date_of_birth).toDateString() : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Gender
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.gender}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Email
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
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
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Phone Number
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.relationships?.phone_numbers}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Other Phone
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.relationships?.phone_numbers}
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
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Country
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.relationships?.country?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          State
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.relationships?.state?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    px: { xs: "1rem", md: "3rem" },
                    pb: "1rem",
                  }}
                >
                  <Typography sx={{ color: "primary.dark", mb: "3rem" }} variant="body1">
                    Update your personal information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        id="profile-title"
                        inputRef={titleRef}
                        defaultValue={user?.title || ""}
                        placeholder="e.g Fashion Designer, Plumber e.t.c"
                        label="Title"
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
                        defaultValue={user?.email}
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
                      <Button variant="text" startIcon={<AddIcon />}>
                        Add Another Phone No
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Other Number "
                        id="phone-number-start-adornment"
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
                        <Button onClick={handleOnBoarding} fullWidth variant="contained">
                          Save
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", pb: "1rem" }}>
                <Grid
                  sx={{ px: { xs: "1rem", md: "3rem" } }}
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Your Occupations and Skills
                    </Typography>
                  </Grid>
                  <Grid container item direction="row" justifyContent="flex-end" alignItems="center">
                    {matches ? (
                      <Button onClick={() => setIsEditOccupation(true)} variant="text" startIcon={<AddIcon />}>
                        Add Occupation & Skills
                      </Button>
                    ) : (
                      <IconButton onClick={() => setIsEditOccupation(true)} aria-label="add an alarm">
                        <AddIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {[1, 2].map((item) => (
                  <Box
                    key={item}
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

                        position: "relative",
                      }}
                      container
                      spacing={2}
                    >
                      <Grid item xs={12} md={4}>
                        <Typography sx={{ color: "primary.dark", mb: 1 }} variant="body1">
                          Occupation
                        </Typography>
                        <Stack alignItems="flex-end" direction="row" spacing={1}>
                          <Chip label="Fashion" />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Skills
                        </Typography>
                        <Stack alignItems="flex-end" direction="row" spacing={1}>
                          <Stack direction="row" spacing={1}>
                            <Chip label="Tailor" />
                            <Chip label="Embroidery" />
                            <Chip label="Monogram" />
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ position: { xs: "absolute", md: "relative" }, top: 0, bottom: 0, right: 0 }}
                          >
                            <IconButton color="secondary" aria-label="add an alarm">
                              <BorderColorIcon />
                            </IconButton>
                            <IconButton color="secondary" aria-label="add an alarm">
                              <DeleteIcon />
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
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Educational Qualification
                    </Typography>
                  </Grid>
                  <Grid item>
                    {matches ? (
                      <Button onClick={() => setIsEditEducation(true)} variant="text" startIcon={<AddIcon />}>
                        Add Educational Qualification
                      </Button>
                    ) : (
                      <IconButton onClick={() => setIsEditEducation(true)} aria-label="add an alarm">
                        <AddIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {user?.relationships.qualifications?.map((item: UserQualification) => (
                  <Grid key={item.id} sx={{ pt: "1.5rem", position: "relative" }} container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        {item.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          {item.detail?.institution}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={8}>
                      <Stack mt={0} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          {`${months[new Date(item.detail.graduation_date).getMonth()]} ${new Date(
                            item.detail.graduation_date,
                          ).getUTCFullYear()}`}
                        </Typography>

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
                            color="secondary"
                            aria-label="add an alarm"
                          >
                            <BorderColorIcon />
                          </IconButton>
                          <IconButton
                            onClick={handleDeleteEducation(String(item.detail.id))}
                            color="secondary"
                            aria-label="add an alarm"
                          >
                            <DeleteIcon />
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
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Work History
                    </Typography>
                  </Grid>
                  <Grid item>
                    {matches ? (
                      <Button onClick={() => setIsEditWorkHistory(true)} variant="text" startIcon={<AddIcon />}>
                        Add Work History
                      </Button>
                    ) : (
                      <IconButton onClick={() => setIsEditWorkHistory(true)} aria-label="add an alarm">
                        <AddIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {user?.relationships.work_histories?.map((item: UserWorkHistory) => (
                  <Grid key={item.id} sx={{ pt: "1.5rem" }} container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        {item.company_name}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          {item.job_title}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          {`${months[new Date(item.start_date).getMonth()]} ${new Date(
                            item.start_date,
                          ).getUTCFullYear()}`}{" "}
                          -{" "}
                          {`${months[new Date(item.end_date).getMonth()]} ${new Date(item.end_date).getUTCFullYear()}`}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack mt={0} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          {item.summary}
                        </Typography>

                        <IconButton
                          onClick={() => {
                            setWorkId(item)
                            setIsEditWorkHistory(true)
                          }}
                          color="secondary"
                          aria-label="add an alarm"
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleDeleteWorkHistory(String(item.id))}
                          color="secondary"
                          aria-label="add an alarm"
                        >
                          <DeleteIcon />
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
                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        Hobbies
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => setIsEditHobbies(true)} variant="text" startIcon={<BorderColorIcon />}>
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                  <Stack sx={{ mt: "1rem" }} alignItems="center" direction="row" spacing={1}>
                    {user?.hobbies?.map((hobby: string) => (
                      <Chip key={hobby} label={hobby} />
                    ))}
                  </Stack>
                </Box>
              ) : (
                <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        Update your Hobbies
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Autocomplete
                        multiple
                        fullWidth
                        defaultValue={user?.hobbies}
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
      <Modal
        open={isEditOccupation}
        onClose={() => setIsEditOccupation(false)}
        aria-labelledby="occupation-modal-title"
        aria-describedby="occupation-modal-description"
      >
        <Box sx={style}>
          <Stack sx={{ position: "relative" }} direction="row" justifyContent="space-between" alignItems="center">
            <Typography id="occupation-modal-title" variant="h6" component="h2">
              Add Occupation and Skills
            </Typography>
            <IconButton
              onClick={() => setIsEditOccupation(false)}
              size="small"
              sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "15px", right: "-15px" }}
              aria-label="close occupation modal"
            >
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>

          <TextField
            fullWidth
            id="profile-Ocupation"
            label="Ocupation"
            placeholder="Choose a sector"
            variant="outlined"
            sx={{ my: "1rem" }}
          />
          <TextField
            fullWidth
            id="profile-SKills"
            label="Skills (Select/add as many skills as you have)"
            placeholder="Your skills"
            variant="outlined"
          />
          <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
            <Button fullWidth={!matches} sx={{ px: 6 }} variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={isEditEducation}
        onClose={onCloseEducationModal}
        aria-labelledby="qualification-modal-title"
        aria-describedby="qualification-modal-description"
      >
        <Box onSubmit={handleAddQualifications} component="form" sx={style}>
          <Stack
            sx={{ position: "relative", mb: "1.9rem" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="qualification-modal-title" variant="h6" component="h2">
              {educationId ? "Update " : `Add `}Educational Qualification
            </Typography>
            <IconButton
              onClick={onCloseEducationModal}
              size="small"
              sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "2px", right: "-15px" }}
              aria-label="close qualification modal"
            >
              <CloseIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          </Stack>

          <Grid container spacing={2}>
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
            <Button type="submit" fullWidth={!matches} sx={{ px: 6 }} variant="contained">
              {educationId ? "Update " : `Save `}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={isEditWorkHistory}
        onClose={onCloseWorkHistoryModal}
        aria-labelledby="workhistory-modal-title"
        aria-describedby="workhistory-modal-description"
      >
        <Box onSubmit={handleAddWorkExperience} component={"form"} sx={style}>
          <Stack
            sx={{ position: "relative", mb: "1.9rem" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="workhistory-modal-title" variant="h6" component="h2">
              {workId ? "Update " : `Add `} Work History
            </Typography>
            <IconButton
              size="small"
              onClick={onCloseWorkHistoryModal}
              sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "2px", right: "-22px" }}
              aria-label="close workhistory modal"
            >
              <CloseIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Start Date*"
                type="date"
                inputRef={workStartDateRef}
                required
                defaultValue={workId?.start_date || ""}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="End Date"
                type="date"
                inputRef={workEndDateRef}
                required
                defaultValue={workId?.end_date || ""}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
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
            <Button type="submit" fullWidth={!matches} sx={{ px: 6 }} variant="contained">
              {workId ? "Update " : `Save `}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page
