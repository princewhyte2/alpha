import type { ReactElement } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import ProfileLayout from "../../components/layouts/profile"

function Page() {
  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h6" sx={{ my: 1 }}>
        Profile
      </Typography>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page
