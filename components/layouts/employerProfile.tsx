import * as React from "react"
import Link from "@mui/material/Link"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import useSWR from "swr"
// import Badge from "@mui/material/Badge"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Avatar from "@mui/material/Avatar"
import MenuLine from "../icons/MenuLine"
import { useRouter } from "next/router"
import profileServices from "../../services/profile"
import Button from "@mui/material/Button"

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode
  window?: () => Window
}

const navItems = [
  {
    name: "Business Information",
    route: "/employer/profile/information",
  },
  {
    name: "Password & Security",
    route: "/employer/profile/security",
  },
]

export default function EmployerProfileLayout(props: Props) {
  const { children } = props
  const router = useRouter()

  return (
    <Grid container sx={{ pt: 2 }} spacing={2}>
      <Grid sx={{ display: { xs: "none", md: "grid" } }} item sm={2}>
        <Box
          sx={{
            width: "100%",
            height: "fit-content",
            borderRight: "1px solid #3E4095",
            color: "primary.dark",
            px: 1,
          }}
        >
          <Typography variant="h5" sx={{ my: 1 }}>
            Profile
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "left",
                    color: "primary.dark",
                    borderLeft: router.pathname !== item.route ? "none" : "4px solid #3E4095",
                  }}
                  onClick={() => router.push(item.route)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={12} md={10}>
        {children}
      </Grid>
    </Grid>
  )
}
