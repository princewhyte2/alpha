import { ReactElement, useState, useCallback } from "react"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
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
import { TypeAnimation } from "react-type-animation"
import NavLayout from "../components/layouts/nav"
import SkillIcon from "../components/icons/SkillIcon"
import FacebookIcon from "../components/icons/Facebook"
import GoogleIcon from "../components/icons/Google"
import { useRouter } from "next/router"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const skillsOne = ["Fashion designer", "Mechanic", "Hair dresser", "Plumber", "Barber", "Photographer"]
const skillsTwo = ["House painter", "Shoe maker", "Caterer", "Make-up artist", "Dry cleaner", "Decorator"]
const featuresOne = [
  "Skilled Artisans that fits your need",
  "Post Jobs and review applications",
  "Instant Messaging with artisans",
]
const featuresTwo = [
  "Showcase your works for employers",
  "Apply for jobs and chat with employers",
  "Build relationship with fellow artisans",
]

const images = [
  {
    label: "Mechanic",
    imgPath: "/mechanic.webp",
  },
  {
    label: "Hair stylist",
    imgPath: "/hairstylelistone.webp",
  },
  {
    label: "hair Stylist 2",
    imgPath: "/hairstylelisttwo.webp",
  },
  {
    label: "Two tailors",
    imgPath: "/twotailors.webp",
  },
]
function Page() {
  const theme = useTheme()
  const router = useRouter()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <Box sx={{ flexGrow: 1, background: "#FFFFFF" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack direction="column" sx={{ pt: 2 }} spacing={3}>
              <Typography sx={{ m: 0, fontSize: { xs: 38, md: 56 }, fontWeight: 500, color: "#000000" }}>
                The {/* <span className="bold-text"> */}
                <TypeAnimation
                  // Same String at the start will only be typed once, initially
                  sequence={[
                    "Marketplace",
                    1000,
                    "Bazaar",
                    1000,
                    "Emporium",
                    1000,
                    "Mart",
                    1000,
                    "Fair",
                    1000,
                    "Exchange",
                    1000,
                    "Bourse",
                    1000,
                  ]}
                  speed={40} // Custom Speed from 1-99 - Default Speed: 40
                  className="bold-text"
                  wrapper="span" // Animation will be rendered as a <span>
                  repeat={Infinity} // Repeat this Animation Sequence infinitely
                />
                {/* </span> */} <br /> for Artisans
              </Typography>
              <Typography sx={{ m: 0, fontSize: { xs: 16, md: 20 }, fontWeight: 450, color: "#475467" }}>
                Ipsum eget rhoncus integer varius quam dignissim sit. Fusce sed erat gravida dui eget id faucibus
                ornare. Adipiscing sed sem pharetra quam
              </Typography>
              <Stack sx={{ flexWrap: "wrap", gap: 2 }} alignItems={"center"} direction="row">
                <Button variant="contained">Get Started</Button>
                <Typography sx={{ m: 0, fontSize: 16, fontWeight: 500 }} color="primary.dark">
                  Already using Workfynder?{" "}
                  <Link href="/auth/login" underline="always">
                    Login
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia component="img" height="100%" image={"/variousartisans.webp"} alt="various artisans" />
          </Grid>
        </Grid>
        <Typography
          textAlign={"center"}
          sx={{ mt: 3, fontSize: { xs: 18, md: 25 }, fontWeight: 500 }}
          color="primary.dark"
          gutterBottom
        >
          Eu arcu volutpat risus nunc mi varius non et dui. Cursus semper quis eget
        </Typography>
        <Typography textAlign={"center"} sx={{ fontSize: { xs: 14, md: 20 }, fontWeight: 450 }} color="primary.dark">
          Eu arcu volutpat risus nunc mi varius non et dui. Cursus semper quis eget
        </Typography>
        <Grid sx={{ pt: 6, pl: { xs: 0, md: 2 }, pr: { xs: 0, md: 6 } }} container spacing={2}>
          {skillsOne.map((item: string) => (
            <Grid key={item} item xs={6} md={2}>
              <Button sx={{ backgroundColor: "#E7E7F9", width: "100%" }}>{item}</Button>
            </Grid>
          ))}
        </Grid>
        <Grid sx={{ pt: 2, pl: { xs: 0, md: 6 }, pr: { xs: 0, md: 2 } }} container spacing={2}>
          {skillsTwo.map((item: string) => (
            <Grid key={item} item xs={6} md={2}>
              <Button sx={{ backgroundColor: "#E7E7F9", width: "100%" }}>{item}</Button>
            </Grid>
          ))}
        </Grid>
        <Grid sx={{ mt: 6, background: "#1F204A", borderRadius: "12px", overflow: "hidden" }} container>
          <Grid item xs={12} md={7}>
            <Stack sx={{ py: 2, pr: 3, pl: 2 }} direction={"column"} spacing={2}>
              <Typography sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 500, color: "#FFFFFF" }}>
                For Employers
              </Typography>

              <Typography sx={{ fontSize: { xs: 26, md: 40, lineHeight: "140%" }, fontWeight: 500, color: "#FFFFFF" }}>
                Get access to unlimited <br />
                amount of skilled artisans
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 18, lineHeight: "140%" }, fontWeight: 450, color: "#F8F9FC" }}>
                Feugiat amet sit nisi et non tellus sit. Augue ullamcorper ridiculus at est ullamcorper. Phasellus velit
                enim volutpat nibh ultrices orci nec in. Phasellus velit enim volutpat nibh ultrices orci nec in.
              </Typography>
              <Box style={{ width: "100%" }}>
                <Grid sx={{ pt: 2 }} container spacing={1}>
                  {featuresOne.map((item: string) => (
                    <Grid key={item} item xs={6} md={4}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{ p: 3, background: "#FFFFFF", borderRadius: "4px", width: "100%", position: "relative" }}
                      >
                        <Box sx={{ position: "absolute", left: 6, top: 6 }}>
                          <SkillIcon />
                        </Box>
                        <Typography
                          color={"primary.main"}
                          sx={{ fontSize: { xs: 13, md: 13, lineHeight: "140%" }, fontWeight: 500 }}
                        >
                          {item}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            {/* <CardMedia component="img" height="100%" image={"/twotailors.webp"} alt="various artisans" /> */}
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
              style={{ height: "100%" }}
            >
              {images.map((step, index) => (
                <Box sx={{ height: "100%" }} key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <CardMedia component="img" height="100%" image={step.imgPath} alt={step.label} />
                  ) : // <Box
                  //   component="img"
                  //   sx={{ react-swipeable-view-container
                  //     height: 255,
                  //     display: "block",
                  //     maxWidth: 400,
                  //     overflow: "hidden",
                  //     width: "100%",
                  //   }}
                  //   src={step.imgPath}
                  //   alt={step.label}
                  // />
                  null}
                </Box>
              ))}
            </AutoPlaySwipeableViews>
          </Grid>
        </Grid>
        <Grid sx={{ mt: 6, background: "#3E4095", borderRadius: "12px", overflow: "hidden" }} container>
          <Grid item xs={12} md={5}>
            <CardMedia component="img" height="100%" image={"/blackcarpenter.webp"} alt="various artisans" />
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack alignItems={"flex-end"} sx={{ py: 2, pr: 2, pl: 3 }} direction={"column"} spacing={2}>
              <Typography sx={{ fontSize: { xs: 16, md: 20 }, fontWeight: 500, color: "#FFFFFF" }}>
                For Artisans
              </Typography>

              <Typography
                textAlign={"right"}
                sx={{ fontSize: { xs: 26, md: 40, lineHeight: "140%" }, fontWeight: 500, color: "#FFFFFF" }}
              >
                Find opportunities to grow your business
              </Typography>
              <Typography
                textAlign={"right"}
                sx={{ fontSize: { xs: 14, md: 18, lineHeight: "140%" }, fontWeight: 450, color: "#F8F9FC" }}
              >
                Feugiat amet sit nisi et non tellus sit. Augue ullamcorper ridiculus at est ullamcorper. Phasellus velit
                enim volutpat nibh ultrices orci nec in. Phasellus velit enim volutpat nibh ultrices orci nec in.
              </Typography>
              <Box style={{ width: "100%" }}>
                <Grid sx={{ pt: 2 }} container spacing={2}>
                  {featuresTwo.map((item: string) => (
                    <Grid key={item} item xs={6} md={4}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{ p: 3, background: "#FFFFFF", borderRadius: "4px", width: "100%", position: "relative" }}
                      >
                        <Box sx={{ position: "absolute", left: 6, top: 6 }}>
                          <SkillIcon />
                        </Box>
                        <Typography
                          color={"primary.main"}
                          sx={{ fontSize: { xs: 13, md: 13, lineHeight: "140%" }, fontWeight: 500 }}
                        >
                          {item}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ background: "#E2E3F3", mt: 6 }} disableGutters maxWidth="xl">
        <Container maxWidth="md">
          <Stack sx={{ py: { xs: 3, md: 5 } }} direction={{ xs: "column", md: "row" }} spacing={3}>
            <Typography sx={{ fontSize: { xs: 16, md: 40 }, fontWeight: 500, color: "#071E11", lineHeight: "140%" }}>
              Subscribe for
              <br />
              Workfynder Newsletter
            </Typography>
            <Stack sx={{ flexGrow: 1 }} spacing={2} direction="column">
              <TextField
                placeholder="eg test@gmail.com"
                sx={{ width: "100%", my: { md: 1 }, background: "#FFFFFF" }}
                id="subscribe"
                label="Enter your Email Address"
                variant="outlined"
              />
              <Box>
                <Button fullWidth={!matches} variant="contained" sx={{ background: "#3E4095" }}>
                  Subscribe
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Container>
      <Container sx={{ background: "#FFFFFF" }} maxWidth="xl">
        <Grid container sx={{ mt: 6, py: 6 }} spacing={2}>
          <Grid item xs={12} md={5}>
            <Stack justifyContent={"center"} direction="column" sx={{ pt: 2, height: "100%" }} spacing={3}>
              <Typography sx={{ fontSize: { xs: 24, md: 48 }, fontWeight: 500, color: "#1F204A", lineHeight: "140%" }}>
                Contact Us
              </Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 18 }, fontWeight: 450, color: "#1F204A", lineHeight: "140%" }}>
                Consectetur ut non ut commodo malesuada scelerisque in nulla neque. Magna dignissim in neque congue
                aliquet blandit neque id.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack alignItems="center" direction={"column"} spacing={3}>
              <Stack direction={{ xs: "column", md: "row" }} sx={{ pt: 2 }} spacing={3}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Enter your name"
                        fullWidth
                        id="contact-name"
                        label="Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Enter your phone number"
                        fullWidth
                        id="contact-phone"
                        label="Phone Number "
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Enter your email address"
                        fullWidth
                        id="contact-email-address"
                        label="Email Address"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Tell us what we can do for you"
                        fullWidth
                        id="contact-phone"
                        label="How can we help you"
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
              <Container maxWidth="xs">
                <Button fullWidth sx={{ background: "#3E4095" }} variant="contained">
                  Get in touch{" "}
                </Button>
              </Container>
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ background: "#F8F9FC", mt: 6, py: 5 }} maxWidth="xl">
        <Stack
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={3}
          direction={{ xs: "column", md: "row" }}
        >
          <Stack spacing={2} sx={{ width: "100%" }} direction={"column"}>
            <Link href="/" underline="none">
              <Box sx={{ height: { xs: "1.5rem", sm: "3.2rem" }, width: { xs: "1.7rem", sm: "3.2rem" } }}>
                <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
              </Box>
            </Link>
            <Typography sx={{ fontSize: { xs: 13, md: 16 }, fontWeight: 450, color: "#5E5E5E", lineHeight: "140%" }}>
              Enim egestas arcu tortor vestibulum amet pharetra pellentesque mattis. Quisque metus ipsum morbi tincidunt
              diam sed purus. Sed elementum ut consequat quis etiam pharetra sagittis. Ullamcorper vestibulum sagittis
              nibh luctus non nulla gravida.
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Button fullWidth={!matches} variant="contained">
                Sign up
              </Button>
              <Button onClick={() => router.push("/auth/login")} fullWidth={!matches} variant="text">
                Login
              </Button>
            </Stack>
          </Stack>
          <Stack
            sx={{ width: "100%" }}
            alignItems={{ xs: "flex-start", md: "flex-end" }}
            direction={"column"}
            spacing={2}
          >
            <Typography sx={{ fontSize: { xs: 13, md: 16 }, fontWeight: 450, color: "#3E4095", lineHeight: "140%" }}>
              Terms of Service
            </Typography>
            <Typography sx={{ fontSize: { xs: 13, md: 16 }, fontWeight: 450, color: "#3E4095", lineHeight: "140%" }}>
              Privacy Policy
            </Typography>
            <Stack alignItems={"center"} spacing={3} direction={"row"}>
              <Typography sx={{ fontSize: { xs: 13, md: 16 }, fontWeight: 450, color: "#3E4095", lineHeight: "140%" }}>
                Follow Us
              </Typography>
              <Stack alignItems={"center"} spacing={2} direction={"row"}>
                <FacebookIcon />
                <GoogleIcon />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

// Page.requireAuth = true

export default Page
