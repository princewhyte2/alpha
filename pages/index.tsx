import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"

export default function Home() {
  return (
    <div>
      <Link href="/auth/login" underline="none">
        <Typography sx={{ color: "#1B1B1B", fontSize: { xs: "0.815rem" } }}>Login</Typography>
      </Link>
    </div>
  )
}
