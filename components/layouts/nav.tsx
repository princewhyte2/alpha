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
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import Typography from "@mui/material/Typography"
import Collapse from "@mui/material/Collapse"
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

const drawerWidth = 240
const profileNav = [
  {
    name: "Profile Information",
    route: "/artisan/profile/information",
  },
  {
    name: "My Work",
    route: "/artisan/profile/mywork",
  },
  {
    name: "Password & Security",
    route: "/artisan/profile/security",
  },
  {
    name: "Referral",
    route: "/artisan/profile/referral",
  },
]

const mainNav = [
  {
    name: "Your Feed",
    route: "/artisan/feed",
  },
  {
    name: "Connection",
    route: "/artisan/connection",
  },
  {
    name: "Jobs",
    route: "/artisan/jobs",
  },
  {
    name: "Messaging",
    route: "/messaging",
  },
  {
    name: "Profile",
    route: "/artisan/profile/information",
  },
]

export default function NavLayout(props: Props) {
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const { window, children } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const router = useRouter()
  const [open, setOpen] = React.useState(true)

  const handleClick = React.useCallback(() => {
    setOpen(!open)
  }, [open])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const goToProfile = React.useCallback(() => {
    router.push("/artisan/profile/information")
  }, [])

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", color: "primary.dark" }}>
      {/* <Typography variant="h6" sx={{ mx: 1, my: 1 }}>
        Profile
      </Typography> */}
      {/* <Link href="/artisan/feed" underline="none">
        <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
          <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
        </Box>
      </Link>
      <Divider />
      <List>
        <ListItem>
         
          <Button sx={{ width: "100%" }} variant="contained">
            Sign up
          </Button>
        </ListItem>
        <ListItem>
      
          <Button sx={{ width: "100%" }} variant="text">
            Login
          </Button>
        </ListItem>
      </List> */}
      <List>
        {mainNav.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={(e) => {
                if (item.name === "Profile") {
                  e.stopPropagation()
                  handleClick()
                } else {
                  router.push(item.route)
                }
              }}
              sx={{ textAlign: "left", color: "primary.dark" }}
            >
              <ListItemText
                sx={{ borderBottom: router.pathname !== item.route ? "none" : "4px solid #3E4095" }}
                primary={item.name}
              />
              {item.name !== "Profile" ? null : open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
        ))}
        <Collapse in={open} timeout="auto" unmountOnExit>
          {profileNav.map((item) => (
            <List key={item.name} component="div" disablePadding>
              <ListItemButton onClick={() => router.push(item.route)} sx={{ pl: 4 }}>
                <ListItemText
                  sx={{ borderBottom: router.pathname !== item.route ? "none" : "4px solid #3E4095" }}
                  primary={item.name}
                />
              </ListItemButton>
            </List>
          ))}
        </Collapse>
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ bgcolor: "white" }} color="transparent" component="nav">
        <Toolbar sx={{ display: { xs: "flex" }, justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuLine />
          </IconButton>
          <Link href="/artisan/feed" underline="none">
            <Box sx={{ height: { xs: "1.5rem", sm: "3.2rem" }, width: { xs: "1.7rem", sm: "3.2rem" } }}>
              <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
            </Box>
          </Link>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {mainNav.map((item) => (
              <Button key={item.name} onClick={() => router.push(item.route)} variant="text">
                {item.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "block", sm: "block" } }}>
            {/* <Button variant="text">Login</Button>
            <Button variant="contained">Sign up</Button> */}
            <IconButton
              size="large"
              sx={{ color: "primary.main" }}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <NotificationsIcon />
              {/* <Badge badgeContent={17} color="error">
              </Badge> */}
            </IconButton>
            <IconButton onClick={goToProfile}>
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt={`${user?.first_name} ${user?.last_name}`}
                src={user?.relationships.profile_image?.url}
              />
            </IconButton>
          </Box>
        </Toolbar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </AppBar>

      <Box component="main" sx={{ p: { xs: 0, md: 3 }, width: "100%" }}>
        <Toolbar />
        <Grid container spacing={2}>
          {/* <Grid sx={{ display: { xs: "none", md: "grid" } }} item sm={2}>
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
          </Grid> */}
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
