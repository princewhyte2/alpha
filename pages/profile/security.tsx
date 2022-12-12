import type { ReactElement } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import SecurityIcon from "@mui/icons-material/Security"
import PhoneIcon from "@mui/icons-material/Phone"
import MailIcon from "@mui/icons-material/Mail"

const navItems = [
  { icon: <LockOpenIcon color="primary" />, name: "Change Password" },
  { icon: <MailIcon color="primary" />, name: "Change Email Address" },
  { icon: <PhoneIcon color="primary" />, name: "Change Phone Number" },
  { icon: <SecurityIcon color="primary" />, name: "Generate Security Question" },
]

function Page() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        Password & Security
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "left", color: "primary.dark" }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText color="primary.dark" primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page
