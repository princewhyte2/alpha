import { FormEvent, ReactElement, useCallback, useRef, useState } from "react"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Autocomplete from "@mui/material/Autocomplete"
import LoadingButton from "@mui/lab/LoadingButton"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import SendIcon from "@mui/icons-material/Send"
import InputAdornment from "@mui/material/InputAdornment"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import useSWR from "swr"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles"
import Chip from "@mui/material/Chip"
import SearchIcon from "@mui/icons-material/Search"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import { red } from "@mui/material/colors"
import ChatIcon from "@mui/icons-material/Chat"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import Container from "@mui/material/Container"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import EmployerNavLayout from "../../components/layouts/employernav"
import { hobbiesList } from "../../utils"
import { useRouter } from "next/router"
import { ErrorComponent } from "../../components/alert"
import jobService from "../../services/job"
import profileServices from "../../services/profile"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

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
  const [value, setValue] = useState(0)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const [skills, setSkills] = useState<string[]>([])

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<"error" | "success">("error")

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  console.log("user", user)

  //references
  const jobTitleRef = useRef<HTMLInputElement>()
  const jobDescriptionRef = useRef<HTMLInputElement>()
  const jobLocationRef = useRef<HTMLInputElement>()
  const jobDurationRef = useRef<HTMLInputElement>()
  const genderRef = useRef<HTMLInputElement>()
  const closingDateRef = useRef<HTMLInputElement>()

  const handlePostJob = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = {
        company_id: user?.relationships.company.id,
        user_id: user?.id,
        title: jobTitleRef.current?.value,
        description: jobDescriptionRef.current?.value,
        location: jobLocationRef.current?.value,
        duration: jobDurationRef.current?.value,
        preferred_gender: genderRef.current?.value,
        closing_at: closingDateRef.current?.value,
        skills,
      }
      setIsLoading(true)
      try {
        if (false) {
          // const response = await profileServices.updateUserQualification(
          //   String(educationId.detail.id),
          //   data as QualificationsPostData,
          // )
          // setMessage(response?.message)
          setType("success")
          setIsError(true)
          // mutate("userProfile")
        } else {
          const response = await jobService.postJob(data)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          router.back()
          // mutate("userProfile")
        }
        // onCloseEducationBootstrapDialog()
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log("Error", error.message)
        }
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    },
    [user, skills],
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Container maxWidth="md">
              <Button onClick={() => router.back()} startIcon={<KeyboardBackspaceIcon />}>
                Create Job
              </Button>
              <Box
                component="form"
                onSubmit={handlePostJob}
                sx={{
                  width: "100%",
                  px: { xs: "1rem", md: "3rem" },
                  py: "1rem",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      id="profile-title"
                      placeholder="Job  Title"
                      label="Job  Title"
                      variant="outlined"
                      inputRef={jobTitleRef}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      id="profile-title"
                      placeholder="Description"
                      label="Job Description"
                      variant="outlined"
                      multiline
                      minRows={4}
                      inputRef={jobDescriptionRef}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Autocomplete
                      multiple
                      fullWidth
                      //   value={hobbies}
                      value={skills}
                      onChange={(_ev, val) => setSkills(val)}
                      options={hobbiesList}
                      renderInput={(params) => (
                        <TextField {...params} label="Skills Needed" variant="outlined" placeholder="Skills Needed" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      id="profile-title"
                      placeholder="eg 234, Odogbolu street, surulere, lagos"
                      label="Job Location"
                      variant="outlined"
                      required
                      inputRef={jobLocationRef}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      id="profile-title"
                      placeholder="eg 8 months"
                      label="Job Duration"
                      variant="outlined"
                      required
                      inputRef={jobDurationRef}
                    />
                  </Grid>
                  {/* <Grid item xs={12} md={4}></Grid> */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Gender Required</InputLabel>
                      <Select
                        labelId="gender-select-label"
                        id="gender-select"
                        placeholder="Gender"
                        label="Gender Required"
                        required
                        defaultValue={""}
                        inputRef={genderRef}
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="date"
                      label="Closing Date"
                      type="date"
                      fullWidth
                      inputRef={closingDateRef}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <LoadingButton
                      disabled={!(skills.length > 0)}
                      type="submit"
                      loading={isLoading}
                      fullWidth
                      variant="contained"
                    >
                      Creae Job
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="column" spacing={3} sx={{ p: 2 }}>
              <Card
                sx={{
                  backgroundColor: "#F8F9FC",
                  boxShadow: " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 8px 48px #EEEEEE",
                }}
              >
                <CardContent>
                  <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography sx={{ fontSize: 16 }} color="primary.main">
                      Babatunde Olakunle
                    </Typography>
                    <Typography sx={{ fontSize: 16, color: "#475467" }}>Fashoin Designer</Typography>
                  </Stack>
                  <Box sx={{ width: "100%", my: "2rem" }}>
                    <Typography sx={{ fontSize: 13, color: "#4D5761" }}>Profile Completion</Typography>
                    <LinearProgressWithLabel value={80} />
                  </Box>
                  <Typography sx={{ fontSize: 16 }} color="primary.main">
                    40 Connections
                  </Typography>
                </CardContent>
              </Card>
              {/* <Paper
                elevation={3}
                sx={{ p: 2, boxShadow: " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 8px 48px #EEEEEE" }}
              >
                <Typography sx={{ fontSize: 16 }} variant="body1" color="primary.main" gutterBottom>
                  Recent Jobs Fitting your profile
                </Typography>
                <Stack spacing={2}>
                  {[1, 2].map((item) => (
                    <Box key={item} sx={{ p: 2, backgroundColor: "#F8F9FC" }}>
                      <Typography sx={{ fontSize: 14 }} variant="body1" color="primary.main" gutterBottom>
                        Fashoin Designer
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: "#667085" }} gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas eget sodales tempus diam vel,
                        neque molestie et.
                      </Typography>
                      <Stack
                        direction="row"
                        sx={{ mt: 2 }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Button variant="contained">Apply</Button>
                        <Typography sx={{ fontSize: 12, color: "#475467" }}>Posted 2 days ago</Typography>
                      </Stack>
                    </Box>
                  ))}
                  <Button variant="text">View all</Button>
                </Stack>
              </Paper> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <EmployerNavLayout>{page}</EmployerNavLayout>
}

export default Page
