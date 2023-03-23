import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import SendIcon from "@mui/icons-material/Send"
import Pusher from "pusher-js"
import useSWR, { useSWRConfig } from "swr"
import IconButton from "@mui/material/IconButton"
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
import { ReactElement, useEffect, useMemo, useRef } from "react"
import NavLayout from "../../components/layouts/nav"
import Chip from "@mui/material/Chip"
import ChatLayout from "../../components/layouts/chat"
import messagingService from "../../services/messaging"
import { useRouter } from "next/router"
import profileServices from "../../services/profile"
import Cookies from "js-cookie"
import notificationsServices from "../../services/notifications"

const pusher_key = process?.env?.NEXT_PUBLIC_PUSHER_APP_KEY ?? ""
const broadcast_endpoint = process.env?.NEXT_PUBLIC_BACKEND_BROADCAST_URL ?? ""

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

// Pusher.logToConsole = true

const Messaging = () => {
  const { mutate } = useSWRConfig()
  const router = useRouter()
  const scrollToBottomRef = useRef<HTMLDivElement | null>(null)
  const messageInputRef = useRef<HTMLInputElement>()
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const { data: conversations } = useSWR("conversations", messagingService.getAllConversations, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  // const active = conversations?.find((item: any) => item?.id === router.query?.id)
  const activeConversationParticipant = useMemo(() => {
    const chat: any = conversations?.find((item: any) => item?.id == router.query?.id)
    const participant = chat?.relationships.participants.find((participant: any) => participant.id !== user?.id)
    return participant
  }, [router.query?.id, conversations, user])
  const { data: conversation } = useSWR(
    router.query?.id ? `/conversations/${router.query?.id}` : null,
    messagingService.getConversationsById,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  // const { data: messages } = useSWR(
  //   router.query?.id ? `/messages/${router.query?.id}` : null,
  //   messagingService.getMessageById,
  //   {
  //     revalidateIfStale: false,
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //   },
  // )

  const scrollToBottom = () => {
    if (!scrollToBottomRef.current) return
    scrollToBottomRef.current.scrollIntoView()
  }

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom()
    }, 3000)
  }, [])

  useEffect(() => {
    try {
      if (router.query?.id) {
        const token = Cookies.get("access_token")

        const pusher = new Pusher(pusher_key, {
          cluster: "eu",
          channelAuthorization: {
            endpoint: broadcast_endpoint,
            transport: "ajax",
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        })
        const channel = pusher.subscribe(`private-chat-conversation-${router.query?.id}`)
        channel.bind("message_sent_event", (data: any) => {
          // alert(data);
          if (data?.sender?.id === user?.id) {
            return
          }

          mutate(`/conversations/${router.query?.id}`)
          mutate("conversations")
          setTimeout(() => {
            scrollToBottom()
          }, 3000)
        })
      }
    } catch (error) {
      console.log({ error })
      console.log({ message: router.query?.id })
    }
  }, [router?.query?.id, conversation, user, scrollToBottomRef])

  const handleSendMessage = async () => {
    const chatMessage = messageInputRef.current?.value
    if (!chatMessage) return

    try {
      await messagingService.sendMessage(router.query.id as string, {
        receiver_id: activeConversationParticipant?.id,
        message: chatMessage,
      })
      mutate(`/conversations/${router.query?.id}`)
      mutate("conversations")
      setTimeout(() => {
        scrollToBottom()
      }, 3000)
      //@ts-ignore
      messageInputRef.current.value = ""
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack direction="column" sx={{ height: "100%" }}>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ p: 2, borderBottom: "1px solid #F4F4F4" }}
      >
        <Typography sx={{ fontSize: 16 }} color="primary.dark">
          {activeConversationParticipant?.first_name} {activeConversationParticipant?.last_name}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="primary.dark">
          {/* last online: 4 hours ago removed*/}
        </Typography>
      </Stack>
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        // ref={scrollToBottomRef}
      >
        <Stack sx={{ overflowY: "auto" }} direction="column" spacing={2}>
          {/* <Divider sx={{ color: "#1F204A" }}>yesterday, 29 aug</Divider> */}
          {conversation?.map((item: any) => {
            return (
              <Stack
                key={item.id}
                direction={"row"}
                justifyContent={item.relationships?.sender?.id !== user?.id ? "flex-start" : "flex-end"}
              >
                <Chip
                  sx={{
                    color: item.relationships?.sender?.id !== user?.id ? "#FFFFFF" : "#1F204A",
                    background: item.relationships?.sender?.id !== user?.id ? "#3E4095" : "#F2F4F7",
                    height: "100%",
                    p: 1,
                    maxWidth: "70%",
                  }}
                  label={
                    <Typography
                      sx={{
                        whiteSpace: "normal",
                        fontSize: { xs: 13, md: 14 },
                        fontWeight: 400,
                      }}
                    >
                      {item.attributes.message}
                    </Typography>
                  }
                />
              </Stack>
            )
          })}
          <div style={{ float: "left", clear: "both", height: "60px" }} ref={scrollToBottomRef}></div>
        </Stack>
      </Box>
      <Stack direction="row" spacing={2} alignItems={"center"} sx={{ p: 2, background: "#F9FAFB" }}>
        <TextField
          inputRef={messageInputRef}
          fullWidth
          placeholder="Write your message"
          id="standard-multiline-flexible"
          multiline
          maxRows={2}
        />
        <IconButton aria-label="delete">
          <AttachmentIcon />
        </IconButton>
        <IconButton onClick={handleSendMessage} aria-label="delete" color="primary">
          <SendIcon />
        </IconButton>
      </Stack>
    </Stack>
  )
}

Messaging.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout>
      <ChatLayout>{page}</ChatLayout>
    </NavLayout>
  )
}

Messaging.requireAuth = true

export default Messaging
