import type { ReactElement } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import MyWorkIllustration from "../../components/icons/MyWorkIllustration"

function Page() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        My Work
      </Typography>
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="body1" sx={{ my: 1, color: "primary.dark", textAlign: "center" }}>
          You can add projects you have worked on here. This can help boast your profile
        </Typography>
        <Button variant="text" startIcon={<AddIcon />}>
          Add Project
        </Button>
      </Stack>
      <Stack sx={{ py: "4rem" }} direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <MyWorkIllustration />
        <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
          No Project Added
        </Typography>
      </Stack>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page
