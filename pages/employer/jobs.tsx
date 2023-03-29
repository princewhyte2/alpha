import { ReactElement, useCallback, useState, useRef, FormEvent, useMemo } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import Collapse from "@mui/material/Collapse"
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
import { Text as TestTipTap } from "@tiptap/extension-text"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import SendIcon from "@mui/icons-material/Send"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import InputAdornment from "@mui/material/InputAdornment"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import LoadingButton from "@mui/lab/LoadingButton"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import CloseIcon from "@mui/icons-material/Close"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles"
import Chip from "@mui/material/Chip"
import useSWR, { useSWRConfig } from "swr"
import SearchIcon from "@mui/icons-material/Search"
import { hobbiesList } from "../../utils"
import Autocomplete from "@mui/material/Autocomplete"
import InputLabel from "@mui/material/InputLabel"
import { generateHTML } from "@tiptap/core"
import { Breakpoint, Theme, ThemeProvider, useTheme, createTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardActions from "@mui/material/CardActions"
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
import jobService from "../../services/job"
import htmlTruncate from "../../lib/htmlTruncate"
import NoPostIllustration from "../../components/icons/NoPostIllustration"
import { ErrorComponent } from "../../components/alert"
import profileServices from "../../services/profile"
import NavLayout from "../../components/layouts/nav"
import TiptapEditor from "../../components/TiptapEditor"
import connectionService from "../../services/connection"

dayjs.extend(relativeTime)
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}))

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
function Page() {
  const [value, setValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [editor, setEditor] = useState<any>()
  const [initContent, setInitContent] = useState("")
  const { data: jobsList, isLoading: isJobsLoading } = useSWR(
    `/companyjobs?searchTerm=${searchTerm}`,
    jobService.getCompanyJobs,
    {
      keepPreviousData: true,
    },
  )
  const [isLoading, setIsLoading] = useState(false)
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const [skills, setSkills] = useState<string[]>([])
  const [jobDetails, setJobDetails] = useState<any>()
  const [isPostJob, setIsPostJob] = useState(false)

  //console.log("job list", jobsList)

  const { data: approvedConnectionList } = useSWR("approvedConnections", connectionService.getApprovedUserConnections)

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<"error" | "success">("error")

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const optimizedFn = useCallback(debounce(setSearchTerm), [])

  const jobTitleRef = useRef<HTMLInputElement>()
  // const jobDescriptionRef = useRef<HTMLInputElement>()
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
        description: JSON.stringify(editor.getJSON()),
        location: jobLocationRef.current?.value,
        duration: jobDurationRef.current?.value,
        preferred_gender: genderRef.current?.value,
        closing_at: closingDateRef.current?.value,
        skills,
      }
      setIsLoading(true)
      try {
        if (jobDetails) {
          const response = await jobService.updateJob(String(jobDetails.id), data)
          mutate(`/companyjobs?searchTerm=${searchTerm}`)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
        } else {
          const response = await jobService.postJob(data)
          mutate(`/companyjobs?searchTerm=${searchTerm}`)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
        }
        onCloseJobModal()
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    },
    [user, skills, editor],
  )

  const onCloseJobModal = useCallback(() => {
    setJobDetails(undefined)
    setInitContent("")
    editor?.commands?.clearContent(true)
    setIsPostJob(false)
    setSkills([])
  }, [editor])

  const handleEdit = useCallback(
    (jobItem: any) => () => {
      setSkills(jobItem.skills)
      setInitContent(JSON.parse(jobItem.description))
      setJobDetails(jobItem)
      setIsPostJob(true)
    },
    [],
  )

  const handleDelete = useCallback(
    (jobId: number) => async () => {
      try {
        const response = await jobService.deleteJob(String(jobId))
        mutate(`/companyjobs?searchTerm=${searchTerm}`)
        setType("success")
        setMessage(response.message)
        setIsError(true)
      } catch (error: any) {
        setType("error")
        if (error.response) {
          setMessage(error.response.data.message)
        } else if (error.request) {
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
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
                sx={{ px: { xs: 0, md: 2 }, py: 2 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Box>
                  <Typography sx={{ fontSize: 20 }} color="primary.dark">
                    Jobs
                  </Typography>
                </Box>
                {matches && (
                  <TextField
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
                )}
                <Button onClick={() => setIsPostJob(true)} variant="contained" startIcon={<CreateNewFolderIcon />}>
                  Create Job
                </Button>
              </Stack>
              <Stack direction="column" spacing={2}>
                {isJobsLoading && <CircularProgress />}
                {jobsList?.length < 1 ? (
                  <Stack direction="column" alignItems={"center"} justifyContent={"center"} spacing={2}>
                    <NoPostIllustration />
                    <Stack sx={{ p: 4 }} alignItems={"center"} justifyContent={"center"} spacing={1}>
                      <Typography sx={{ fontSize: 16, color: "#1F204A" }}>There is no job to display.</Typography>
                    </Stack>
                  </Stack>
                ) : (
                  jobsList?.map((item: any) => (
                    <JobCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
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
                      <Avatar
                        sx={{ width: 80, height: 80 }}
                        alt={user?.relationships?.company?.name}
                        src={user?.relationships?.company.logo_image.url}
                      />
                      <Typography sx={{ fontSize: 16 }} color="primary.main">
                        {user?.relationships?.company.name}
                      </Typography>
                      <Typography sx={{ fontSize: 16, color: "#475467" }}>
                        {user?.relationships?.company?.business_sector?.name}
                      </Typography>
                    </Stack>
                    {/* <Box sx={{ width: "100%", my: "2rem" }}>
                      <Typography sx={{ fontSize: 13, color: "#4D5761" }}>Profile Completion</Typography>
                      <LinearProgressWithLabel value={80} />
                    </Box> */}
                    <Typography sx={{ fontSize: 16 }} color="primary.main">
                      {approvedConnectionList?.length || 0} Connections
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
          )}
        </Grid>
      </Container>
      <BootstrapDialog
        PaperProps={{ style: { margin: 8 } }}
        open={isPostJob}
        fullScreen={!matches}
        fullWidth
        onClose={onCloseJobModal}
        aria-labelledby="workhistory-modal-title"
        aria-describedby="workhistory-modal-description"
      >
        <BootstrapDialogTitle onClose={onCloseJobModal} id="title-work-history">
          {jobDetails ? "Update" : "Create"} Job
        </BootstrapDialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handlePostJob}
            sx={{
              width: "100%",
              // px: { xs: "1rem", md: "3rem" },
              mt: 1,
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
                  defaultValue={jobDetails?.title || ""}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TiptapEditor
                  placeholder="write or paste your job description"
                  setTextEditor={setEditor}
                  initContent={initContent}
                />
                {/* <TextField
                  fullWidth
                  id="profile-title"
                  placeholder="Description"
                  label="Job Description"
                  variant="outlined"
                  defaultValue={jobDetails?.description || ""}
                  multiline
                  minRows={4}
                  inputRef={jobDescriptionRef}
                  required
                /> */}
              </Grid>
              <Grid item xs={12} md={8}>
                <Autocomplete
                  multiple
                  fullWidth
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
                  defaultValue={jobDetails?.location || ""}
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
                  defaultValue={jobDetails?.duration || ""}
                  inputRef={jobDurationRef}
                />
              </Grid>
              <Grid item xs={12} md={4}></Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender Required</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    placeholder="Gender"
                    inputRef={genderRef}
                    label="Gender Required"
                    required
                    defaultValue={jobDetails?.preferred_gender || ""}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"any"}>Any</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="date"
                  label="Closing Date"
                  type="date"
                  fullWidth
                  inputRef={closingDateRef}
                  defaultValue={jobDetails?.closing_at.split(" ")[0] || ""}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <LoadingButton
                  disabled={skills.length <= 0 || editor?.isEmpty}
                  type="submit"
                  loading={isLoading}
                  fullWidth
                  variant="contained"
                >
                  Save
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

Page.requireAuth = true

export default Page

function JobCard({ item, onEdit, onDelete }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isShowMore, setIsShowMore] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  // const { data: jobApplicantsList } = useSWR(`/jobs/${item?.id}/applications`, jobService.getJobApplicants)
  // //console.log("job item", item)

  // //console.log("applicants", jobApplicantsList)
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = useCallback(() => {
    // setExpanded(!expanded)
    router.push(`/jobs/${item.id}`)
  }, [])

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
        <Stack direction="row" justifyContent="space-between" alignItems={{ xs: "start", md: "center" }} spacing={2}>
          <Typography sx={{ fontSize: { xs: 16, md: 20 } }} color="primary.main">
            {item.title}
          </Typography>
          {/* <Typography sx={{ fontSize: 14 }} color="primary.dark">
                            Name of Company/Author
                          </Typography> */}
          {item?.posted_by?.id === user?.id && (
            <div>
              <IconButton
                aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
                aria-haspopup="true"
                sx={{ mt: -2 }}
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                onClick={handleClick}
                aria-label="settings"
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={onEdit(item)}>Edit</MenuItem>
                <MenuItem onClick={onDelete(item.id)}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </Stack>
        {/* <Typography sx={{ fontSize: 14, color: "#667085" }}>{item.description}</Typography> */}
        <div
          onClick={() => setIsShowMore(true)}
          className="ProseMirror"
          dangerouslySetInnerHTML={{
            __html: htmlTruncate(content, 50, { ellipsis: "... see more" }),
          }}
        />
        {matches && (
          <Stack sx={{ flexWrap: "wrap", gap: 1 }} direction="row">
            {item.skills.map((skill: string) => (
              <Chip key={skill} label={skill} />
            ))}
          </Stack>
        )}
        {matches && (
          <Stack sx={{ flexWrap: "wrap", gap: 2 }} direction="row">
            <Typography sx={{ fontSize: 13 }} color="primary.main">
              Location: {item.location}
            </Typography>
            <Typography sx={{ fontSize: 13 }} color="primary.main">
              Job Duration: {item.duration}
            </Typography>
            <Typography sx={{ fontSize: 13 }} color="primary.main">
              Gender Required: {item.preferred_gender}
            </Typography>
            <Typography sx={{ fontSize: 13 }} color="primary.main">
              Closing Date: {dayjs().to(item.closing_at)}
            </Typography>
          </Stack>
        )}
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="space-between"
          spacing={1}
        >
          <Button onClick={handleExpandClick} variant="text">
            View applications
          </Button>
          <Typography sx={{ fontSize: 12 }} color="primary.main">
            Posted {dayjs(item.created_at).fromNow()}
          </Typography>
        </Stack>
      </Stack>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stack direction="column" spacing={1}>
          {jobApplicantsList?.map((applicant: any) => (
            <Paper
              key={applicant.applicant?.id}
              elevation={1}
              sx={{
                p: 2,
                boxShadow:
                  " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                borderRadius: "8px",
                width: "100%",
              }}
            >
              <Stack direction="row" alignItems={{ xs: "start", md: "center" }} spacing={{ xs: 1, md: 3 }}>
                <Avatar
                  alt={applicant.applicant?.first_name}
                  src={applicant.applicant?.profile_image?.url}
                  sx={{ width: { xs: "48px", md: "100px" }, height: { xs: "48px", md: "100px" } }}
                />
                <Stack
                  sx={{ flexGrow: 1 }}
                  direction="row"
                  justifyContent="space-between"
                  // alignItems="center"
                  spacing={1}
                >
                  <Stack direction="column" spacing={1}>
                    <Typography sx={{ fontSize: { xs: 14, md: 16 } }} color="primary.main">
                      {applicant.applicant?.first_name} {applicant.applicant?.middle_name}{" "}
                      {applicant.applicant?.last_name}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "#667085" }}>
                      {applicant.applicant?.title}
                    </Typography>
                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                      {applicant.applicant?.hobbies?.map((item: string) => (
                        <Chip key={item} label={item} />
                      ))}
                    </Stack>
                  </Stack>
                  <Stack direction="column" alignItems={"flex-end"}>
                    <IconButton sx={{ mt: -2 }} aria-label="options">
                      <MoreHorizIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Collapse> */}
    </Paper>
  )
}
