import { ReactElement, useCallback, useState, useEffect, useRef } from "react"
import MessageIcon from "@mui/icons-material/Message"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme, Theme } from "@mui/material/styles"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import CircularProgress from "@mui/material/CircularProgress"
import { useConfirm } from "material-ui-confirm"
import Card from "@mui/material/Card"
import Link from "@mui/material/Link"
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
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
import messagingService from "../../services/messaging"
import useDebounce from "../../hooks/useDebounce"

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
  const confirm = useConfirm()
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
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

  const { data: unApprovedConnectionList } = useSWR(
    "unApprovedConnections",
    connectionService.getUnApprovedUserConnections,
  )
  const { data: approvedConnectionList, isLoading: isApprovedLoading } = useSWR(
    "approvedConnections",
    connectionService.getApprovedUserConnections,
  )

  const debouncedSearch = useDebounce(searchTerm, 1000)

  const { data: usersList } = useSWR(
    debouncedSearch ? `/search/artisans/employers?searchTerm=${debouncedSearch}` : null,
    utilsService.searchUsers,
    {
      keepPreviousData: true,
    },
  )

  const sendConnectionRequest = useCallback(
    (userId: string) => () => {
      router.push(`/profile/${userId}`)
    },
    [],
  )

  //console.log("approved list", approvedConnectionList)

  useEffect(() => {
    if (!searchTerm) {
      setValue(0)
    }
  }, [searchTerm])

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
    (userId: string) => () => {
      confirm({ title: "Reject Connection", description: `Are you sure you want to reject this connection request?` })
        .then(async () => {
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
        })
        .catch(() => {})
    },
    [],
  )

  const unFollowConnection = useCallback(
    (userId: string, userName: string) => () => {
      confirm({ description: `Remove ${userName} as a connection` })
        .then(async () => {
          /* ... */
          try {
            const response = await connectionService.unFollowConnection(userId)
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
        })
        .catch((err: any) => {
          /* ... */
          //console.log("error of prompt", err)
        })
    },
    [],
  )

  // const handleSendMessage = async (userId: string) => {
  //   router.push(`/profile/${userId}`)

  // }

  const { data: conversations } = useSWR("conversations", messagingService.getAllConversations)

  const [open, setOpen] = useState(false)
  const [chatUserId, setChatUserId] = useState("")
  const messageInputRef = useRef()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const hasConversation = (userId: string) => {
    const conversation = conversations?.find((conversation: any) =>
      conversation.relationships.participants.find((participant: any) => participant.id === userId),
    )
    return conversation?.id
  }

  const handleSendMessage = async () => {
    //@ts-ignore
    const defaultMessage: any = messageInputRef.current?.value
    if (!defaultMessage) return
    try {
      const chat = await messagingService.sendMessage("", { receiver_id: chatUserId, message: defaultMessage })
      //console.log("chat", chat)
      //@ts-ignore
      messageInputRef.current.value = ""
      setChatUserId("")
      handleClose()
      router.push("/messaging")
      //console.log("chat", chat)
    } catch (error) {
      //console.log("error", error)
    }
  }

  const handleChat = (userId: string) => {
    const chatId = hasConversation(userId)
    if (chatId) {
      router.push(`/messaging/${chatId}`)
    } else {
      setChatUserId(userId)
      handleClickOpen()
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container disableGutters maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Container disableGutters maxWidth="md">
              <Stack
                sx={{ p: 2 }}
                direction={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Box sx={{ width: "100%" }}>
                  <Tabs
                    TabIndicatorProps={{
                      style: { display: `${value === 2 ? "none" : ""}` },
                    }}
                    value={value}
                    onChange={handleChange}
                    aria-label="secondary tabs example"
                  >
                    <Tab label={`Connections(${approvedConnectionList?.length})`} {...a11yProps(0)} />
                    <Tab label={`Invitations(${unApprovedConnectionList?.length})`} {...a11yProps(1)} />
                    <Tab sx={{ visibility: "hidden" }} disabled label="" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TextField
                  sx={{ width: "100%" }}
                  id="search-connections"
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setValue(2)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="Search for artisans.." edge="end">
                          <SearchIcon sx={{ color: "primary.dark" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Search for artisans.."
                  variant="outlined"
                />
              </Stack>
              <TabPanel value={value} index={0}>
                {approvedConnectionList?.length > 0 ? (
                  <Stack direction="column" spacing={1}>
                    {approvedConnectionList?.map((item: any) => (
                      <Paper
                        key={item.id}
                        elevation={1}
                        sx={{
                          p: 2,
                          boxShadow:
                            " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                          borderRadius: "8px",
                          width: "100%",
                        }}
                      >
                        <Stack direction="row" alignItems={{ xs: "start", md: "center" }} spacing={{ xs: 1, md: 3 }}>
                          <Avatar
                            alt={item.first_name}
                            src={item.company ? item.company?.logo_image?.url : item?.profile_image?.url}
                            sx={{ width: { xs: "48px", md: "100px" }, height: { xs: "48px", md: "100px" } }}
                          />
                          <Stack
                            sx={{ flexGrow: 1 }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems={{ xs: "start" }}
                            spacing={1}
                          >
                            <Stack direction="column" spacing={1}>
                              <Link href={`/profile/${item.id}`} underline="none">
                                <Typography sx={{ fontSize: { xs: 14, md: 16 } }} color="primary.main">
                                  {item.company ? item.company?.name : `${item.first_name}  ${item.last_name}`}
                                </Typography>
                              </Link>

                              <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "#667085" }}>
                                {item.company ? item.company?.business_sector?.name : item.title}
                              </Typography>
                              {/* <Stack sx={{ flexWrap: "wrap", gap: 1 }} direction="row">
                                {item.hobbies?.map((skill: string) => (
                                  <Chip key={skill} size={matches ? "medium" : "small"} label={skill} />
                                ))}
                              </Stack> */}
                            </Stack>
                            <Stack direction="column" alignItems={"flex-end"} spacing={1}>
                              {!matches ? (
                                <IconButton
                                  onClick={unFollowConnection(item.id, `${item.first_name} ${item.last_name}`)}
                                  size="small"
                                  color="error"
                                >
                                  <DeleteForeverIcon color="error" />
                                </IconButton>
                              ) : (
                                <Button
                                  size={matches ? "medium" : "small"}
                                  onClick={unFollowConnection(item.id, `${item.first_name} ${item.last_name}`)}
                                  sx={{ mt: -1 }}
                                  color="error"
                                  variant="outlined"
                                >
                                  Delete
                                </Button>
                              )}
                              {!matches ? (
                                <IconButton onClick={() => handleChat(item.id)} size="small" color="primary">
                                  <MessageIcon />
                                </IconButton>
                              ) : (
                                <Button onClick={() => handleChat(item.id)} variant="contained">
                                  Message
                                </Button>
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                ) : isApprovedLoading ? (
                  <CircularProgress />
                ) : (
                  <Stack sx={{ my: 4 }} alignItems="center" direction="column" spacing={2} justifyContent="center">
                    <NoConnectionIllustartion />
                    <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "#1F204A", mb: 2 }}>
                      You have no connections.
                    </Typography>
                  </Stack>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {unApprovedConnectionList?.length > 0 ? (
                  <Stack direction="column" spacing={1}>
                    {unApprovedConnectionList?.map((item: any) => (
                      <Paper
                        key={item.id}
                        elevation={1}
                        sx={{
                          p: 2,
                          boxShadow:
                            " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                          borderRadius: "8px",
                          width: "100%",
                        }}
                      >
                        <Stack direction="row" alignItems={{ xs: "start", md: "center" }} spacing={{ xs: 1, md: 3 }}>
                          <Avatar
                            alt={item.first_name}
                            src={item.company ? item.company?.logo_image?.url : item.profile_image?.url}
                            sx={{ width: { xs: "48px", md: "100px" }, height: { xs: "48px", md: "100px" } }}
                          />
                          <Stack
                            sx={{ flexGrow: 1 }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems={{ xs: "start" }}
                            spacing={1}
                          >
                            <Stack direction="column" spacing={1}>
                              <Link href={`/profile/${item.id}`} underline="none">
                                <Typography sx={{ fontSize: { xs: 14, md: 16 } }} color="primary.main">
                                  {item.company ? item.company?.name : `${item.first_name}  ${item.last_name}`}
                                </Typography>
                              </Link>

                              <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "#667085" }}>
                                {item.company ? item.company?.business_sector?.name : item.title}
                              </Typography>
                              {/* <Stack sx={{ flexWrap: "wrap", gap: 1 }} direction="row">
                                {item.hobbies?.map((skill: string) => (
                                  <Chip key={skill} size={matches ? "medium" : "small"} label={skill} />
                                ))}
                              </Stack> */}
                            </Stack>
                            <Stack
                              direction="row"
                              justifyItems={"center"}
                              alignItems={"flex-end"}
                              spacing={{ xs: 0, md: 1 }}
                            >
                              {matches ? (
                                <>
                                  <Button onClick={rejectConnectionRequest(item.id)} color="error" variant="outlined">
                                    Reject
                                  </Button>
                                  <Button onClick={acceptConnectionRequest(item.id)} variant="contained">
                                    Accept
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <IconButton onClick={rejectConnectionRequest(item.id)} size="large" color="error">
                                    <CancelIcon fontSize="large" />
                                  </IconButton>
                                  <IconButton onClick={acceptConnectionRequest(item.id)} size="large" color="success">
                                    <CheckCircleIcon fontSize="large" />
                                  </IconButton>
                                </>
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                ) : (
                  <Stack sx={{ my: 4 }} alignItems="center" direction="column" spacing={2} justifyContent="center">
                    <NoInvitationIllustration />
                    <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "#1F204A", mb: 2 }}>
                      You have no invitations.
                    </Typography>
                  </Stack>
                )}
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "#1F204A", mb: 2 }}>
                  Search result for “{searchTerm}”
                </Typography>
                <Stack direction="column" spacing={1}>
                  {usersList?.map((item: any) => (
                    <Paper
                      key={item.id}
                      elevation={1}
                      sx={{
                        p: 2,
                        boxShadow:
                          " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    >
                      <Stack direction="row" alignItems={{ xs: "start", md: "center" }} spacing={{ xs: 1, md: 3 }}>
                        {/* <Avatar
                          alt={item.first_name}
                          src={item.relationships?.profile_image?.url}
                          sx={{ width: { xs: "48px", md: "100px" }, height: { xs: "48px", md: "100px" } }}
                        />
                        <Stack
                          sx={{ flexGrow: 1 }}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={1}
                        >
                          <Stack direction="column" spacing={1}>
                            <Typography sx={{ fontSize: { xs: 14, md: 16 } }} color="primary.main">
                              {item.first_name} {item.middle_name} {item.last_name}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "#667085" }}>
                              {item.title}
                            </Typography>
                            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                              {item.relationships.skills.map((skill: any) => (
                                <Chip key={skill.id} size={matches ? "medium" : "small"} label={skill.name} />
                              ))}
                            </Stack>
                          </Stack> */}
                        <Avatar
                          alt={item.first_name}
                          src={
                            item.relationships?.company
                              ? item.relationships?.company?.logo_image?.url
                              : item.relationships?.profile_image?.url
                          }
                          sx={{ width: { xs: "48px", md: "100px" }, height: { xs: "48px", md: "100px" } }}
                        />
                        <Stack
                          sx={{ flexGrow: 1 }}
                          direction="row"
                          justifyContent="space-between"
                          alignItems={{ xs: "start" }}
                          spacing={1}
                        >
                          <Stack direction="column" spacing={1}>
                            <Link href={`/profile/${item.id}`} underline="none">
                              <Typography sx={{ fontSize: { xs: 14, md: 16 } }} color="primary.main">
                                {item.relationships?.company
                                  ? item.relationships.company?.name
                                  : `${item.first_name}  ${item.last_name}`}
                              </Typography>
                            </Link>

                            <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "#667085" }}>
                              {item.relationships?.company
                                ? item.relationships.company?.business_sector?.name
                                : item.title}
                            </Typography>
                            {/* <Stack sx={{ flexWrap: "wrap", gap: 1 }} direction="row">
                                {item.hobbies?.map((skill: string) => (
                                  <Chip key={skill} size={matches ? "medium" : "small"} label={skill} />
                                ))}
                              </Stack> */}
                          </Stack>
                          <Stack direction="column" alignItems={"flex-end"} spacing={1}>
                            {!matches ? (
                              <IconButton onClick={sendConnectionRequest(item.id)} color="primary" aria-label="options">
                                <PersonAddAlt1Icon />
                              </IconButton>
                            ) : (
                              <Button
                                size={matches ? "medium" : "small"}
                                onClick={sendConnectionRequest(item.id)}
                                variant="contained"
                              >
                                View
                              </Button>
                            )}
                          </Stack>
                        </Stack>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </TabPanel>
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
                        src={user?.relationships?.company?.logo_image?.url}
                      />
                      <Typography sx={{ fontSize: 16 }} color="primary.main">
                        {user?.relationships?.company?.name}
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
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

Page.requireAuth = true

export default Page
