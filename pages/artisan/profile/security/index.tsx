import type { ReactElement } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../../../components/layouts/profile"
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
import { useRouter } from "next/router"
import NavLayout from "../../../../components/layouts/nav"

const navItems = [
  {
    icon: <LockOpenIcon color="primary" />,
    name: "Change Password",
    route: "/artisan/profile/security/change-password",
  },
  { icon: <MailIcon color="primary" />, name: "Change Email Address", route: "/artisan/profile/security/change-email" },
  { icon: <PhoneIcon color="primary" />, name: "Change Phone Number", route: "/artisan/profile/security/change-phone" },
  {
    icon: <SecurityIcon color="primary" />,
    name: "Generate Security Question",
    route: "/artisan/profile/security/question",
  },
]

function Page() {
  const router = useRouter()
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        Password & Security
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={() => router.push(item.route)} sx={{ textAlign: "left", color: "primary.dark" }}>
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
  return (
    <NavLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </NavLayout>
  )
}

Page.requireAuth = true

export default Page
