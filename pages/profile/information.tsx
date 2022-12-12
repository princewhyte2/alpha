import type { ReactElement } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Chip from "@mui/material/Chip"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Avatar from "@mui/material/Avatar"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import Stack from "@mui/material/Stack"
import AddIcon from "@mui/icons-material/Add"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import ProfileLayout from "../../components/layouts/profile"

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", maxWidth: "440px" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress sx={{ borderRadius: 5, height: 10 }} variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}
function Page() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        Profile Information
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {matches && (
            <Grid item md={2}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <IconButton sx={{ bgcolor: "primary.main" }} aria-label="add an alarm">
                    <PhotoCameraIcon sx={{ color: "white" }} />
                  </IconButton>
                }
              >
                <Avatar
                  sx={{ width: "140px", height: "140px" }}
                  alt="Travis Howard"
                  src="/static/images/avatar/2.jpg"
                />
              </Badge>
            </Grid>
          )}
          <Grid item xs={12} md={10}>
            <Stack direction="row" spacing={4}>
              {!matches && (
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <IconButton size="small" sx={{ bgcolor: "primary.main" }} aria-label="add an alarm">
                      <PhotoCameraIcon fontSize="small" sx={{ color: "white" }} />
                    </IconButton>
                  }
                >
                  <Avatar
                    sx={{ width: "64px", height: "64px" }}
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </Badge>
              )}
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ color: "#4D5761" }} variant="body1" gutterBottom>
                  Profile Completion
                </Typography>
                <LinearProgressWithLabel value={80} />
              </Box>
            </Stack>

            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box
                sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, pb: "1rem", borderBottom: "1px dashed #3E4095" }}
              >
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Personal Information
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="text" startIcon={<BorderColorIcon />}>
                      Edit
                    </Button>
                  </Grid>
                </Grid>
                <Typography sx={{ color: "primary.dark", mt: "1.5rem" }} variant="body1">
                  Title
                </Typography>
                <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                  Fashoin Designer
                </Typography>
              </Box>
              <Box
                sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, py: "1rem", borderBottom: "1px dashed #3E4095" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      First Name
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      Olakunle
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Middle Name
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      Babatunde
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Last Name
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      Babatunde
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, py: "1rem", borderBottom: "1px dashed #3E4095" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Date of Birth
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      01/01/1970
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Gender
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      Male
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Email
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      babakunle@gmail.com
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, py: "1rem", borderBottom: "1px dashed #3E4095" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Phone Number
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      07012345678
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Other Phone
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      07023456789
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, py: "1rem", borderBottom: "1px dashed #3E4095" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Country
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      Nigeria
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      State
                    </Typography>
                    <Typography sx={{ color: "primary.dark", mt: "1rem" }} variant="h6">
                      Lagos
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", pb: "1rem" }}>
                <Grid
                  sx={{ px: { xs: "1rem", md: "3rem" } }}
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Your Occupations and Skills
                    </Typography>
                  </Grid>
                  <Grid item direction="row" justifyContent="flex-end" alignItems="center">
                    {matches ? (
                      <Button variant="text" startIcon={<AddIcon />}>
                        Add Occupation & Skills
                      </Button>
                    ) : (
                      <IconButton aria-label="add an alarm">
                        <AddIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {[1, 2].map((item) => (
                  <Box
                    sx={{
                      width: "100%",
                      borderBottom: { xs: "1px dashed #3E4095", md: "none" },
                      px: { xs: "1rem", md: "3rem" },
                    }}
                  >
                    <Grid
                      key={item}
                      sx={{
                        py: "1.5rem",

                        position: "relative",
                      }}
                      container
                      spacing={2}
                    >
                      <Grid item xs={12} md={4}>
                        <Typography sx={{ color: "primary.dark", mb: 1 }} variant="body1">
                          Occupation
                        </Typography>
                        <Stack alignItems="flex-end" direction="row" spacing={1}>
                          <Chip label="Fashion" />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Skills
                        </Typography>
                        <Stack alignItems="flex-end" direction="row" spacing={1}>
                          <Stack direction="row" spacing={1}>
                            <Chip label="Tailor" />
                            <Chip label="Embroidery" />
                            <Chip label="Monogram" />
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ position: { xs: "absolute", md: "relative" }, top: 0, bottom: 0, right: 0 }}
                          >
                            <IconButton color="secondary" aria-label="add an alarm">
                              <BorderColorIcon />
                            </IconButton>
                            <IconButton color="secondary" aria-label="add an alarm">
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, pb: "1rem" }}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Educational Qualification
                    </Typography>
                  </Grid>
                  <Grid item>
                    {matches ? (
                      <Button variant="text" startIcon={<AddIcon />}>
                        Add Educational Qualification
                      </Button>
                    ) : (
                      <IconButton aria-label="add an alarm">
                        <AddIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {[1].map((item) => (
                  <Grid key={item} sx={{ pt: "1.5rem", position: "relative" }} container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        Degree
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Institution Name
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={8}>
                      <Stack mt={0} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          May 2018
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ position: { xs: "absolute", md: "relative" }, top: 0, bottom: 0, right: 0 }}
                        >
                          <IconButton color="secondary" aria-label="add an alarm">
                            <BorderColorIcon />
                          </IconButton>
                          <IconButton color="secondary" aria-label="add an alarm">
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" }, pb: "1rem" }}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Work History
                    </Typography>
                  </Grid>
                  <Grid item>
                    {matches ? (
                      <Button variant="text" startIcon={<AddIcon />}>
                        Add Work History
                      </Button>
                    ) : (
                      <IconButton aria-label="add an alarm">
                        <AddIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {[1].map((item) => (
                  <Grid key={item} sx={{ pt: "1.5rem" }} container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        Company Name
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Job Title
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack mt={1} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          May 2020 - June 2022
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack mt={0} alignItems="center" direction="row" spacing={1}>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Habitant arcu elit odio pellentesque sapien vitae turpis enim vulputate. Vitae viverra nec
                          diam vitae tortor. Sagittis blandit quis platea penatibus et.
                        </Typography>

                        <IconButton color="secondary" aria-label="add an alarm">
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="add an alarm">
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
            <Box sx={{ py: "1.5rem", bgcolor: "#F8F9FC", mt: "1.5rem", borderRadius: "0.5rem" }}>
              <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography sx={{ color: "primary.dark" }} variant="body1">
                      Hobbies
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="text" startIcon={<BorderColorIcon />}>
                      Edit
                    </Button>
                  </Grid>
                </Grid>
                <Stack sx={{ mt: "1rem" }} alignItems="center" direction="row" spacing={1}>
                  <Chip label="Reading" />
                  <Chip label="Playing game" />
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page
