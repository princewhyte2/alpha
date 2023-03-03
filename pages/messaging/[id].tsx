import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import SendIcon from "@mui/icons-material/Send"
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
import { ReactElement, useEffect, useRef } from "react"
import NavLayout from "../../components/layouts/nav"
import Chip from "@mui/material/Chip"
import ChatLayout from "../../components/layouts/chat"
import messagingService from "../../services/messaging"

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

const Messaging = () => {
  const scrollToBottomRef = useRef<HTMLDivElement | null>(null)
  //   const { data: conversations } = useSWR("conversations", messagingService.getAllConversations)
  //   console.log("conversations", conversations)

  const scrollToBottom = () => {
    if (!scrollToBottomRef.current) return
    scrollToBottomRef.current.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <Stack direction="column" sx={{ height: "100%" }}>
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
        <TextField fullWidth placeholder="Write your message" id="standard-multiline-flexible" multiline maxRows={2} />
        <IconButton aria-label="delete">
          <AttachmentIcon />
        </IconButton>
        <IconButton aria-label="delete" color="primary">
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

export default Messaging
