import { ReactElement, useState } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Chip from "@mui/material/Chip"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import EmailIcon from "@mui/icons-material/Email"
import InputAdornment from "@mui/material/InputAdornment"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Avatar from "@mui/material/Avatar"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme, Theme } from "@mui/material/styles"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import DeleteIcon from "@mui/icons-material/Delete"
import PhoneIcon from "@mui/icons-material/Phone"
import Stack from "@mui/material/Stack"
import AddIcon from "@mui/icons-material/Add"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import ProfileLayout from "../../components/layouts/profile"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
]

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  }
}

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
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState(false)
  const [isEditOccupation, setIsEditOccupation] = useState(false)
  const [isEditEducation, setIsEditEducation] = useState(false)
  const [isEditWorkHistory, setIsEditWorkHistory] = useState(false)
  const [isEditHobbies, setIsEditHobbies] = useState(false)

  const [personName, setPersonName] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    )
  }

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
              {!isEditPersonalInfo ? (
                <>
                  <Box
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      pb: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
                  >
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography sx={{ color: "primary.dark" }} variant="body1">
                          Personal Information
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => setIsEditPersonalInfo(true)}
                          variant="text"
                          startIcon={<BorderColorIcon />}
                        >
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
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      py: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
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
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      py: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
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
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      py: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
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
                    sx={{
                      width: "100%",
                      px: { xs: "1rem", md: "3rem" },
                      py: "1rem",
                      borderBottom: "1px dashed #3E4095",
                    }}
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
                </>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    px: { xs: "1rem", md: "3rem" },
                    pb: "1rem",
                  }}
                >
                  <Typography sx={{ color: "primary.dark", mb: "3rem" }} variant="body1">
                    Update your personal information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        id="profile-title"
                        placeholder="e.g Fashion Designer, Plumber e.t.c"
                        label="Title"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={12} md={4}>
                      <TextField fullWidth id="profile-firstName" label="First Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField fullWidth id="profile-midName" label="Middle Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField fullWidth id="profile-lastName" label="Last Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                          labelId="gender-select-label"
                          id="gender-select"
                          value={0}
                          label="Gender"
                          onChange={() => console.log("here")}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="date"
                        label="Date of Birth"
                        type="date"
                        // defaultValue="2017-05-24"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Email"
                        id="email-start-adornment"
                        disabled
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Phone Number"
                        id="phone-number-start-adornment"
                        disabled
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Button variant="text" startIcon={<AddIcon />}>
                        Add Another Phone No
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <TextField
                        label="Phone Number"
                        id="phone-number-start-adornment"
                        disabled
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="state-simple-select-label">State</InputLabel>
                        <Select
                          labelId="state-select-label"
                          id="state-select"
                          value={0}
                          label="Gender"
                          onChange={() => console.log("here")}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="city-simple-select-label">City/Town</InputLabel>
                        <Select
                          labelId="city-select-label"
                          id="city-select"
                          value={0}
                          label="City/Town"
                          onChange={() => console.log("here")}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Stack spacing={2} direction="row">
                        <Button onClick={() => setIsEditPersonalInfo(false)} fullWidth color="error" variant="outlined">
                          Cancel
                        </Button>
                        <Button fullWidth variant="contained">
                          Save
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}
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
                  <Grid container item direction="row" justifyContent="flex-end" alignItems="center">
                    {matches ? (
                      <Button onClick={() => setIsEditOccupation(true)} variant="text" startIcon={<AddIcon />}>
                        Add Occupation & Skills
                      </Button>
                    ) : (
                      <IconButton onClick={() => setIsEditOccupation(true)} aria-label="add an alarm">
                        <AddIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
                {[1, 2].map((item) => (
                  <Box
                    key={item}
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
                      <Button onClick={() => setIsEditEducation(true)} variant="text" startIcon={<AddIcon />}>
                        Add Educational Qualification
                      </Button>
                    ) : (
                      <IconButton onClick={() => setIsEditEducation(true)} aria-label="add an alarm">
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
                      <Button onClick={() => setIsEditWorkHistory(true)} variant="text" startIcon={<AddIcon />}>
                        Add Work History
                      </Button>
                    ) : (
                      <IconButton onClick={() => setIsEditWorkHistory(true)} aria-label="add an alarm">
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
              {!isEditHobbies ? (
                <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        Hobbies
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={() => setIsEditHobbies(true)} variant="text" startIcon={<BorderColorIcon />}>
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                  <Stack sx={{ mt: "1rem" }} alignItems="center" direction="row" spacing={1}>
                    <Chip label="Reading" />
                    <Chip label="Playing game" />
                  </Stack>
                </Box>
              ) : (
                <Box sx={{ width: "100%", px: { xs: "1rem", md: "3rem" } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography sx={{ color: "primary.dark" }} variant="body1">
                        Update your Hobbies
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="hobbies-chip-label">Update your Hobbies</InputLabel>
                        <Select
                          labelId="hobbies-chip-label"
                          id="hobbies-chip"
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput id="select-multiple-chip" label="Update your Hobbies" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} onDelete={() => console.log("here")} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {names.map((name) => (
                            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Stack spacing={2} direction="row">
                        <Button onClick={() => setIsEditHobbies(false)} fullWidth color="error" variant="outlined">
                          Cancel
                        </Button>
                        <Button fullWidth variant="contained">
                          Save
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={isEditOccupation}
        onClose={() => setIsEditOccupation(false)}
        aria-labelledby="occupation-modal-title"
        aria-describedby="occupation-modal-description"
      >
        <Box sx={style}>
          <Stack sx={{ position: "relative" }} direction="row" justifyContent="space-between" alignItems="center">
            <Typography id="occupation-modal-title" variant="h6" component="h2">
              Add Occupation and Skills
            </Typography>
            <IconButton
              onClick={() => setIsEditOccupation(false)}
              size="small"
              sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "15px", right: "-15px" }}
              aria-label="close occupation modal"
            >
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Stack>

          <TextField
            fullWidth
            id="profile-Ocupation"
            label="Ocupation"
            placeholder="Choose a sector"
            variant="outlined"
            sx={{ my: "1rem" }}
          />
          <TextField
            fullWidth
            id="profile-SKills"
            label="Skills (Select/add as many skills as you have)"
            placeholder="Your skills"
            variant="outlined"
          />
          <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
            <Button fullWidth={!matches} sx={{ px: 6 }} variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={isEditEducation}
        onClick={() => setIsEditEducation(false)}
        aria-labelledby="qualification-modal-title"
        aria-describedby="qualification-modal-description"
      >
        <Box sx={style}>
          <Stack
            sx={{ position: "relative", mb: "1.9rem" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="qualification-modal-title" variant="h6" component="h2">
              Add Educational Qualification
            </Typography>
            <IconButton
              onClick={() => setIsEditEducation(false)}
              size="small"
              sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "2px", right: "-15px" }}
              aria-label="close qualification modal"
            >
              <CloseIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="qualification-simple-select-label">Qualification*</InputLabel>
                <Select
                  labelId="qualification-select-label"
                  id="qualification-select"
                  value={0}
                  label="Qualification*"
                  onChange={() => console.log("here")}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                id="profile-institute"
                label="Institution/School"
                placeholder="Institution/school attended"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                id="date"
                label="Graduation Date*"
                type="date"
                // defaultValue="2017-05-24"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
            <Button fullWidth={!matches} sx={{ px: 6 }} variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={isEditWorkHistory}
        onClose={() => setIsEditWorkHistory(false)}
        aria-labelledby="workhistory-modal-title"
        aria-describedby="workhistory-modal-description"
      >
        <Box sx={style}>
          <Stack
            sx={{ position: "relative", mb: "1.9rem" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="workhistory-modal-title" variant="h6" component="h2">
              Add Work History
            </Typography>
            <IconButton
              size="small"
              onClick={() => setIsEditWorkHistory(false)}
              sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "2px", right: "-22px" }}
              aria-label="close workhistory modal"
            >
              <CloseIcon fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="profile-company"
                label="Company*"
                placeholder="Name of Company"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="profile-job-title"
                label="Job Title"
                placeholder="Your job title"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="Start Date*"
                type="date"
                // defaultValue="2017-05-24"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="End Date"
                type="date"
                // defaultValue="2017-05-24"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="profile-job-summary"
                label="Summary of Work Done"
                placeholder="What was your job"
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
            <Button fullWidth={!matches} sx={{ px: 6 }} variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page
