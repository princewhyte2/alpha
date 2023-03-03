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
  const { data: conversations } = useSWR("conversations", messagingService.getAllConversations)
  console.log("conversations", conversations)
  const isNotDefault = router.query?.id

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, pt: 2 }}>
        <Grid container spacing={2}>
          {!isNotDefault || matches ? (
            <Grid item xs={12} md={4} sx={{ height: "calc(100vh - 84px)" }}>
              <Paper
                sx={{
                  height: "100%",
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
                  <Typography sx={{ fontSize: 20 }} color="primary.dark">
                    Message
                  </Typography>
                  <IconButton aria-label="edit">
                    <BorderColorIcon />
                  </IconButton>
                </Stack>
                <Stack direction="column" sx={{ height: "calc(100% - 74px)", overflowY: "auto" }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <Stack
                      onClick={() => router.push(`messaging/${item}`)}
                      key={item}
                      direction="row"
                      alignItems={"center"}
                      spacing={2}
                      sx={{ p: 2, borderBottom: "1px solid #F4F4F4" }}
                    >
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                      >
                        <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </StyledBadge>
                      <Stack
                        sx={{ flexGrow: 1 }}
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Stack direction="column" spacing={1}>
                          <Typography sx={{ fontSize: 14 }} color="primary.dark">
                            Darlene Black {item}
                          </Typography>
                          <Typography sx={{ fontSize: 10 }} color="primary.dark">
                            Hey, how is your project?
                          </Typography>
                        </Stack>
                        <Stack direction="column" alignItems={"flex-end"} spacing={1}>
                          <IconButton size="small" aria-label="options">
                            <MoreHorizIcon />
                          </IconButton>
                          <Typography sx={{ fontSize: 10 }} color="primary.dark">
                            04:00PM
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ) : null}
          {isNotDefault || matches ? (
            <Grid item xs={12} md={8} sx={{ height: "calc(100vh - 84px)" }}>
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
