import { ReactElement, useCallback, useState, useEffect } from "react"
import MessageIcon from "@mui/icons-material/Message"
import Link from "@mui/material/Link"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme, Theme } from "@mui/material/styles"
import CircularProgress from "@mui/material/CircularProgress"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import useSWR, { useSWRConfig } from "swr"
import { AlertColor } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import SendIcon from "@mui/icons-material/Send"
import CancelIcon from "@mui/icons-material/Cancel"
import InputAdornment from "@mui/material/InputAdornment"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles"
import Chip from "@mui/material/Chip"
import SearchIcon from "@mui/icons-material/Search"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import { red } from "@mui/material/colors"
import ChatIcon from "@mui/icons-material/Chat"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import Container from "@mui/material/Container"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ProfileLayout from "../../components/layouts/profile"
import NavLayout from "../../components/layouts/nav"
import EmployerNavLayout from "../../components/layouts/employernav"
import utilsService from "../../services/utils"
import connectionService from "../../services/connection"
import { ErrorComponent } from "../../components/alert"
import NoInvitationIllustration from "../../components/icons/NoInvitationIllustration"
import NoConnectionIllustartion from "../../components/icons/NoConnectionIllustration"
import { useRouter } from "next/router"
import profileServices from "../../services/profile"
import notificationsServices from "../../services/notifications"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, md: 3 } }}>{children}</Box>}
    </div>
  )
}
dayjs.extend(relativeTime)
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

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
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const { data: notifications, isLoading: isNotificationsLoading } = useSWR(
    "notifications",
    notificationsServices.getALlNotifications,
    {
      // revalidateIfStale: false,
      // revalidateOnFocus: false,
      // revalidateOnReconnect: false,
    },
  )
  //console.log("user notifications", notifications)
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  //console.log("user", user)
  const [value, setValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const { mutate } = useSWRConfig()
  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  //   //console.log("user", user)

  //   const { data: unApprovedConnectionList } = useSWR(
  //     "unApprovedConnections",
  //     connectionService.getUnApprovedUserConnections,
  //   )
  const { data: approvedConnectionList } = useSWR("approvedConnections", connectionService.getApprovedUserConnections)

  //   const { data: usersList } = useSWR(
  //     searchTerm ? `/search/artisans/employers?searchTerm=${searchTerm}` : null,
  //     utilsService.searchUsers,
  //     {
  //       keepPreviousData: true,
  //     },
  //   )

  const sendConnectionRequest = useCallback(
    (userId: string) => () => {
      router.push(`/profile/${userId}`)
    },
    [],
  )

  //   useEffect(() => {
  //     if (!searchTerm) {
  //       setValue(0)
  //     }
  //   }, [searchTerm])

  const acceptConnectionRequest = useCallback(
    (userId: string) => async () => {
      try {
        const response = await connectionService.acceptConnectionRequest(userId)
        mutate("unApprovedConnections")
        mutate("approvedConnections")
        setType("success")
        setMessage(response.message)
        setIsError(true)
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

  const rejectConnectionRequest = useCallback(
    (userId: string) => async () => {
      try {
        const response = await connectionService.rejectConnectionRequest(userId)
        mutate("unApprovedConnections")
        mutate("approvedConnections")
        setType("success")
        setMessage(response.message)
        setIsError(true)
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

  const handleSendMessage = async (userId: string) => {
    router.push(`/profile/${userId}`)
    // const defaultMessage = "we are starting ur converstation"
    // try {
    //   const chat = await messagingService.sendMessage("", { receiver_id: userId, message: defaultMessage })
    //   //console.log("chat", chat)
    // } catch (error) {
    //   //console.log("error", error)
    // }
  }
  const handleReadNotification = (notififcationId: string) => {
    const notifyItem = notifications.find((item: any) => item.id === notififcationId)
    if (notifyItem.read_at !== null) return

    notificationsServices
      .markReadNotification(notififcationId)
      .then(() => mutate("notifications"))
      .catch(() => {})
  }

  console.log("user notification", notifications)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container disableGutters maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Container maxWidth="md">
              <Paper
                elevation={1}
                sx={{
                  p: 4,
                  my: 2,
                  boxShadow:
                    " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                <IconButton
                  sx={{ display: { xs: "inline-block", md: "none" } }}
                  onClick={() => router.back()}
                  color="primary"
                  aria-label="back button"
                >
                  <KeyboardBackspaceIcon />
                </IconButton>
                <Typography sx={{ fontSize: { xs: 16, md: 20 } }} color="primary.dark">
                  Notifications
                </Typography>
                <Stack direction="column" spacing={1}>
                  {isNotificationsLoading && <CircularProgress />}
                  {notifications?.map((item: any) => {
                    if (item.type === "MessageSentNotification") {
                      return (
                        <Stack
                          key={item.id}
                          onMouseEnter={() => handleReadNotification(item.id)}
                          onClick={() => router.push(`/messaging/${item.data?.conversation_id}`)}
                          sx={{
                            px: 2,
                            py: 3,
                            borderBottom: "0.2px solid #3E4095",
                            flexWrap: "wrap",
                            gap: 4,
                            backgroundColor: item.read_at ? "#FFF" : "#F8F9FC",
                          }}
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent="space-between"
                        >
                          <Stack alignItems={"center"} direction={"row"} spacing={2}>
                            <Avatar
                              sx={{ width: 40, height: 40 }}
                              alt={item.data?.sender?.first_name}
                              src={
                                item.data?.sender?.company
                                  ? item.data?.sender?.company?.logo_image?.url
                                  : item.data?.sender?.profile_image?.url
                              }
                            />
                            <Stack direction={"column"} spacing={1}>
                              <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                                <Link underline="none" href={`/messaging/${item.data?.conversation_id}`}>
                                  {item.data?.sender?.company
                                    ? item.data?.sender?.company?.name
                                    : `${item.data?.sender?.first_name} ${item.data?.sender?.last_name}`}{" "}
                                </Link>
                                sent you a message
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                            {dayjs(item?.created_at).fromNow()}
                          </Typography>

                          {/* <Button
                            onClick={() => router.push(`/messaging/${item.data?.conversation_id}`)}
                            variant="text"
                          >
                            View
                          </Button> */}
                        </Stack>
                      )
                    } else if (item.type === "SendConnectionRequestNotification") {
                      return (
                        <Stack
                          key={item.id}
                          onMouseEnter={() => handleReadNotification(item.id)}
                          onClick={() => router.push(`/employer/connection`)}
                          sx={{
                            px: 2,
                            py: 3,
                            borderBottom: "0.2px solid #3E4095",
                            flexWrap: "wrap",
                            gap: 4,
                            backgroundColor: item.read_at ? "#FFF" : "#F8F9FC",
                          }}
                          direction={"row"}
                          // spacing={2
                        >
                          <Stack alignItems={"center"} direction={"row"} spacing={2}>
                            <Avatar
                              sx={{ width: 40, height: 40 }}
                              alt={item.data?.sender?.first_name}
                              src={item.data?.sender?.profile_image?.url}
                            />
                            <Stack direction={"column"} spacing={1}>
                              <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                                <Link underline="none" href={`/employer/connection`}>
                                  {item.data?.name}{" "}
                                </Link>
                                sent you a connection request
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                            {dayjs(item?.created_at).fromNow()}
                          </Typography>

                          {/* <Button onClick={() => router.push(`/artisan/connection`)} variant="contained">
                            View
                          </Button> */}
                        </Stack>
                      )
                    } else if (item.type === "NewJobApplicationNotification") {
                      return (
                        <Stack
                          key={item.id}
                          onMouseEnter={() => handleReadNotification(item.id)}
                          onClick={() => router.push(`/jobs/${item.data?.vacancy?.id}`)}
                          sx={{
                            px: 2,
                            py: 3,
                            borderBottom: "0.2px solid #3E4095",
                            flexWrap: "wrap",
                            gap: 4,
                            backgroundColor: item.read_at ? "#FFF" : "#F8F9FC",
                          }}
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent="space-between"
                        >
                          <Stack alignItems={"center"} direction={"row"} spacing={2}>
                            <Avatar
                              sx={{ width: 40, height: 40 }}
                              alt={item.data?.sender?.first_name}
                              src={item.data?.applicant?.profile_image?.url}
                            />
                            <Stack direction={"column"} spacing={1}>
                              <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                                <Link underline="none" href={`/jobs/${item.data?.vacancy?.id}`}>
                                  {item.data?.applicant?.first_name} {item.data?.applicant?.last_name}{" "}
                                </Link>
                                Applied to your Job
                              </Typography>
                            </Stack>
                          </Stack>

                          <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                            {dayjs(item?.created_at).fromNow()}
                          </Typography>

                          {/* <Button onClick={() => router.push(`/jobs/${item.data?.vacancy?.id}`)} variant="contained">
                            View
                          </Button> */}
                        </Stack>
                      )
                    } else if (item.type === "NewCommentNotification") {
                      return (
                        <Stack
                          key={item.id}
                          onMouseEnter={() => handleReadNotification(item.id)}
                          onClick={() => router.push(`/posts/${item.data?.post?.id}`)}
                          sx={{
                            px: 2,
                            py: 3,
                            borderBottom: "0.2px solid #3E4095",
                            flexWrap: "wrap",
                            gap: 4,
                            backgroundColor: item.read_at ? "#FFF" : "#F8F9FC",
                          }}
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent="space-between"
                        >
                          <Stack alignItems={"center"} direction={"row"} spacing={2}>
                            <Avatar
                              sx={{ width: 40, height: 40 }}
                              alt={item.data?.sender?.first_name}
                              src={
                                item.data?.commentCreatedBy?.company
                                  ? item.data?.commentCreatedBy?.company?.logo_image?.url
                                  : item.data?.commentCreatedBy?.profile_image?.url
                              }
                            />
                            <Stack direction={"column"} spacing={1}>
                              <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                                <Link underline="none" href={`/posts/${item.data?.post?.id}`}>
                                  {item.data?.commentCreatedBy?.company
                                    ? item.data?.commentCreatedBy?.company?.name
                                    : `${item.data?.commentCreatedBy?.first_name} ${item.data?.commentCreatedBy?.last_name}`}{" "}
                                </Link>
                                commented on post
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                            {dayjs(item?.created_at).fromNow()}
                          </Typography>

                          {/* <Button onClick={() => router.push(`/posts/${item.data?.post?.id}`)} variant="contained">
                            View
                          </Button> */}
                        </Stack>
                      )
                    } else if (item.type === "NewPostNotification") {
                      return (
                        <Stack
                          key={item.id}
                          onClick={() => router.push(`/posts/${item.data?.post?.id}`)}
                          onMouseEnter={() => handleReadNotification(item.id)}
                          sx={{
                            px: 2,
                            py: 3,
                            borderBottom: "0.2px solid #3E4095",
                            flexWrap: "wrap",
                            gap: 4,
                            backgroundColor: item.read_at ? "#FFF" : "#F8F9FC",
                          }}
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent="space-between"
                        >
                          <Stack alignItems={"center"} direction={"row"} spacing={2}>
                            <Avatar
                              sx={{ width: 40, height: 40 }}
                              alt={item.data?.sender?.first_name}
                              src={
                                item.data?.post?.created_by?.company
                                  ? item.data?.post?.created_by?.company?.logo_image?.url
                                  : item.data?.post?.created_by?.profile_image?.url
                              }
                            />
                            <Stack direction={"column"} spacing={1}>
                              <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                                <Link underline="none" href={`/posts/${item.data?.post?.id}`}>
                                  {item.data?.post?.created_by?.company
                                    ? item.data?.post?.created_by?.company.name
                                    : `${item.data?.post?.created_by?.first_name} ${item.data?.post?.created_by?.last_name}`}{" "}
                                </Link>
                                created a post
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                            {dayjs(item?.created_at).fromNow()}
                          </Typography>
                          {/* <Button onClick={() => router.push(`/posts/${item.data?.post?.id}`)} variant="contained">
                            View
                          </Button> */}
                        </Stack>
                      )
                    } else if (item.type === "NewConnectionRequestNotification") {
                      return (
                        <Stack
                          key={item.id}
                          onClick={() => router.push(`/employer/connection`)}
                          onMouseEnter={() => handleReadNotification(item.id)}
                          sx={{
                            px: 2,
                            py: 3,
                            borderBottom: "0.2px solid #3E4095",
                            flexWrap: "wrap",
                            gap: 4,
                            backgroundColor: item.read_at ? "#FFF" : "#F8F9FC",
                          }}
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent="space-between"
                        >
                          <Stack alignItems={"center"} direction={"row"} spacing={2}>
                            <Avatar
                              sx={{ width: 40, height: 40 }}
                              alt={item.data?.name}
                              src={
                                item.data?.userRequestingConnection?.company
                                  ? item.data?.userRequestingConnection?.company?.logo_image?.url
                                  : item.data?.userRequestingConnection?.profile_image?.url
                              }
                            />
                            <Stack direction={"column"} spacing={1}>
                              <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                                <Link underline="none" href={`/employer/connection`}>
                                  {item.data?.userRequestingConnection?.company
                                    ? item.data?.userRequestingConnection?.company?.name
                                    : `${item.data?.userRequestingConnection?.first_name} ${item.data?.userRequestingConnection?.last_name}`}{" "}
                                </Link>
                                sent you a connection request
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography sx={{ fontSize: { xs: 14, md: 16, color: "#1D2939" } }}>
                            {dayjs(item?.created_at).fromNow()}
                          </Typography>

                          {/* <Button onClick={() => router.push(`/artisan/connection`)} variant="contained">
                            View
                          </Button> */}
                        </Stack>
                      )
                    }
                  })}
                </Stack>
              </Paper>
            </Container>
          </Grid>
          {matches && (
            <Grid item md={3}>
              <Stack direction="column" spacing={3} sx={{ p: 2 }}>
                <Card
                  sx={{
                    backgroundColor: "#F8F9FC",
                    boxShadow: " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 8px 48px #EEEEEE",
                  }}
                >
                  <CardContent>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                      <Avatar
                        sx={{ width: 80, height: 80 }}
                        alt={user?.relationships?.company?.name}
                        src={user?.relationships?.company.logo_image?.url}
                      />
                      <Typography sx={{ fontSize: 16 }} color="primary.main">
                        {user?.relationships?.company.name}
                      </Typography>
                      <Typography sx={{ fontSize: 16, color: "#475467" }}>
                        {user?.relationships?.company?.business_sector?.name}
                      </Typography>
                    </Stack>
                    {/* <Box sx={{ width: "100%", my: "2rem" }}>
                      <Typography sx={{ fontSize: 13, color: "#4D5761" }}>Profile Completion</Typography>
                      <LinearProgressWithLabel value={80} />
                    </Box> */}
                    <Typography sx={{ fontSize: 16 }} color="primary.main">
                      {approvedConnectionList?.length || 0} Connections
                    </Typography>
                  </CardContent>
                </Card>
                {/* <Paper
                  elevation={3}
                  sx={{ p: 2, boxShadow: " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 8px 48px #EEEEEE" }}
                >
                  <Typography sx={{ fontSize: 16 }} variant="body1" color="primary.main" gutterBottom>
                    Recent Jobs Fitting your profile
                  </Typography>
                  <Stack spacing={2}>
                    {[1, 2].map((item) => (
                      <Box key={item} sx={{ p: 2, backgroundColor: "#F8F9FC" }}>
                        <Typography sx={{ fontSize: 14 }} variant="body1" color="primary.main" gutterBottom>
                          Fashoin Designer
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "#667085" }} gutterBottom>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas eget sodales tempus diam vel,
                          neque molestie et.
                        </Typography>
                        <Stack
                          direction="row"
                          sx={{ mt: 2 }}
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <Button variant="contained">Apply</Button>
                          <Typography sx={{ fontSize: 12, color: "#475467" }}>Posted 2 days ago</Typography>
                        </Stack>
                      </Box>
                    ))}
                    <Button variant="text">View all</Button>
                  </Stack>
                </Paper> */}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Container>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

Page.requireAuth = true

export default Page
