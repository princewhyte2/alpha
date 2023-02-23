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
import useSWR, { useSWRConfig } from "swr"

import { Router, useRouter } from "next/router"
import utilsService from "../../services/utils"
import { ErrorComponent } from "../../components/alert"
import NavLayout from "../../components/layouts/nav"
import locationService from "../../services/location"
import profileServices from "../../services/profile"
import { hobbiesList } from "../../utils"

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

  // console.log("skills", skills)

  const defaultProps = {
    options: occupations,
    getOptionLabel: (option: { id: number; name: string; active: number; industry_id: number }) => option.name,
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* {matches && (
            <Grid item md={2}>
              <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                <Avatar
                  sx={{ width: "140px", height: "140px" }}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  src={user?.relationships.profile_image?.url}
                />
              </Badge>
            </Grid>
          )} */}
          <Grid item xs={12} md={10}>
            {/* <Stack direction="row" spacing={4}>
              {!matches && (
                <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                  <Avatar
                    sx={{ width: "64px", height: "64px" }}
                    alt={`${user?.first_name} ${user?.last_name}`}
                    src={user?.relationships.profile_image?.url}
                  />
                </Badge>
              )}
            </Stack> */}

            <Box sx={{ p: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              {/* <>
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
                        {user?.phone_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        Other Phone
                      </Typography>
                      <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
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
              </> */}
              <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
                <Avatar
                  sx={{ width: { xs: "64px", md: "140px" }, height: { xs: "64px", md: "140px" } }}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  src={user?.relationships.profile_image?.url}
                />

                <Stack direction={"column"} spacing={3}>
                  <Typography sx={{ color: "primary.dark", fontSize: { xs: 16, md: 20 } }} variant="h6">
                    {user?.first_name} {user?.middle_name} {user?.last_name}
                  </Typography>
                  <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                    {user?.title}
                  </Typography>
                  <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                    {user?.email}
                  </Typography>
                  <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                    {user?.phone_number} {user?.other_phone_number}
                  </Typography>
                  <Typography sx={{ color: "primary.dark", fontSize: { xs: 14, md: 16 } }} variant="h6">
                    {user?.relationships?.state?.name} {user?.relationships?.country?.name}
                  </Typography>
                  <Stack>
                    <Button variant="contained">Message</Button>
                  </Stack>
                </Stack>
              </Stack>
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
                      Occupations and Skills
                    </Typography>
                  </Grid>
                </Grid>
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
                          <Chip label={item.name} />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography sx={{ color: "primary.dark", mb: 1 }} variant="body1">
                          Skills
                        </Typography>
                        <Stack alignItems="flex-end" direction="row" spacing={1}>
                          <Stack direction="row" spacing={1}>
                            {item.user_skills.map((item: any) => (
                              <Chip key={item.id} label={item.name} />
                            ))}
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
                </Grid>
                {user?.relationships.qualifications?.map((item: UserQualification) => (
                  <Grid key={item.id} sx={{ pt: "1.5rem", position: "relative" }} container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        {item.name}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          {item.detail?.institution}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          {`${months[new Date(item.detail.graduation_date).getMonth()]} ${new Date(
                            item.detail.graduation_date,
                          ).getUTCFullYear()}`}
                        </Typography>
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
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          {item.summary}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Hobbies
                    </Typography>
                  </Grid>
                </Grid>
                <Stack sx={{ mt: "1rem" }} alignItems="center" direction="row" spacing={1}>
                  {user?.hobbies?.map((hobby: string) => (
                    <Chip key={hobby} label={hobby} />
                  ))}
                </Stack>
              </Box>
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
