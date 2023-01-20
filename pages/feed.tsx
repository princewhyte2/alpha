import { ReactElement, useState, useMemo, useCallback } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
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
import { AlertColor } from "@mui/material"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import useSWR, { useSWRConfig } from "swr"
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
import ProfileLayout from "../components/layouts/profile"
import NavLayout from "../components/layouts/nav"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import TiptapEditor from "../components/TiptapEditor"
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

import postService from "../services/post"
import uploadService from "../services/upload"
import { ErrorComponent } from "../components/alert"
import NoPostIllustration from "../components/icons/NoPostIllustration"
import htmlTruncate from "../lib/htmlTruncate"

dayjs.extend(relativeTime)
type BreakpointOrNull = Breakpoint | null

function useWidth() {
  const theme: Theme = useTheme()
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || "xs"
  )
}

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

function Page() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const { data: posts } = useSWR("posts", postService.postFetcher)

  const [expanded, setExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isPost, setIsPost] = useState(false)
  const [editor, setEditor] = useState<any>()
  const [editorContent, setEditorContent] = useState()
  const [mediaType, setMediaType] = useState<"image" | "video" | undefined>()
  const [files, setFiles] = useState<ImageResponse[]>([])
  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const onCloseModal = () => {
    editor?.commands?.clearContent(true)
    setFiles([])
    setMediaType(undefined)
    setIsPost(false)
  }

  const handleSendPost = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const data = {
      body: JSON.stringify(editorContent),
      file_type: mediaType,
      images: files.map((i) => i.id),
    }

    try {
      //@ts-ignore
      const response = await postService.createPost(data as CreatePostData)
      setMessage(response?.message)
      setType("success")
      setIsError(true)
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

  console.log("posts", posts)

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
                {!posts && (
                  <Stack direction="column" alignItems={"center"} justifyContent={"center"} spacing={2}>
                    <NoPostIllustration />
                    <Stack sx={{ p: 4 }} alignItems={"center"} justifyContent={"center"} spacing={1}>
                      <Typography sx={{ fontSize: 16, color: "#1F204A" }}>There is no post to display.</Typography>
                      <Typography textAlign={"center"} sx={{ fontSize: 16, color: "#1F204A" }}>
                        You can also connect with other artisans to see their post.
                      </Typography>
                    </Stack>
                  </Stack>
                )}
                {posts?.map((item: any) => (
                  <PostCard key={item.id} item={item} onLike={handleLike} />
                ))}
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
      <BootstrapDialog
        PaperProps={{ style: { margin: 8 } }}
        open={isPost}
        fullWidth
        onClose={() => onCloseModal()}
        aria-labelledby="workhistory-modal-title"
        aria-describedby="workhistory-modal-description"
      >
        <BootstrapDialogTitle id="title-work-history" onClose={() => onCloseModal()}>
          Create Post
        </BootstrapDialogTitle>
        <DialogContent>
          <Box onSubmit={handleSendPost} sx={{ width: "100%" }} component={"form"}>
            <Paper elevation={1} sx={{ p: 2, boxShadow: "0px 8px 48px #EEEEEE" }}>
              <TiptapEditor setEditorContent={setEditorContent} setTextEditor={setEditor} initContent={""} />
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
              <Grid container sx={{ mt: 1 }} spacing={2}>
                {files?.map((file) => (
                  <Grid key={file.id} item xs={12} md={4}>
                    <Card sx={{ position: "relative" }}>
                      <CardMedia sx={{ height: 140 }} image={file.url} title={file.name} />

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
                Post
              </LoadingButton>
            </Stack>
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

export default Page
function PostCard({ item, onLike }: any) {
  const [isShowMore, setIsShowMore] = useState(false)
  const content = useMemo(() => {
    if (!item?.body) return ""
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
  }, [])
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
            sx={{ bgcolor: red[500] }}
            alt={`${item.relationships.created_by.first_name} ${item.relationships.created_by.last_name}`}
            src={item?.relationships.created_by.relationships.profile_image?.url}
            aria-label="recipe"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${item.relationships.created_by.first_name} ${item.relationships.created_by.last_name}`}
        subheader={dayjs(item.created_at).fromNow()}
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
        {item.relationships?.medias.length > 0 && (
          <CardMedia component="img" height="231" src={item.relationships.medias[0].url} alt="Paella dish" />
        )}
      </CardContent>

      <CardActions disableSpacing sx={{ background: "#F8F9FC" }}>
        <Button
          onClick={onLike(item.id)}
          aria-label="add to favorites"
          sx={{ display: "flex", flexDirection: "column", mr: 1 }}
        >
          <ThumbUpIcon />
          <Typography sx={{ fontSize: 13 }}>{item.total_likes} Likes</Typography>
        </Button>
        <Button aria-label="add comments" sx={{ display: "flex", flexDirection: "column" }}>
          <ChatIcon />
          <Typography sx={{ fontSize: 13 }}>{item.total_comments} Comments</Typography>
        </Button>
        <Button sx={{ marginLeft: "auto", display: "flex", flexDirection: "column" }} aria-label="share">
          <ShareIcon />
          <Typography sx={{ fontSize: 13 }}>7 Shares</Typography>
        </Button>
      </CardActions>
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
              id="comment-field"
              label="Add a comment "
              placeholder="Add a comment "
              variant="outlined"
              margin="dense"
            />
            <Box>
              <Button variant="contained">Post</Button>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
