import { ReactElement, useState, useCallback, useMemo } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import useSWR, { useSWRConfig } from "swr"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Breakpoint, Theme, ThemeProvider, useTheme, createTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import SendIcon from "@mui/icons-material/Send"
import { generateHTML } from "@tiptap/core"
import { Text as TestTipTap } from "@tiptap/extension-text"
import InputAdornment from "@mui/material/InputAdornment"
import BlockQuote from "@tiptap/extension-blockquote"
import BulletList from "@tiptap/extension-bullet-list"
import Bold from "@tiptap/extension-bold"
import ListItem from "@tiptap/extension-list-item"
import Code from "@tiptap/extension-code"
import CodeBlock from "@tiptap/extension-code-block"
import Document from "@tiptap/extension-document"
import HardBreak from "@tiptap/extension-hard-break"
import Heading from "@tiptap/extension-heading"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Italic from "@tiptap/extension-italic"
import Link from "@tiptap/extension-link"
import OrderedList from "@tiptap/extension-ordered-list"
import Paragraph from "@tiptap/extension-paragraph"
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
import ProfileLayout from "../../components/layouts/profile"
import NavLayout from "../../components/layouts/nav"
import jobService from "../../services/job"
import NoPostIllustration from "../../components/icons/NoPostIllustration"
import { ErrorComponent } from "../../components/alert"
import htmlTruncate from "../../lib/htmlTruncate"
import Router, { useRouter } from "next/router"

dayjs.extend(relativeTime)
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

const debounce = (func: any) => {
  let timer: any
  return function (...args: any) {
    // @ts-ignore
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      func.apply(context, args)
    }, 500)
  }
}

function Page() {
  const [value, setValue] = useState(0)
  const { mutate } = useSWRConfig()
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [searchTerm, setSearchTerm] = useState("")
  const { data: jobsList } = useSWR(`/jobs?searchTerm=${searchTerm}`, jobService.getAllJobs, {
    keepPreviousData: true,
  })
  const optimizedFn = useCallback(debounce(setSearchTerm), [])

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<"error" | "success">("error")

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const handleJobApplication = useCallback(
    (jobId: string) => async () => {
      try {
        router.push(`/jobs/${jobId}`)
        // const response = await jobService.applyForJob(jobId)
        // mutate(`/jobs?searchTerm=${searchTerm}`)
        // setType("success")
        // setMessage(response.message)
        // setIsError(true)
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
      }
    },
    [],
  )
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container disableGutters maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Container maxWidth="md">
              <Stack
                sx={{ p: { xs: 0, md: 2 }, my: { xs: 2, md: 0 } }}
                direction={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography sx={{ fontSize: 20 }} color="primary.dark">
                    Jobs
                  </Typography>
                </Box>
                <TextField
                  sx={{ width: "100%" }}
                  id="search-connections"
                  onChange={(e) => optimizedFn(e.target.value)}
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
              </Stack>
              <Stack direction="column" spacing={2}>
                {!jobsList || jobsList.length < 1 ? (
                  <Stack direction="column" alignItems={"center"} justifyContent={"center"} spacing={2}>
                    <NoPostIllustration />
                    <Stack sx={{ p: 4 }} alignItems={"center"} justifyContent={"center"} spacing={1}>
                      <Typography sx={{ fontSize: 16, color: "#1F204A" }}>There is no job to display.</Typography>
                    </Stack>
                  </Stack>
                ) : (
                  jobsList?.map((item: any) => (
                    <JobCard key={item.id} onJobApplication={handleJobApplication} item={item} />
                  ))
                )}
              </Stack>
            </Container>
          </Grid>
          {matches && (
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
                <Paper
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
                </Paper>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Container>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

Page.requireAuth = true

export default Page

const JobCard = ({ item, onJobApplication }: any) => {
  const [isShowMore, setIsShowMore] = useState(false)
  const content = useMemo(() => {
    try {
      return generateHTML(JSON.parse(item.description), [
        Document,
        Paragraph,
        TestTipTap,
        Italic,
        HardBreak,
        Code,
        CodeBlock,
        ListItem,
        BulletList,
        OrderedList,
        BlockQuote,
        Heading,
        HorizontalRule,
        Bold,
        Link,
        // other extensions …
      ])
    } catch (error) {
      return item?.description
    }
  }, [])
  return (
    <Paper
      key={item.id}
      elevation={1}
      sx={{
        p: 2,
        boxShadow: " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "start", md: "center" }}
          spacing={2}
        >
          <Typography sx={{ fontSize: { xs: 16, md: 20 } }} color="primary.main">
            {item.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="primary.dark">
            {item.company?.name}
          </Typography>
        </Stack>
        {/* <Typography sx={{ fontSize: 14, color: "#667085" }}>{item.description}</Typography> */}
        <div
          onClick={() => setIsShowMore(true)}
          className="ProseMirror"
          dangerouslySetInnerHTML={{
            __html: htmlTruncate(content, 200, { ellipsis: "... see more" }),
          }}
        />
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          {item.skills.map((skill: string) => (
            <Chip key={skill} label={skill} />
          ))}
        </Stack>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 2 }}>
          <Typography sx={{ fontSize: 14 }} color="primary.main">
            Location: {item.location}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="primary.main">
            Job Duration: {item.duration}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="primary.main">
            Gender Required: {item.preferred_gender}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="primary.main">
            Closing Date: {dayjs().to(item.closing_at)}
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="space-between"
          spacing={1}
        >
          <Button sx={{ px: 4 }} onClick={onJobApplication(item.id)} variant="contained">
            View
          </Button>
          <Typography sx={{ fontSize: 12 }} color="primary.main">
            Posted {dayjs(item.created_at).fromNow()}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}
