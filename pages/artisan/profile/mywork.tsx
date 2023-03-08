import { ReactElement, useState, useRef, ChangeEvent, useCallback, FormEvent } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import LoadingButton from "@mui/lab/LoadingButton"
import CloseIcon from "@mui/icons-material/Close"
import CancelIcon from "@mui/icons-material/Cancel"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DeleteIcon from "@mui/icons-material/Delete"
import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import useSWR, { useSWRConfig } from "swr"
import { styled } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import IconButton from "@mui/material/IconButton"
import { AlertColor } from "@mui/material"
import { useTheme, Theme } from "@mui/material/styles"
import MyWorkIllustration from "../../../components/icons/MyWorkIllustration"
import uploadService from "../../../services/upload"
import Grid from "@mui/material/Grid"
import projectService from "../../../services/project"
import profileServices from "../../../services/profile"
import { ErrorComponent } from "../../../components/alert"
import { useRouter } from "next/router"
import NavLayout from "../../../components/layouts/nav"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  width: "100%",
  position: "relative",
}))

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
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
  const theme = useTheme()
  const { mutate } = useSWRConfig()
  const { data: userProjects } = useSWR<ProjectResponseData[]>("userProjects", projectService.projectFetcher)
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [projectImages, setProjectImages] = useState<ImageResponse[]>([])
  const [isNeProjectAdded, setIsNewProjectAdded] = useState(false)
  const [projectData, setProjectData] = useState<ProjectResponseData>()
  const [isViewProjectInfo, setIsViewProjectInfo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  const projectTitleRef = useRef<HTMLInputElement>()
  const projectDescriptionRef = useRef<HTMLInputElement>()

  const [isAddNewProject, setIsAddNewProject] = useState(false)

  const handleFileChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadService.uploadFile(formData)
      setMessage(res?.message)
      setType("success")
      setIsError(true)

      const item = res.result.file
      setProjectImages((prevFiles) => [...prevFiles, item])
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
  }, [])

  const handlePostProject = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (projectImages?.length < 1) {
        setMessage("Please add Images of your project")
        setType("error")
        setIsError(true)
        return
      }

      const t = projectImages.map((item) => item.id)

      const data = {
        title: projectTitleRef.current?.value,
        description: projectDescriptionRef.current?.value,
        images: t,
      }

      setIsLoading(true)

      try {
        if (projectData) {
          const response = await projectService.updateProject(String(projectData.id), data as ProjectPostData)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          mutate("userProjects")
          handleCloseModal()
          return
        } else {
          const response = await projectService.addProjects(data as ProjectPostData)
          setMessage(response?.message)
          setType("success")
          setIsError(true)
          mutate("userProjects")
          setIsNewProjectAdded(true)
        }
        handleCloseModal()
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
    [projectImages, projectData],
  )

  const handleDeleteProject = useCallback(
    (id: string) => async (e: any) => {
      e.stopPropagation()
      setIsDeleting(true)
      try {
        const response = await projectService.deleteProject(id)
        mutate("userProjects")
        console.log("response", response)
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
        setIsDeleting(false)
      }
    },
    [],
  )

  const onViewProject = useCallback(
    (item: ProjectResponseData) => (e: any) => {
      setProjectData(item)
      setIsViewProjectInfo(true)
    },
    [],
  )

  const handleCloseModal = useCallback(() => {
    setIsNewProjectAdded(false)
    setIsViewProjectInfo(false)
    setIsAddNewProject(false)
    setProjectImages([])
    setProjectData(undefined)
  }, [])

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="h6" sx={{ my: 1, color: "primary.dark", fontSize: { xs: 16, md: 20 } }}>
          My Work
        </Typography>
        {/* {!matches && (
          <IconButton
            aria-label="close"
            onClick={() => router.back()}
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>
        )} */}
      </Stack>
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
      {userProjects && userProjects?.length > 0 ? (
        <Grid container spacing={2}>
          {userProjects?.map((item) => (
            <Grid onClick={onViewProject(item)} key={item.id} item xs={12} md={4}>
              <Item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: "180px", height: "131px", overflow: "hidden", background: "black" }}>
                    <img
                      width="180px"
                      height="131px"
                      className="overlay-image"
                      src={item.relationships.images[0]?.url}
                      alt={item.relationships.images[0]?.name}
                      loading="lazy"
                    />
                  </Box>
                  <Stack direction="column" spacing={2}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        setProjectData(item)
                        setProjectImages(item.relationships.images)
                        setIsAddNewProject(true)
                      }}
                      color="secondary"
                      aria-label="add an alarm"
                    >
                      <BorderColorIcon />
                    </IconButton>
                    <IconButton
                      disabled={isDeleting}
                      onClick={handleDeleteProject(String(item.id))}
                      color="secondary"
                      aria-label="add an alarm"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <Typography variant="body1" sx={{ mt: 1, color: "primary.main" }}>
                  {item.title}
                </Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack sx={{ py: "4rem" }} direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <MyWorkIllustration />
          <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
            No Project Added
          </Typography>
        </Stack>
      )}
      <BootstrapDialog
        open={isAddNewProject}
        onClose={handleCloseModal}
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
      >
        {!isNeProjectAdded ? (
          <>
            <BootstrapDialogTitle id="projects-dialog-title" onClose={handleCloseModal}>
              {projectData ? "Update" : `Add New`} Work
            </BootstrapDialogTitle>
            <DialogContent>
              <Box onSubmit={handlePostProject} component="form" sx={{ pt: 2 }}>
                {/* <Stack sx={{ position: "relative" }} direction="row" justifyContent="space-between" alignItems="center">
                <Typography id="project-modal-title" variant="h6" component="h2">
                  {projectData ? "Update" : `Add New`} Work
                </Typography>
                <IconButton
                  onClick={handleCloseModal}
                  size="small"
                  sx={{ backgroundColor: "#3E4095", position: "absolute", bottom: "15px", right: "-15px" }}
                  aria-label="close project modal"
                >
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </Stack> */}

                <TextField
                  fullWidth
                  id="profile-Project"
                  label="Project Title"
                  placeholder="Project Title"
                  variant="outlined"
                  required
                  defaultValue={projectData?.title || ""}
                  inputRef={projectTitleRef}
                  sx={{ my: "1rem" }}
                />
                <TextField
                  required
                  defaultValue={projectData?.description || ""}
                  inputRef={projectDescriptionRef}
                  fullWidth
                  id="profile-Description"
                  label="Project Description"
                  placeholder="Project Title"
                  variant="outlined"
                  multiline
                  rows={4}
                />
                <Button component="label" sx={{ my: "1rem" }} variant="text" startIcon={<AddIcon />}>
                  <input onChange={handleFileChange} hidden accept="image/*" type="file" />
                  Add Work/Project Image(s)
                </Button>
                <Grid container spacing={2}>
                  {projectImages?.map((images) => (
                    <Grid key={images.id} item xs={12} md={4}>
                      <Item>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                          <Box sx={{ width: "52px", height: "32px", overflow: "hidden" }}>
                            <img width={"100%"} height="auto" src={images.url} alt={images.name} loading="lazy" />
                          </Box>

                          <Typography variant="h5" noWrap sx={{ fontSize: "12px", fontWeight: "450px" }}>
                            {images.name}
                          </Typography>
                        </Stack>
                        <IconButton
                          onClick={() => setProjectImages((prev) => prev.filter((item) => item.id !== images.id))}
                          sx={{ position: "absolute", top: 0, right: 0 }}
                          aria-label="delete"
                          size="small"
                        >
                          <CancelIcon fontSize="inherit" />
                        </IconButton>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
                <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
                  <LoadingButton loading={isLoading} type="submit" fullWidth sx={{ px: 6 }} variant="contained">
                    Save
                  </LoadingButton>
                </Stack>
              </Box>
            </DialogContent>
          </>
        ) : (
          <>
            <BootstrapDialogTitle id="projects-dialog-title" onClose={handleCloseModal}></BootstrapDialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <Stack sx={{ py: "2rem" }} direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <MyWorkIllustration />
                <Typography variant="body1" sx={{ my: 1, color: "primary.main" }}>
                  A new project titled “{projectTitleRef.current?.value}” has been successfully added
                </Typography>
              </Stack>
            </DialogContent>
          </>
        )}
      </BootstrapDialog>
      <BootstrapDialog
        open={isViewProjectInfo}
        onClose={handleCloseModal}
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
      >
        <BootstrapDialogTitle id="projects-dialog-title" onClose={handleCloseModal}>
          {projectData?.title}
        </BootstrapDialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body1" sx={{ my: 2, color: "#4D5761" }}>
            {projectData?.description}
          </Typography>
          <Grid container spacing={2}>
            {projectData?.relationships.images.map((item) => (
              <Grid key={item.id} item xs={12} md={6}>
                <img width="100%" height="224px" className="img" src={item.url} alt={item.name} loading="lazy" />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </BootstrapDialog>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </NavLayout>
  )
}

Page.requireAuth = true

export default Page
