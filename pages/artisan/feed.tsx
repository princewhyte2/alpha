import { ReactElement, useState, useMemo, useCallback, memo, useEffect } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import InputAdornment from "@mui/material/InputAdornment"
import { usePWAInstall } from "react-use-pwa-install"
import Snackbar from "@mui/material/Snackbar"
import CircularProgress from "@mui/material/CircularProgress"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import SendIcon from "@mui/icons-material/Send"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Dialog from "@mui/material/Dialog"
import LoadingButton from "@mui/lab/LoadingButton"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { AlertColor } from "@mui/material"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import useSWR, { mutate, useSWRConfig } from "swr"
import { generateHTML } from "@tiptap/core"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import CloseIcon from "@mui/icons-material/Close"
import { styled } from "@mui/material/styles"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import { red } from "@mui/material/colors"
import ChatIcon from "@mui/icons-material/Chat"
import CancelIcon from "@mui/icons-material/Cancel"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import Container from "@mui/material/Container"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ProfileLayout from "../../components/layouts/profile"
import NavLayout from "../../components/layouts/nav"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import TiptapEditor from "../../components/TiptapEditor"
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
import { Breakpoint, Theme, ThemeProvider, useTheme, createTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import postService from "../../services/post"
import uploadService from "../../services/upload"
import { ErrorComponent } from "../../components/alert"
import NoPostIllustration from "../../components/icons/NoPostIllustration"
import htmlTruncate from "../../lib/htmlTruncate"
import { useAuth } from "../../store"
import profileServices from "../../services/profile"
import { stripHtml } from "../../utils"
import jobService from "../../services/job"
import connectionService from "../../services/connection"
import { useRouter } from "next/router"

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a sec",
    m: "a min",
    mm: "%d mins",
    h: "an hr",
    hh: "%d hrs",
    d: "a d",
    dd: "%d d",
    M: "a mon",
    MM: "%d mons",
    y: "a yr",
    yy: "%d yrs",
  },
})

type BreakpointOrNull = Breakpoint | null

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
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

function usePosts() {
  const { data: posts } = useSWR("posts", postService.postFetcher, {
    dedupingInterval: 10000,
  })

  return {
    posts,
  }
}

function Page() {
  const theme = useTheme()
  const { mutate } = useSWRConfig()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const install = usePWAInstall()
  const router = useRouter()

  const { posts } = usePosts()

  const [expanded, setExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isPost, setIsPost] = useState(false)
  const [editor, setEditor] = useState<any>()
  const [isEditPost, setIsEditPost] = useState(false)
  const [editorContent, setEditorContent] = useState()
  const [mediaType, setMediaType] = useState<"image" | "video" | undefined>()
  const [files, setFiles] = useState<ImageResponse[]>([])
  const [initContent, setInitContent] = useState("")
  const [editId, setEditId] = useState("")
  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const { data: jobsList } = useSWR(`/jobs?searchTerm=${""}`, jobService.getAllJobs, {
    keepPreviousData: true,
  })
  const { data: approvedConnectionList } = useSWR("approvedConnections", connectionService.getApprovedUserConnections)

  const { data: user } = useSWR("userProfile", profileServices.profileFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const handlePostShare = useCallback(
    (postId: string, content: string) => () => {
      if (navigator.share) {
        navigator
          .share({
            title: "WorkFynder Post",
            url: `${window.location.origin}/posts/${postId}`,
            text: `Check out this amazing post on workfynder \n "${stripHtml(content)}" \n`,
          })
          .then(() => {
            console.log("Thanks for sharing!", postId)
          })
          .catch(console.error)
      } else {
        console.log("no active share")
      }
    },
    [],
  )

  const onCloseModal = () => {
    setInitContent("")
    editor?.commands?.clearContent(true)
    setFiles([])
    setMediaType(undefined)
    setIsEditPost(false)
    setIsPost(false)
    setEditId("")
  }

  const handleSendPost = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const data = {
      body: JSON.stringify(editorContent),
      ...(files.length > 0 && { file_type: mediaType }),
      ...(mediaType === "image" && { images: files.map((i) => i.id) }),
      ...(mediaType === "video" && { video: files[0].id }),
    }

    try {
      if (isEditPost && editId) {
        //@ts-ignore
        const response = await postService.updatePost(editId, data as CreatePostData)
        setMessage(response?.message)
      } else {
        //@ts-ignore
        const response = await postService.createPost(data as CreatePostData)
        setMessage(response?.message)
      }
      mutate("posts")
      setType("success")
      // setIsError(true)
      onCloseModal()
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
  }

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setIsImageLoading(true)
    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadService.uploadFile(formData)
      const item = res.result.file as ImageResponse
      setMediaType("image")
      setFiles([item])
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
      setIsImageLoading(false)
    }
  }

  const handleVideoFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setIsImageLoading(true)
    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadService.uploadFile(formData)
      const item = res.result.file
      setMediaType("video")
      setFiles([item])
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
      setIsImageLoading(false)
    }
  }

  const handleLike = useCallback(
    (postId: number) => async () => {
      try {
        const response = await postService.likePost(String(postId))
        mutate("posts")
        console.log("like", response)
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

  const handleUnLike = useCallback(
    (postId: number) => async () => {
      try {
        const response = await postService.unlikePost(String(postId))
        mutate("posts")
        console.log("like", response)
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
  const handleComment = useCallback(async (postId: number, comment: string) => {
    try {
      const response = await postService.addComment(String(postId), { body: comment })
      mutate(`/posts/${postId}/comments`)
      setMessage(response?.message)
      setType("success")
      // setIsError(true)
      console.log("comment", response)
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

  const handleEdit = useCallback(
    (postItem: any) => () => {
      const content = JSON.parse(postItem.body)
      setIsPost(true)
      setIsEditPost(true)
      setInitContent(content)
      setEditId(postItem.id)

      setFiles(postItem.relationships.medias)
      setMediaType(postItem.relationships.medias[0]?.type)
    },
    [],
  )

  const handleDelete = useCallback(
    (postId: number) => async () => {
      try {
        const response = await postService.deletePost(String(postId))
        mutate("posts")
        setMessage(response?.message)
        setType("success")
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
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Stack direction="column" spacing={3} sx={{ px: { md: 2 }, py: 2 }}>
              <Paper
                onClick={() => setIsPost(true)}
                elevation={1}
                sx={{ p: 2, boxShadow: "0px 8px 48px #EEEEEE", cursor: "pointer" }}
              >
                <Typography sx={{ fontSize: 16 }} color="primary.dark" gutterBottom>
                  New Post
                </Typography>
                <TextField
                  disabled
                  fullWidth
                  id="post-field"
                  label="Share something with your network"
                  placeholder="Share something with your network"
                  variant="outlined"
                  margin="dense"
                />
                <Stack sx={{ mt: 1 }} direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                  <Button sx={{ display: "flex", flexDirection: "column" }}>
                    <InsertPhotoIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ fontSize: 13, color: "#757575" }}>Picture</Typography>
                  </Button>
                  <Button sx={{ display: "flex", flexDirection: "column" }}>
                    <TheatersIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ fontSize: 13, color: "#757575" }}>Video</Typography>
                  </Button>
                  <Button sx={{ display: "flex", flexDirection: "column" }}>
                    <SendIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ fontSize: 13, color: "#757575" }}>Post</Typography>
                  </Button>
                </Stack>
              </Paper>
              <Stack direction="column" alignItems={"center"} justifyContent={"center"} spacing={2}>
                {!posts || posts?.length < 1 ? (
                  <Stack direction="column" alignItems={"center"} justifyContent={"center"} spacing={2}>
                    <NoPostIllustration />
                    <Stack sx={{ p: 4 }} alignItems={"center"} justifyContent={"center"} spacing={1}>
                      <Typography sx={{ fontSize: 16, color: "#1F204A" }}>There is no post to display.</Typography>
                      <Typography textAlign={"center"} sx={{ fontSize: 16, color: "#1F204A" }}>
                        You can also connect with other artisans to see their post.
                      </Typography>
                    </Stack>
                  </Stack>
                ) : (
                  posts?.map((item: any) => (
                    <PostCard
                      key={item.id}
                      item={item}
                      onUnLike={handleUnLike}
                      onLike={handleLike}
                      onComment={handleComment}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onSharePost={handlePostShare}
                    />
                  ))
                )}
              </Stack>
            </Stack>
          </Grid>
          {matches && (
            <Grid item md={3}>
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
                        alt={user?.first_name}
                        src={user?.relationships?.profile_image.url}
                      />
                      <Typography sx={{ fontSize: 16 }} color="primary.main">
                        {user?.first_name} {user?.last_name}
                      </Typography>
                      <Typography sx={{ fontSize: 16, color: "#475467" }}>{user?.title}</Typography>
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
                <Paper
                  elevation={3}
                  sx={{ p: 2, boxShadow: " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 8px 48px #EEEEEE" }}
                >
                  <Typography sx={{ fontSize: 16 }} variant="body1" color="primary.main" gutterBottom>
                    Recent Jobs Fitting your profile
                  </Typography>
                  <Stack spacing={2}>
                    {jobsList?.slice(-2).map((item: any) => {
                      return <RecentJobCard key={item.id} item={item} />
                    })}
                    <Button onClick={() => router.push("/artisan/jobs")} variant="text">
                      View all
                    </Button>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Container>
      <BootstrapDialog
        PaperProps={{ style: { margin: 8 } }}
        open={isPost}
        fullWidth
        onClose={() => onCloseModal()}
        aria-labelledby="workhistory-modal-title"
        aria-describedby="workhistory-modal-description"
      >
        <BootstrapDialogTitle id="title-work-history" onClose={() => onCloseModal()}>
          {isEditPost ? "Update" : "Create"} Post
        </BootstrapDialogTitle>
        <DialogContent>
          <Box onSubmit={handleSendPost} sx={{ width: "100%" }} component={"form"}>
            <Paper elevation={1} sx={{ p: 2, boxShadow: "0px 8px 48px #EEEEEE" }}>
              <TiptapEditor setEditorContent={setEditorContent} setTextEditor={setEditor} initContent={initContent} />
              {files?.length < 1 && (
                <Stack sx={{ mt: 1 }} direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                  <Button
                    component="label"
                    disabled={isImageLoading || files?.length > 0}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <InsertPhotoIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ fontSize: 13, color: "#757575" }}>Picture</Typography>
                    <input onChange={handleImageFileChange} hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button
                    disabled={isImageLoading || files?.length > 0}
                    sx={{ display: "flex", flexDirection: "column" }}
                    component="label"
                  >
                    <TheatersIcon sx={{ color: "#757575" }} />
                    <Typography sx={{ fontSize: 13, color: "#757575" }}>Video</Typography>
                    <input onChange={handleVideoFileChange} hidden accept="video/*" multiple type="file" />
                  </Button>
                </Stack>
              )}
              {isImageLoading && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
              <Grid container sx={{ mt: 1 }} spacing={2}>
                {files?.map((file) => (
                  <Grid key={file.id} item xs={12} md={4}>
                    <Card sx={{ position: "relative" }}>
                      {mediaType === "video" ? (
                        <CardMedia component={"video"} sx={{ height: 140 }} src={file.url} title={file.name} controls />
                      ) : (
                        <CardMedia sx={{ height: 140 }} image={file.url} title={file.name} />
                      )}

                      <IconButton
                        onClick={() => setFiles((prev) => prev.filter((item) => item.id !== file.id))}
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        aria-label="delete"
                        size="small"
                      >
                        <CancelIcon fontSize="inherit" />
                      </IconButton>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
              <LoadingButton
                disabled={isImageLoading || (files.length < 1 && editor?.isEmpty)}
                loading={isLoading}
                type="submit"
                fullWidth
                sx={{ px: 6 }}
                variant="contained"
              >
                {isEditPost ? "Update" : "Post"}
              </LoadingButton>
            </Stack>
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
      {install && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          message="Install Workfynder for easy access"
          action={
            <Button onClick={install} color="inherit" size="small">
              install
            </Button>
          }
          sx={{ bottom: { xs: 90, sm: 0 } }}
        />
      )}
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

Page.requireAuth = true

export default Page

function PostCard({ item, onLike, onComment, onUnLike, onEdit, onDelete, onSharePost }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [expanded, setExpanded] = useState(false)
  const theme = useTheme()
  // const { mutate } = useSWRConfig()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // const {mutate} = useSWRConfig()
  const { data: appUser } = useSWR("userProfile", profileServices.profileFetcher)
  const [isShowMore, setIsShowMore] = useState(false)
  const [userComment, setUserComment] = useState("")
  const { data: postComments } = useSWR(
    expanded ? `/posts/${item.id}/comments` : null,
    postService.getAllPostComments,
    {
      dedupingInterval: 10000,
    },
  )
  const content = useMemo(() => {
    if (!item?.body) return ""
    try {
      return generateHTML(JSON.parse(item.body), [
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
      return item?.body
    }
  }, [])

  const isLiked = useMemo(() => {
    return Boolean(item.relationships.likes?.find((like: any) => like?.liked_by === appUser?.id))
  }, [item])

  const isPostCreator = useMemo(() => {
    return item.relationships.created_by.id === appUser?.id
  }, [item])

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  // console.log("comments", postComments)

  return (
    <Card
      key={item.id}
      sx={{
        width: "100%",
        boxShadow: "0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], height: { xs: 40, md: 52 }, width: { xs: 40, md: 52 } }}
            alt={`${item.relationships.created_by.first_name} ${item.relationships.created_by.last_name}`}
            src={item?.relationships.created_by.relationships.profile_image?.url}
            aria-label="recipe"
          />
        }
        action={
          <Stack sx={{ pr: 1 }} direction={"column"} alignItems="flex-end" justifyContent="flex-end">
            {isPostCreator && (
              <div>
                <IconButton
                  aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  size="small"
                  aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                  onClick={handleClick}
                  aria-label="settings"
                >
                  <MoreHorizIcon fontSize="inherit" />
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
            <Box sx={{ display: "flex", alignContent: "flex-start" }}>
              {matches ? (
                <Typography sx={{ fontSize: 13, color: "#475467" }}>{dayjs(item.created_at).fromNow()}</Typography>
              ) : (
                <Typography sx={{ fontSize: 13, color: "#475467" }}>{dayjs(item.created_at).fromNow(true)}</Typography>
              )}
            </Box>
          </Stack>
        }
        title={`${item.relationships.created_by.first_name} ${item.relationships.created_by.last_name}`}
        // subheader={dayjs(item.created_at).fromNow()}
        subheader={item.relationships.created_by.title}
      />
      <CardContent>
        {
          <div
            onClick={() => setIsShowMore(true)}
            className="ProseMirror"
            dangerouslySetInnerHTML={{
              __html: isShowMore ? content : htmlTruncate(content, 200, { ellipsis: "... read more" }),
            }}
          />
        }
      </CardContent>
      <CardContent>
        {item.relationships?.medias.length > 0 &&
          // <CardMedia component="img" height="100%" src={item.relationships.medias[0].url} alt="Paella dish" />
          (item.relationships.medias[0].type === "video" ? (
            <CardMedia
              component={"video"}
              height="100%"
              src={item.relationships.medias[0].url}
              title={item.relationships.medias[0].name}
              controls
            />
          ) : (
            <CardMedia
              component={"img"}
              height="100%"
              image={item.relationships.medias[0].url}
              title={item.relationships.medias[0].name}
            />
          ))}
      </CardContent>

      <CardActions disableSpacing sx={{ background: "#F8F9FC" }}>
        <Button
          onClick={isLiked ? onUnLike(item.id) : onLike(item.id)}
          aria-label="add to favorites"
          sx={{ display: "flex", flexDirection: "column", mr: 1 }}
        >
          <ThumbUpIcon sx={isLiked ? null : { color: "#757575" }} />
          <Typography sx={{ fontSize: 13 }}>{item.total_likes} Likes</Typography>
        </Button>
        <Button onClick={handleExpandClick} aria-label="add comments" sx={{ display: "flex", flexDirection: "column" }}>
          <ChatIcon />
          <Typography sx={{ fontSize: 13 }}>{item.total_comments} Comments</Typography>
        </Button>
        <Button
          onClick={onSharePost(item.id, htmlTruncate(content, 200, { ellipsis: "... read more" }))}
          sx={{ marginLeft: "auto", display: "flex", flexDirection: "column" }}
          aria-label="share"
        >
          <ShareIcon />
          <Typography sx={{ fontSize: 13 }}>Share</Typography>
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{ bgcolor: red[500] }}
              alt={`${item.relationships.created_by.first_name} ${item.relationships.created_by.last_name}`}
              src={item?.relationships.created_by.relationships.profile_image?.url}
              aria-label="recipe"
            />

            <Stack sx={{ flexGrow: 1 }} direction="column" spacing={2}>
              <TextField
                fullWidth
                value={userComment}
                id="comment-field"
                label="Add a comment "
                placeholder="Add a comment "
                variant="outlined"
                margin="dense"
                onChange={({ target }) => setUserComment(target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          onComment(item.id, userComment)
                          setUserComment("")
                        }}
                        disabled={Boolean(!userComment)}
                        aria-label="post comment"
                        color="primary"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <Box>
                <Button
                  onClick={() => {
                    onComment(item.id, userComment)
                    setUserComment("")
                  }}
                  disabled={Boolean(!userComment)}
                  variant="contained"
                >
                  Post
                </Button>
              </Box> */}
            </Stack>
          </Stack>
          <Stack direction="column" sx={{ m: 2 }} spacing={2}>
            {postComments?.map((item: any) => (
              <Card
                key={item.id}
                sx={{
                  width: "100%",
                  boxShadow: "none",
                  background: "#F8F9FC",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      alt={`${item.relationships.created_by.first_name} ${item.relationships.created_by.last_name}`}
                      src={item?.relationships.created_by.relationships.profile_image?.url}
                      aria-label="recipe"
                    />
                  }
                  action={
                    // isPostCreator && (
                    <Stack sx={{ pr: 1 }} direction={"column"} alignItems="flex-end" justifyContent="flex-end">
                      {/* <div>
                        <IconButton
                          aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          size="small"
                          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
                          onClick={handleClick}
                          aria-label="settings"
                        >
                          <MoreHorizIcon fontSize="inherit" />
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
                      </div> */}
                      <Box sx={{ display: "flex", alignContent: "flex-start" }}>
                        {matches ? (
                          <Typography sx={{ fontSize: 13, color: "#475467" }}>
                            {dayjs(item.created_at).fromNow()}
                          </Typography>
                        ) : (
                          <Typography sx={{ fontSize: 13, color: "#475467" }}>
                            {dayjs(item.created_at).fromNow(true)}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                    // )
                  }
                  title={`${item.relationships.created_by.first_name} ${item.relationships.created_by.last_name}`}
                  subheader={item.relationships.created_by.title}
                />
                <CardContent>
                  <Typography sx={{ fontSize: 14, color: "#1D2939" }}>{item.body}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  )
}

function RecentJobCard({ item }: any) {
  const router = useRouter()
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
  // console.log("our com", item)
  return (
    <Box key={item.id} sx={{ p: 2, backgroundColor: "#F8F9FC" }}>
      <Typography sx={{ fontSize: 14 }} variant="body1" color="primary.main" gutterBottom>
        {item.title}
      </Typography>
      {/* <Typography sx={{ fontSize: 13, color: "#667085" }} gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas eget sodales tempus diam vel,
            neque molestie et.
          </Typography> */}
      <div
        className="ProseMirror"
        dangerouslySetInnerHTML={{
          __html: htmlTruncate(content, 50, { ellipsis: "..." }),
        }}
      />
      <Stack direction="row" sx={{ mt: 2 }} justifyContent="space-between" alignItems="center" spacing={2}>
        <Button onClick={() => router.push(`/jobs/${item.id}`)} variant="contained">
          Apply
        </Button>
        <Typography sx={{ fontSize: 12, color: "#475467" }}>Closing: {dayjs().to(item.closing_at)}</Typography>
      </Stack>
    </Box>
  )
}
