import { ReactElement, useState } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme, Theme } from "@mui/material/styles"
import MyWorkIllustration from "../../components/icons/MyWorkIllustration"

function Page() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  const [isAddNewProject, setIsAddNewProject] = useState(false)

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "400px",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    px: { xs: 2, md: 4 },
    pb: 4,
    pt: 3,
  }

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
        <Button onClick={() => setIsAddNewProject(true)} variant="text" startIcon={<AddIcon />}>
          Add Project
        </Button>
      </Stack>
      <Stack sx={{ py: "4rem" }} direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <MyWorkIllustration />
        <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
          No Project Added
        </Typography>
      </Stack>
      <Modal
        open={isAddNewProject}
        onClose={() => setIsAddNewProject(false)}
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
      >
        {false ? (
          <Box sx={style}>
            <Stack sx={{ position: "relative" }} direction="row" justifyContent="space-between" alignItems="center">
              <Typography id="project-modal-title" variant="h6" component="h2">
                Add New Work
              </Typography>
              <IconButton
                onClick={() => setIsAddNewProject(false)}
                size="small"
                sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "15px", right: "-15px" }}
                aria-label="close project modal"
              >
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>

            <TextField
              fullWidth
              id="profile-Project"
              label="Project Title*"
              placeholder="Project Title"
              variant="outlined"
              sx={{ my: "1rem" }}
            />
            <TextField
              fullWidth
              id="profile-Description"
              label="Project Description"
              placeholder="Project Title"
              variant="outlined"
              multiline
              rows={4}
            />
            <Button sx={{ mt: "1rem" }} variant="text" startIcon={<AddIcon />}>
              Add Work/Project Image(s)
            </Button>
            <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
              <Button fullWidth sx={{ px: 6 }} variant="contained">
                Save
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box sx={style}>
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={() => setIsAddNewProject(false)}
                size="small"
                sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "-15px", right: "-15px" }}
                aria-label="close project modal"
              >
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
            <Stack sx={{ py: "2rem" }} direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <MyWorkIllustration />
              <Typography variant="body1" sx={{ my: 1, color: "primary.main" }}>
                A new project titled “Project title” has been successfully added
              </Typography>
            </Stack>
          </Box>
        )}
      </Modal>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page
