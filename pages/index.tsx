import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useAuth } from "../store"

export default function Home() {
  const removeUser = useAuth((state: any) => state.removeUser)
  const user = useAuth((state: any) => state.user)
  return (
    <div style={{ padding: "4rem" }}>
      <Typography>{user.email}</Typography>
      <Typography>
        {user.first_name} {user.last_name}
      </Typography>
      <Typography>{user.phone_number}</Typography>
      <Button
        onClick={() => {
          localStorage.clear()
          removeUser()
        }}
        variant="contained"
      >
        Log out
      </Button>
    </div>
  )
}

Home.requireAuth = true
