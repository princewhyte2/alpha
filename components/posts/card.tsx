import { ReactElement, useState, useMemo, useCallback, memo } from "react"
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
import profileServices from "../../services/profile"

dayjs.extend(relativeTime)
function PostCard({ item, onLike, onComment, onUnLike, onEdit, onDelete, onSharePost, isFullPage = false }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [expanded, setExpanded] = useState(true)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // const {mutate} = useSWRConfig()
  const { data: appUser } = useSWR("userProfile", profileServices.profileFetcher)
  const [userComment, setUserComment] = useState("")
  const { data: postComments } = useSWR(
    expanded && item?.id ? `/posts/${item.id}/comments` : null,
    postService.getAllPostComments,
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

  // //console.log("comments", postComments)

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
          isPostCreator && (
            <Stack sx={{ pr: 1 }} direction={"column"} alignItems="flex-end" justifyContent="flex-end">
              {!isFullPage && (
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
                <Typography sx={{ fontSize: 13, color: "#475467" }}>{dayjs(item.created_at).fromNow()}</Typography>
              </Box>
            </Stack>
          )
        }
        title={`${item.relationships.created_by.first_name} ${item.relationships.created_by.last_name}`}
        // subheader={dayjs(item.created_at).fromNow()}
        subheader={item.relationships.created_by.title}
      />
      <CardContent>
        {
          <div
            className="ProseMirror"
            dangerouslySetInnerHTML={{
              __html: content,
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
              autoPlay
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
          onClick={onSharePost(item.id)}
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
              />
              <Box>
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
              </Box>
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
                        <Typography sx={{ fontSize: 13, color: "#475467" }}>
                          {dayjs(item.created_at).fromNow()}
                        </Typography>
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

export default PostCard
