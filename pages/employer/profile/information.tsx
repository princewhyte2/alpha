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
import useSWR, { useSWRConfig } from "swr"
import { ErrorComponent } from "../../../components/alert"
import ProfileLayout from "../../../components/layouts/profile"
import EmployerProfileLayout from "../../../components/layouts/employerProfile"
import profileServices from "../../../services/profile"
import locationService from "../../../services/location"
import EmployerNavLayout from "../../../components/layouts/employernav"
import NavLayout from "../../../components/layouts/nav"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

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
  const [countryId, setCountryId] = useState("160")
  const { mutate } = useSWRConfig()
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const { data: countryList } = useSWR("countries", locationService.countriesFetcher)
  const { data: statesList } = useSWR(`country_id=${countryId}`, locationService.statesFetcher)
  //   const { data: qualificationsList } = useSWR(`qualificationsList`, profileServices.qualifcationsFetcher)
  const [logo, setLogo] = useState<any>()
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false)
  const [isEditBusinessInfo, setisEditBusinessInfo] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)

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

  //references to form
  const businessNameRef = useRef<HTMLInputElement>()
  const websiteRef = useRef<HTMLInputElement>()
  const businessEmailRef = useRef<HTMLInputElement>()
  const businessAddressRef = useRef<HTMLInputElement>()
  const industryRef = useRef<HTMLInputElement>()

  //loading states
  const [isOnBoardingLoading, setIsOnBoardingLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setIsImageLoading(true)
    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      //   const res = await uploadService.uploadFile(formData)
      //   const item = res.result.file.id
      //   const resp = await profileServices.updateUserProfile({ profile_image_id: item })
      //   console.log(resp)
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
    } finally {
      setIsImageLoading(false)
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
      other_phone_number: otherNumberRef.current?.value,
    }
    setIsOnBoardingLoading(true)
    try {
      //   if (otherNumberRef.current?.value !== user?.relationships?.phone_numbers[1]?.phone_number) {
      // await profileServices.addPhoneNumber({ phone_number: otherNumberRef.current?.value as string })
      //   }
      const response = await profileServices.updateUserProfile(data as OnboardingData)

      mutate("userProfile")
      setMessage(response?.message)
      setType("success")
      setIsError(true)
      setIsEditPersonalInfo(false)
    } catch (error: any) {
      setType("error")
      if (error.response) {
        setMessage(error.response.data.message)
        setType("error")
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error", error.message)
      }
      setIsError(true)
    } finally {
      setIsOnBoardingLoading(false)
    }
  }

  console.log("user", user)

  const handleCreateCompany = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      try {
        const data = {
          owned_by: user?.id,
          name: businessNameRef.current?.value,
          website: websiteRef.current?.value,
          address: businessAddressRef.current?.value,
          email: businessEmailRef.current?.value,
          logo_image_id: logo?.id,
          industry_id: industryRef.current?.value,
        }
        const response = await profileServices.createCompany(data)
        mutate("userProfile")
        setType("success")
        setMessage(response.message)
        setIsError(true)
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
      } finally {
        setLoading(false)
      }
    },
    [user, logo],
  )

  // console.log("profile", user)

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        Business Information
      </Typography>
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
                <Avatar sx={{ width: "140px", height: "140px" }} alt={`richard`} src={logo?.url} />
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
                    alt={"richard "}
                    src={"user?.relationships.profile_image?.url"}
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
              {!isEditBusinessInfo ? (
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
                          Business Information
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => setisEditBusinessInfo(true)}
                          variant="text"
                          startIcon={<BorderColorIcon />}
                        >
                          Edit
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ mt: "1.5rem" }}>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Business Name
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          Tommy Fashion Company
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Company Website
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          www.companywebsite.com
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
                      <Grid item xs={8}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Business/Office Address
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          35, Wole Oladele street, Ilupeju, Lagos.
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Location
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          Lagos
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
                      <Grid item xs={12}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Company Email Address
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          babakunle@gmail.com
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
                      <Grid item xs={12}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Business Sector
                        </Typography>
                        {/* <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {"user?.relationships?.phone_numbers[0]?.phone_number"}
                        </Typography> */}
                        <Stack sx={{ mt: "1rem" }} direction="row" spacing={1}>
                          <Chip label="Fashion" />
                        </Stack>
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
                      <Grid item xs={12}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Services Provided
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          Fermentum lorem quis consequat donec scelerisque diam id. Facilisi libero quis magna nisl
                          donec adipiscing.
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
                  {/* <Typography sx={{ color: "primary.dark", mb: "3rem" }} variant="body1">
                    Update your personal information
                  </Typography> */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        id="business-profile-title"
                        inputRef={titleRef}
                        defaultValue={'user?.title || ""'}
                        placeholder="Business Name"
                        label="Business Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        id="business-profile-address"
                        inputRef={titleRef}
                        defaultValue={'user?.title || ""'}
                        placeholder="Address"
                        label="Business/Office Address"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="city-simple-select-label">Country</InputLabel>
                        <Select
                          labelId="city-select-label"
                          id="city-select"
                          value={"user?.relationships.country?.id || countryId"}
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
                          defaultValue={'user?.relationships.state?.id || ""'}
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

                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Company Email Address"
                        id="email-start-business"
                        placeholder="Email Address"
                        defaultValue={'user?.email || ""'}
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
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Business Sector</InputLabel>
                        <Select
                          labelId="gender-select-label"
                          id="gender-select"
                          defaultValue={"Fashion"}
                          placeholder="Gender"
                          label="Gender"
                          inputRef={genderRef}
                        >
                          <MenuItem value={"Fashion"}>Fashion</MenuItem>
                          {/* <MenuItem value={"female"}>Female</MenuItem> */}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <TextField
                        defaultValue={'user?.last_name || ""'}
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Description"
                        inputRef={lastNameRef}
                        id="profile-lastName"
                        label="Services Provided"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={5}>
                      <Stack spacing={2} direction="row">
                        <Button onClick={() => setisEditBusinessInfo(false)} fullWidth color="error" variant="outlined">
                          Cancel
                        </Button>
                        <LoadingButton
                          loading={isOnBoardingLoading}
                          onClick={handleOnBoarding}
                          fullWidth
                          variant="contained"
                        >
                          Save
                        </LoadingButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              {!isEditPersonalInfo ? (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      pb: "1rem",
                    }}
                  >
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Owner’s Information
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
                          {user?.relationships?.phone_number}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Other Phone
                        </Typography>
                        <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                          {user?.relationships?.other_phone_number || null}
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
                        defaultValue={user?.relationships?.phone_number || ""}
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
                    {/* <Grid item xs={12} md={8}>
                      <Button variant="text" startIcon={<AddIcon />}>
                        Add Another Phone No
                      </Button>
                    </Grid> */}
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Other Number "
                        id="phone-number-start-adornment"
                        inputRef={otherNumberRef}
                        defaultValue={user?.relationships?.other_phone_number || ""}
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
                        <LoadingButton
                          loading={isOnBoardingLoading}
                          onClick={handleOnBoarding}
                          fullWidth
                          variant="contained"
                        >
                          Save
                        </LoadingButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

Page.requireAuth = true

export default Page
