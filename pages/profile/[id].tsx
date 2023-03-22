import { ChangeEvent, ReactElement, useRef, useState, FormEvent, useCallback, MutableRefObject, useMemo } from "react"
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
import Paper from "@mui/material/Paper"

// import DialogContent from "@mui/material/DialogContent"
import CircularProgress from "@mui/material/CircularProgress"
import CloseIcon from "@mui/icons-material/Close"
// import Dialog from "@mui/material/Dialog"
// import DialogTitle from "@mui/material/DialogTitle"
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
// import TextField from "@mui/material/TextField"
import DeleteIcon from "@mui/icons-material/Delete"
import PhoneIcon from "@mui/icons-material/Phone"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
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
import connectionService from "../../services/connection"
import messagingService from "../../services/messaging"

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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  // width: "100%",
  position: "relative",
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
  const [isConnecting, setIsConnecting] = useState(false)
  const [projectData, setProjectData] = useState<ProjectResponseData | any>()
  const [isViewProjectInfo, setIsViewProjectInfo] = useState(false)
  const { mutate } = useSWRConfig()
  const { data: user } = useSWR(router.query?.id ? `/users/${router.query?.id}` : null, profileServices.getProfileById)
  const { data: conversations } = useSWR("conversations", messagingService.getAllConversations)

  const hasConversation = useMemo(() => {
    const conversation = conversations?.find((conversation: any) =>
      conversation.relationships.participants.find((participant: any) => participant.id === user?.id),
    )
    return conversation?.id
  }, [conversations, user])
  console.log("conversations", conversations)
  console.log("has conversation", hasConversation)
  const [open, setOpen] = useState(false)
  const messageInputRef = useRef()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSendMessage = async () => {
    //@ts-ignore
    const defaultMessage: any = messageInputRef.current?.value
    if (!defaultMessage) return
    try {
      const chat = await messagingService.sendMessage("", { receiver_id: user?.id, message: defaultMessage })
      console.log("chat", chat)
      //@ts-ignore
      messageInputRef.current.value = ""
      handleClose()
      console.log("chat", chat)
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleChat = () => {
    if (hasConversation) {
      router.push(`/messaging/${hasConversation}`)
    } else {
      handleClickOpen()
    }
  }

  console.log("user", user)
  const { data: approvedConnectionList } = useSWR("approvedConnections", connectionService.getApprovedUserConnections)
  //TODO : scale this algorightm later

  const isConnection = useMemo(() => {
    return approvedConnectionList?.some((item: any) => item.id === user?.id)
  }, [approvedConnectionList, user])
  console.log(approvedConnectionList, "list")

  const { data: occupations } = useSWR(`/occupations`, utilsService.getOccupations, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  // console.log("skills", skills)

  const defaultProps = {
    options: occupations,
    getOptionLabel: (option: { id: number; name: string; active: number; industry_id: number }) => option.name,
  }

  const sendConnectionRequest = useCallback(async () => {
    setIsConnecting(true)
    try {
      const response = await connectionService.sendConnectionRequest(user?.id)
      mutate("unApprovedConnections")
      // mutate("approvedConnections")
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
      setIsConnecting(false)
    }
  }, [user])

  const onViewProject = useCallback(
    (item: ProjectResponseData) => (e: any) => {
      setProjectData(item)
      setIsViewProjectInfo(true)
    },
    [],
  )

  const handleCloseModal = useCallback(() => {
    setIsViewProjectInfo(false)

    setProjectData(undefined)
  }, [])

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
                  src={user?.relationships?.profile_image?.url}
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
                  <Box>
                    {isConnection ? (
                      <Button onClick={handleChat} variant="contained">
                        Message
                      </Button>
                    ) : (
                      <LoadingButton loading={isConnecting} onClick={sendConnectionRequest} variant="contained">
                        Send Request
                      </LoadingButton>
                    )}
                  </Box>
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
                {user?.relationships?.occupations?.map((item: any) => (
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
                          <Stack flexDirection={"row"} sx={{ flexWrap: "wrap", gap: 1 }}>
                            {user?.relationships?.skills.map((item: any) => (
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
                {user?.relationships?.qualifications?.map((item: UserQualification) => (
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
                {user?.relationships?.work_histories?.map((item: UserWorkHistory) => (
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
                      Projects
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {user?.relationships.projects?.map((item: any) => (
                    <Grid onClick={onViewProject(item)} key={item.id} item xs={12} md={4}>
                      <Item>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box sx={{ width: "180px", height: "131px", overflow: "hidden", background: "black" }}>
                            <img
                              width="180px"
                              height="131px"
                              className="overlay-image"
                              src={item.images[0]?.url}
                              alt={item.images[0]?.name}
                              loading="lazy"
                            />
                          </Box>
                        </Stack>
                        <Typography variant="body1" sx={{ mt: 1, color: "primary.main" }}>
                          {item.title}
                        </Typography>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
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
                <Stack sx={{ mt: "1rem", gap: 1, flexWrap: "wrap" }} alignItems="center" direction="row">
                  {user?.hobbies?.map((hobby: string) => (
                    <Chip key={hobby} label={hobby} />
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Start Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start a conversation with {user?.first_name} {user?.middle_name} {user?.last_name} by sending a message
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message-quick"
            label="message"
            inputRef={messageInputRef}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendMessage}>Send</Button>
        </DialogActions>
      </Dialog>
      <BootstrapDialog
        open={isViewProjectInfo}
        onClose={handleCloseModal}
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
      >
        <BootstrapDialogTitle id="projects-dialog-title" onClose={handleCloseModal}>
          {projectData?.title}
        </BootstrapDialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body1" sx={{ my: 2, color: "#4D5761" }}>
            {projectData?.description}
          </Typography>
          <Grid container spacing={2}>
            {projectData?.images.map((item: any) => (
              <Grid key={item.id} item xs={12} md={6}>
                <img width="100%" height="224px" className="img" src={item.url} alt={item.name} loading="lazy" />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </BootstrapDialog>

      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

Page.requireAuth = true

export default Page
