import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import SendIcon from "@mui/icons-material/Send"
import useSWR, { useSWRConfig } from "swr"
import IconButton from "@mui/material/IconButton"
import { useTheme, Theme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import CircularProgress from "@mui/material/CircularProgress"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Avatar from "@mui/material/Avatar"
import TextField from "@mui/material/TextField"
import AttachmentIcon from "@mui/icons-material/Attachment"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { styled } from "@mui/material/styles"
import Badge from "@mui/material/Badge"
import { ReactElement, useEffect, useRef } from "react"
import Chip from "@mui/material/Chip"
import messagingService from "../../services/messaging"
import { useRouter } from "next/router"
import profileServices from "../../services/profile"
import NoConnectionIllustartion from "../icons/NoConnectionIllustration"

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}))

const ChatLayout = ({ children }: any) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const router = useRouter()
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const { data: conversations, isLoading: isConversationsLoading } = useSWR(
    "conversations",
    messagingService.getAllConversations,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const isNotDefault = router.query?.id

  const handleGoToConnections = () => {
    router.push(`/${user.user_type}/connection`)
  }

  // console.log("conversations", conversations)

  return (
    <Container disableGutters={matches ? false : true} maxWidth="xl">
      <Box sx={{ flexGrow: 1, pt: { xs: 1, md: 2 } }}>
        <Grid container spacing={2}>
          {!isNotDefault || matches ? (
            <Grid item xs={12} md={4} sx={{ height: "calc(100vh - 84px)" }}>
              <Paper
                sx={{
                  height: "100%",
                  width: "100%",
                  background: "#FFFFFF",
                  filter:
                    "drop-shadow(0px 0px 1px rgba(66, 71, 76, 0.32)) drop-shadow(0px 4px 8px rgba(66, 71, 76, 0.06)) drop-shadow(0px 8px 48px #EEEEEE)",
                }}
              >
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent="space-between"
                  sx={{ p: 2, borderBottom: "1px solid #F4F4F4" }}
                >
                  <IconButton
                    sx={{ display: { xs: "inline-block", md: "none" } }}
                    onClick={() => router.back()}
                    color="primary"
                    aria-label="back button"
                  >
                    <KeyboardBackspaceIcon />
                  </IconButton>
                  <Typography sx={{ fontSize: 20 }} color="primary.dark">
                    Message
                  </Typography>
                  <IconButton onClick={handleGoToConnections} aria-label="edit">
                    <BorderColorIcon />
                  </IconButton>
                </Stack>
                <Stack direction="column" sx={{ height: "calc(100% - 74px)", overflowY: "auto" }}>
                  {conversations?.length > 0 ? (
                    conversations?.map((item: any) => {
                      const receipient = item.relationships.participants.find(
                        (participant: any) => participant.id !== user?.id,
                      )
                      return (
                        <Box key={item.id} sx={{ width: "100%" }}>
                          <Stack
                            onClick={() => router.push(`/messaging/${item.id}`)}
                            key={item.id}
                            direction="row"
                            alignItems={"center"}
                            spacing={2}
                            sx={{ p: 2, borderBottom: "1px solid #F4F4F4" }}
                          >
                            {/* <StyledBadge
                              overlap="circular"
                              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                              variant="dot"
                            > */}
                            <Avatar
                              sx={{ width: 56, height: 56 }}
                              alt={receipient.first_name}
                              src={
                                receipient.company ? receipient.company?.logo_image?.url : receipient.profile_image?.url
                              }
                            />
                            {/* </StyledBadge> */}
                            <Stack
                              sx={{ flexGrow: 1 }}
                              direction="row"
                              alignItems={"center"}
                              // justifyContent="space-between"
                              spacing={2}
                            >
                              <Box sx={{ width: "100%", overflow: "hidden" }}>
                                <Typography noWrap sx={{ fontSize: 14 }} color="primary.dark">
                                  {receipient.company
                                    ? `${receipient.company?.name}`
                                    : `${receipient.first_name} ${receipient.last_name}`}
                                </Typography>
                                <Typography className="textTwoLines" sx={{ fontSize: 10 }} color="primary.dark">
                                  {item.relationships?.last_message?.body}
                                </Typography>
                              </Box>
                              <Stack direction="column" alignItems={"flex-end"} spacing={1}>
                                <IconButton size="small" aria-label="options">
                                  <MoreHorizIcon />
                                </IconButton>
                                {/* <Typography sx={{ fontSize: 10 }} color="primary.dark">
                            04:00PM
                          </Typography> */}
                              </Stack>
                            </Stack>
                          </Stack>
                        </Box>
                      )
                    })
                  ) : isConversationsLoading ? (
                    <CircularProgress />
                  ) : (
                    <Stack direction="column" justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }}>
                      <NoConnectionIllustartion />
                      <Typography sx={{ fontSize: 13, color: "#4D5761", my: 2 }}>
                        You currently have no conversations.
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: "#4D5761", my: 2 }}>
                        Make connections and start a conversation.
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ) : null}
          {isNotDefault || matches ? (
            <Grid item xs={12} md={8} sx={{ height: { xs: "calc(100vh - 54px)", md: "calc(100vh - 84px)" } }}>
              <Paper
                sx={{
                  height: "100%",
                  background: "#FFFFFF",
                  filter:
                    "drop-shadow(0px 0px 1px rgba(66, 71, 76, 0.32)) drop-shadow(0px 4px 8px rgba(66, 71, 76, 0.06)) drop-shadow(0px 8px 48px #EEEEEE)",
                }}
              >
                {children}
                {/* <Stack direction="column" sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent="space-between"
                  sx={{ p: 2, borderBottom: "1px solid #F4F4F4" }}
                >
                  <Typography sx={{ fontSize: 16 }} color="primary.dark">
                    Mary Rurpet
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="primary.dark">
                    last online: 4 hours ago
                  </Typography>
                </Stack>
                <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
                  <Stack direction="column" spacing={2}>
                    <Divider sx={{ color: "#1F204A" }}>yesterday, 29 aug</Divider>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
                      <Stack key={item} direction={"row"} justifyContent={item % 2 === 0 ? "flex-start" : "flex-end"}>
                        <Chip
                          sx={{
                            color: item % 2 === 0 ? "#FFFFFF" : "#1F204A",
                            background: item % 2 === 0 ? "#3E4095" : "#F2F4F7",
                          }}
                          label="Chip Filled"
                        />
                      </Stack>
                    ))}
                  </Stack>
                  <div style={{ float: "left", clear: "both" }} ref={scrollToBottomRef}></div>
                </Box>
                <Stack direction="row" spacing={2} alignItems={"center"} sx={{ p: 2, background: "#F9FAFB" }}>
                  <TextField
                    fullWidth
                    placeholder="Write your message"
                    id="standard-multiline-flexible"
                    multiline
                    maxRows={2}
                  />
                  <IconButton aria-label="delete">
                    <AttachmentIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="primary">
                    <SendIcon />
                  </IconButton>
                </Stack>
              </Stack> */}
              </Paper>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    </Container>
  )
}

export default ChatLayout
