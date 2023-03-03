import * as React from "react"
import Link from "@mui/material/Link"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import CircularProgress from "@mui/material/CircularProgress"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import EmailIcon from "@mui/icons-material/Email"
import InputAdornment from "@mui/material/InputAdornment"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import Collapse from "@mui/material/Collapse"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import Dialog from "@mui/material/Dialog"
import LoadingButton from "@mui/lab/LoadingButton"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import Container from "@mui/material/Container"
import useSWR, { useSWRConfig } from "swr"
// import Badge from "@mui/material/Badge"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Avatar from "@mui/material/Avatar"
import MenuLine from "../icons/MenuLine"
import { useRouter } from "next/router"
import profileServices from "../../services/profile"
import Button from "@mui/material/Button"
import locationService from "../../services/location"
import { ErrorComponent } from "../alert"
import uploadService from "../../services/upload"
import utilsService from "../../services/utils"

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode
  window?: () => Window
}

const drawerWidth = 240
const profileNav = [
  {
    name: "Profile Information",
    route: "/employer/profile/information",
  },

  {
    name: "Password & Security",
    route: "/employer/profile/security",
  },
]

const mainNav = [
  {
    name: "Your Feed",
    route: "/employer/feed",
  },
  {
    name: "Connection",
    route: "/employer/connection",
  },
  {
    name: "My Jobs",
    route: "/employer/jobs",
  },
  {
    name: "Messaging",
    route: "/messaging",
  },
  {
    name: "Profile",
    route: "/employer/profile/information",
  },
]

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}))

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  )
}

export default function EmployerNavLayout(props: Props) {
  const [loading, setLoading] = React.useState(false)
  const [isImageLoading, setIsImageLoading] = React.useState(false)
  const [logo, setLogo] = React.useState<any>()
  // const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const { data: businessSectors } = useSWR("businessSectors", utilsService.getBusinessSectors)
  // const [countryId, setCountryId] = React.useState("160")
  const { mutate } = useSWRConfig()
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  // const { data: countryList } = useSWR("countries", locationService.countriesFetcher)
  // const { data: statesList } = useSWR(`country_id=${countryId}`, locationService.statesFetcher)
  const { window, children } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const router = useRouter()

  //error handler
  const [message, setMessage] = React.useState("An error occured")
  const [isError, setIsError] = React.useState(false)
  const [type, setType] = React.useState<"error" | "success">("error")

  const [open, setOpen] = React.useState(true)

  const handleClick = React.useCallback(() => {
    setOpen(!open)
  }, [open])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  //references to form
  const businessNameRef = React.useRef<HTMLInputElement>()
  const websiteRef = React.useRef<HTMLInputElement>()
  const businessEmailRef = React.useRef<HTMLInputElement>()
  const businessAddressRef = React.useRef<HTMLInputElement>()
  const industryRef = React.useRef<HTMLInputElement>()

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", color: "primary.dark" }}>
      <Typography variant="h6" sx={{ mx: 1, my: 1 }}>
        Profile
      </Typography>
      <Divider />
      <List>
        {mainNav.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={(e) => {
                if (item.name === "Profile") {
                  e.stopPropagation()
                  handleClick()
                } else {
                  router.push(item.route)
                }
              }}
              sx={{ textAlign: "left", color: "primary.dark" }}
            >
              <ListItemText
                sx={{ borderBottom: router.pathname !== item.route ? "none" : "4px solid #3E4095" }}
                primary={item.name}
              />
              {item.name !== "Profile" ? null : open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
        ))}
        <Collapse in={open} timeout="auto" unmountOnExit>
          {profileNav.map((item) => (
            <List key={item.name} component="div" disablePadding>
              <ListItemButton onClick={() => router.push(item.route)} sx={{ pl: 4 }}>
                <ListItemText
                  sx={{ borderBottom: router.pathname !== item.route ? "none" : "4px solid #3E4095" }}
                  primary={item.name}
                />
              </ListItemButton>
            </List>
          ))}
        </Collapse>
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  const handleFileChange = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setIsImageLoading(true)
    try {
      const file = event.target.files[0]

      const formData = new FormData()
      formData.append("file", file)
      const res = await uploadService.uploadFile(formData)
      const item = res.result.file
      setLogo(item)
      //   const resp = await profileServices.updateUserProfile({ profile_image_id: item })
      //   console.log(resp)
      // mutate("userProfile")
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
  }, [])

  const handleCreateCompany = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      try {
        const data = {
          owned_by: user?.id,
          name: businessNameRef.current?.value,
          website: websiteRef.current?.value,
          address: businessAddressRef.current?.value,
          email: businessEmailRef.current?.value,
          logo_image_id: logo?.id,
          industry_id: industryRef.current?.value,
        }
        const response = await profileServices.createCompany(data)
        mutate("userProfile")
        setType("success")
        setMessage(response.message)
        setIsError(true)
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
        setLoading(false)
      }
    },
    [user, logo],
  )
  const goToProfile = React.useCallback(() => {
    router.push("/employer/profile/information")
  }, [])
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ bgcolor: "white" }} color="transparent" component="nav">
        <Toolbar sx={{ display: { xs: "flex" }, justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuLine />
          </IconButton>
          <Link href="/" underline="none">
            <Box sx={{ height: { xs: "1.5rem", sm: "3.2rem" }, width: { xs: "1.7rem", sm: "3.2rem" } }}>
              <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
            </Box>
          </Link>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {mainNav.map((item) => (
              <Button key={item.name} onClick={() => router.push(item.route)} variant="text">
                {item.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "block", sm: "block" } }}>
            <IconButton
              size="large"
              sx={{ color: "primary.main" }}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <NotificationsIcon />
              {/* <Badge badgeContent={17} color="error">
              </Badge> */}
            </IconButton>
            <IconButton onClick={goToProfile}>
              <Avatar
                sx={{ bgcolor: "primary.main" }}
                alt={`${user?.first_name} ${user?.last_name}`}
                src={user?.relationships.profile_image?.url}
              />
            </IconButton>
          </Box>
        </Toolbar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </AppBar>

      <Box component="main" sx={{ p: { xs: 0, md: 3 }, width: "100%" }}>
        <Toolbar />
        <Grid container spacing={2}>
          {/* <Grid sx={{ display: { xs: "none", md: "grid" } }} item sm={2}>
            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                borderRight: "1px solid #3E4095",
                color: "primary.dark",
                px: 1,
              }}
            >
              <Typography variant="h5" sx={{ my: 1 }}>
                Profile
              </Typography>
              <List>
                {navItems.map((item) => (
                  <ListItem key={item.name} disablePadding>
                    <ListItemButton
                      sx={{
                        textAlign: "left",
                        color: "primary.dark",
                        borderLeft: router.pathname !== item.route ? "none" : "4px solid #3E4095",
                      }}
                      onClick={() => router.push(item.route)}
                    >
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid> */}
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
      <BootstrapDialog
        PaperProps={{ style: { margin: 8 } }}
        open={user && !user?.has_created_company}
        fullWidth
        aria-labelledby="workhistory-modal-title"
        aria-describedby="workhistory-modal-description"
      >
        <BootstrapDialogTitle id="title-work-history">Create Company</BootstrapDialogTitle>
        <DialogContent>
          <Box onSubmit={handleCreateCompany} sx={{ width: "100%", mt: 2 }} component={"form"}>
            <Stack alignItems={"center"} sx={{ width: "100%", mb: 2 }} justifyContent="center">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  isImageLoading ? (
                    <CircularProgress />
                  ) : (
                    <IconButton
                      size="small"
                      sx={{ bgcolor: "primary.main" }}
                      aria-label="upload picture"
                      component="label"
                    >
                      <input onChange={handleFileChange} hidden accept="image/*" type="file" />
                      <PhotoCameraIcon fontSize="inherit" sx={{ color: "white" }} />
                    </IconButton>
                  )
                }
              >
                <Avatar sx={{ width: "84px", height: "84px" }} src={logo?.url} />
              </Badge>
            </Stack>

            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  required
                  id="business-profile-title"
                  inputRef={businessNameRef}
                  placeholder="Business Name"
                  label="Business Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  id="business-profile-address"
                  inputRef={businessAddressRef}
                  required
                  placeholder="Address"
                  label="Business/Office Address"
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="city-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={"user?.relationships.country?.id || countryId"}
                    label="Country"
                    onChange={({ target }) => setCountryId(target.value)}
                  >
                    {countryList?.map((country: { id: number; name: string }) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="state-simple-select-label">State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="state-select"
                    defaultValue={'user?.relationships.state?.id || ""'}
                    label="Gender"
                    // inputRef={stateRef}
                  >
                    {statesList?.map((state: { id: number; name: string }) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  placeholder="website"
                  inputRef={websiteRef}
                  id="profile-lastName"
                  label="Company website"
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  label="Company Email Address"
                  id="email-start-business"
                  placeholder="Email Address"
                  inputRef={businessEmailRef}
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel id="industries-select-label">Business Sector</InputLabel>
                  <Select
                    labelId="industries-select-label"
                    id="industries-select"
                    placeholder="Business sector"
                    label="Business Sector"
                    defaultValue={""}
                    inputRef={industryRef}
                  >
                    {businessSectors?.map((item: any) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                    {/* <MenuItem value={"female"}>Female</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} md={12}>
                <TextField
                  defaultValue={'user?.last_name || ""'}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Description"
                  // inputRef={lastNameRef}
                  id="profile-lastName"
                  label="Services Provided"
                  variant="outlined"
                />
              </Grid> */}

              <Grid item xs={12}>
                <LoadingButton
                  disabled={Boolean(!logo)}
                  loading={loading}
                  type="submit"
                  fullWidth
                  sx={{ px: 6 }}
                  variant="contained"
                >
                  Create
                </LoadingButton>
              </Grid>
            </Grid>

            {/* <Stack sx={{ mt: "1rem" }} direction="row" justifyContent="flex-end" alignItems="center">
              <LoadingButton loading={false} type="submit" fullWidth sx={{ px: 6 }} variant="contained">
                'create business'
              </LoadingButton>
            </Stack> */}
          </Box>
        </DialogContent>
      </BootstrapDialog>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}
