import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import SendIcon from "@mui/icons-material/Send"
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
import ProfileLayout from "../components/layouts/profile"
import { ReactElement } from "react"
import NavLayout from "../components/layouts/nav"

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
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, height: "calc(100vh - 10px)", pt: 2 }}>
        <Grid sx={{ height: "100%" }} container spacing={2}>
          <Grid item xs={4}>
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
              <Stack sx={{ maxHeight: "calc(100% - 40px )", overflowY: "auto" }}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Stack
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
                          Darlene Black
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
          <Grid item xs={8}>
            <Paper
              sx={{
                height: "100%",
                background: "#FFFFFF",
                filter:
                  "drop-shadow(0px 0px 1px rgba(66, 71, 76, 0.32)) drop-shadow(0px 4px 8px rgba(66, 71, 76, 0.06)) drop-shadow(0px 8px 48px #EEEEEE)",
              }}
            >
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
                <Box sx={{ p: 2, flexGrow: 1 }}>
                  <Divider>yesterday, 29 aug</Divider>
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
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

Messaging.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

export default Messaging
