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
// import Badge from "@mui/material/Badge"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Avatar from "@mui/material/Avatar"
import MenuLine from "../icons/MenuLine"

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode
  window?: () => Window
}

const drawerWidth = 240
const navItems = ["Profile Information", "My Work", "Password & Security", "Referral"]

export default function ProfileLayout(props: Props) {
  const { window, children } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", color: "primary.dark" }}>
      <Typography variant="h6" sx={{ mx: 1, my: 1 }}>
        Profile
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "left", color: "primary.dark" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
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
          <Link href="/" underline="none">
            <Box sx={{ height: { xs: "1.5rem", sm: "3.2rem" }, width: { xs: "1.7rem", sm: "3.2rem" } }}>
              <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
            </Box>
          </Link>
          <Box sx={{ display: { xs: "block", sm: "block" } }}>
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
            <IconButton>
              <Avatar sx={{ bgcolor: "primary.main" }} alt="Remy Sharp" src="/broken-image.jpg" />
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
                  <ListItem key={item} disablePadding>
                    <ListItemButton
                      sx={{
                        textAlign: "left",
                        color: "primary.dark",
                        borderLeft: item !== "Profile Information" ? "none" : "4px solid #3E4095",
                      }}
                    >
                      <ListItemText primary={item} />
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
      </Box>
    </Box>
  )
}
