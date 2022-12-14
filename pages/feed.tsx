import { ReactElement, useState } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import TheatersIcon from "@mui/icons-material/Theaters"
import SendIcon from "@mui/icons-material/Send"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles"
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
import ProfileLayout from "../components/layouts/profile"
import NavLayout from "../components/layouts/nav"

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

function Page() {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Stack direction="column" spacing={3} sx={{ p: 2 }}>
              <Paper elevation={1} sx={{ p: 2, boxShadow: "0px 8px 48px #EEEEEE" }}>
                <Typography sx={{ fontSize: 16 }} color="primary.dark" gutterBottom>
                  New Post
                </Typography>
                <TextField
                  fullWidth
                  id="post-field"
                  label="Share something with your network"
                  placeholder="Share something with your network"
                  variant="outlined"
                  multiline
                  rows={4}
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
              <Stack direction="column" spacing={2}>
                {[1, 2, 3, 4].map((item) => (
                  <Card
                    key={item}
                    sx={{
                      width: "100%",
                      boxShadow:
                        "0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title="Shrimp and Chorizo Paella"
                      subheader="September 14, 2016"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
                        Add 1 cup of frozen peas along with the mussels, if you like.
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          readmore
                        </ExpandMore>
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                        </Typography>
                        <Typography paragraph>
                          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add
                          chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8
                          minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the
                          pan. Add piment??n, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring
                          often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
                          cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                          Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without
                          stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low,
                          add reserved shrimp and mussels, tucking them down into the rice, and cook again without
                          stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any
                          mussels that don&apos;t open.)
                        </Typography>
                        <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
                      </Collapse>
                      <CardMedia
                        component="img"
                        height="231"
                        image={"https://reactjs.org/logo-og.png"}
                        alt="Paella dish"
                      />
                    </CardContent>

                    <CardActions disableSpacing sx={{ background: "#F8F9FC" }}>
                      <Button aria-label="add to favorites" sx={{ display: "flex", flexDirection: "column", mr: 1 }}>
                        <ThumbUpIcon />
                        <Typography sx={{ fontSize: 13 }}>42 Likes</Typography>
                      </Button>
                      <Button aria-label="add comments" sx={{ display: "flex", flexDirection: "column" }}>
                        <ChatIcon />
                        <Typography sx={{ fontSize: 13 }}>9 Comments</Typography>
                      </Button>
                      <Button sx={{ marginLeft: "auto", display: "flex", flexDirection: "column" }} aria-label="share">
                        <ShareIcon />
                        <Typography sx={{ fontSize: 13 }}>7 Shares</Typography>
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            </Stack>
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
        </Grid>
      </Container>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

export default Page
