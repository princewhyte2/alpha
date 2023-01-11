import { ReactElement, useState } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import SendIcon from "@mui/icons-material/Send"
import InputAdornment from "@mui/material/InputAdornment"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
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
import { useRouter } from "next/router"

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Container maxWidth="md">
              <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                <Box>
                  <Typography sx={{ fontSize: 20 }} color="primary.dark">
                    Jobs
                  </Typography>
                </Box>
                <TextField
                  id="search-connections"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="Search for Jobs" edge="end">
                          <SearchIcon sx={{ color: "primary.dark" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Search for Jobs"
                  variant="outlined"
                />
                <Button
                  onClick={() => router.push("/employer/create-job")}
                  variant="contained"
                  startIcon={<CreateNewFolderIcon />}
                >
                  Create Job
                </Button>
              </Stack>
              <Stack direction="column" spacing={2}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Paper
                    key={item}
                    elevation={1}
                    sx={{
                      p: 2,
                      boxShadow:
                        " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  >
                    <Stack direction="column" spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography sx={{ fontSize: 20 }} color="primary.main">
                          Fashoin Designer
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="primary.dark">
                          Name of Company/Author
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14, color: "#667085" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas eget sodales tempus diam vel,
                        neque molestie et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas eget sodales
                        tempus diam vel, neque molestie et.
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip label="Tailor" />
                        <Chip label="Embroidery" />
                        <Chip label="Monogram" />
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <Typography sx={{ fontSize: 14 }} color="primary.main">
                          Location: Lagos
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="primary.main">
                          Job Duration: 6 Months
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="primary.main">
                          Gender Required: Male
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="primary.main">
                          Closing Date:30/12/2022
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems={"center"} justifyContent="space-between" spacing={1}>
                        <Button variant="text">View applications</Button>
                        <Typography sx={{ fontSize: 12 }} color="primary.main">
                          Posted 2 days ago
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
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
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <EmployerNavLayout>{page}</EmployerNavLayout>
}

export default Page
