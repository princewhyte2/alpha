import * as React from "react"
import SearchIcon from "@mui/icons-material/Search"
import Link from "@mui/material/Link"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import CircularProgress from "@mui/material/CircularProgress"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import Menu from "@mui/material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import Collapse from "@mui/material/Collapse"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import useSWR, { useSWRConfig } from "swr"
import { styled, alpha } from "@mui/material/styles"
import Badge from "@mui/material/Badge"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import useScrollTrigger from "@mui/material/useScrollTrigger"
// import Badge from "@mui/material/Badge"
import { useTheme, Theme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import { useMount, useSetState } from "react-use"

import InputBase from "@mui/material/InputBase"
import Cookies from "js-cookie"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Autocomplete from "@mui/material/Autocomplete"
import Avatar from "@mui/material/Avatar"
import MenuLine from "../icons/MenuLine"
import { useRouter } from "next/router"
import MoreIcon from "@mui/icons-material/MoreVert"
import profileServices from "../../services/profile"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import FormControl from "@mui/material/FormControl"
import EmailIcon from "@mui/icons-material/Email"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import LoadingButton from "@mui/lab/LoadingButton"
import DialogTitle from "@mui/material/DialogTitle"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import DialogContent from "@mui/material/DialogContent"
import utilsService from "../../services/utils"
import uploadService from "../../services/upload"
import LogoutIcon from "@mui/icons-material/Logout"
import { ErrorComponent } from "../alert"
import notificationsServices from "../../services/notifications"
import { useArtisanSearch } from "../../store"
import useDebounce from "../../hooks/useDebounce"
import connectionService from "../../services/connection"
import { signOut } from "firebase/auth"
import { auth } from "../../lib/firebaseConfig"
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride"

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactNode | React.ReactElement
  window?: () => Window
  onClose?: any
}

const drawerWidth = 240
const profileNav = [
  {
    name: "Information",
    route: "/artisan/profile/information",
  },
  {
    name: "My Work",
    route: "/artisan/profile/mywork",
  },
  {
    name: "Password & Security",
    route: "/artisan/profile/security",
  },
  {
    name: "Referral",
    route: "/artisan/profile/referral",
  },
]

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

function ElevationScroll(props: Props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  //@ts-ignore
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const employerProfileNav = [
  {
    name: "Information",
    route: "/employer/profile/information",
  },

  {
    name: "Password & Security",
    route: "/employer/profile/security",
  },
  {
    name: "Referral",
    route: "/employer/profile/referral",
  },
]

const employerMainNav = [
  {
    name: "Your Feed",
    route: "/employer/feed",
    className: "feeds-section",
  },
  {
    name: "Connection",
    route: "/employer/connection",
    className: "connection-section",
  },
  {
    name: "My Jobs",
    route: "/employer/jobs",
    className: "my-jobs-section",
  },
  {
    name: "Messaging",
    route: "/messaging",
    className: "messaging-section",
  },
  {
    name: "Profile",
    route: "/employer/profile/information",
    className: "profile-section",
  },
]

const mainNav = [
  {
    name: "Your Feed",
    route: "/artisan/feed",
    className: "feeds-section",
  },
  {
    name: "Connection",
    route: "/artisan/connection",
    className: "connection-section",
  },
  {
    name: "Jobs",
    route: "/artisan/jobs",
    className: "my-jobs-section",
  },
  {
    name: "Messaging",
    route: "/messaging",
    className: "messaging-section",
  },
  {
    name: "Profile",
    route: "/artisan/profile/information",
    className: "profile-section",
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

const onLogout = () => {
  Cookies.remove("access_token")

  if (typeof window !== undefined) {
    window.location.href = `${window?.location?.origin}/auth/login`
    signOut(auth)
  }
}

export default function NavLayout(props: Props) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const { data: user, error } = useSWR(
    Cookies.get("access_token") ? "userProfile" : null,
    profileServices.profileFetcher,
    {
      dedupingInterval: 10000,
    },
  )
  const { window, children } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const router = useRouter()
  const [open, setOpen] = React.useState(true)

  const [loading, setLoading] = React.useState(false)
  const [isImageLoading, setIsImageLoading] = React.useState(false)
  const [logo, setLogo] = React.useState<any>()
  // const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const { data: businessSectors } = useSWR(
    user?.user_type === "employer" ? "businessSectors" : null,
    utilsService.getBusinessSectors,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  // const [countryId, setCountryId] = React.useState("160")
  const { mutate } = useSWRConfig()

  const handleClick = React.useCallback(() => {
    setOpen(!open)
  }, [open])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const goToProfile = React.useCallback(() => {
    router.push(`/${user?.user_type}/profile/information`)
  }, [user])

  //error handler
  const [message, setMessage] = React.useState("An error occured")
  const [isError, setIsError] = React.useState(false)
  const [type, setType] = React.useState<"error" | "success">("error")

  //references to form
  const businessNameRef = React.useRef<HTMLInputElement>()
  const websiteRef = React.useRef<HTMLInputElement>()
  const businessEmailRef = React.useRef<HTMLInputElement>()
  const businessAddressRef = React.useRef<HTMLInputElement>()
  // const industryRef = React.useRef<HTMLInputElement>()
  const [industryId, setIndustryId] = React.useState<{ id: number; name: string } | null | undefined>()

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", color: "primary.dark" }}>
      {/* <Typography variant="h6" sx={{ mx: 1, my: 1 }}>
        Profile
      </Typography> */}
      <Link href="/" underline="none">
        <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
          <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
        </Box>
      </Link>
      <Divider />
      {!user ? (
        <List>
          <ListItem>
            <Button onClick={() => router.push("/auth/signup")} sx={{ width: "100%" }} variant="contained">
              Sign up
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => router.push("/auth/login")} sx={{ width: "100%" }} variant="text">
              Login
            </Button>
          </ListItem>
        </List>
      ) : user?.user_type === "artisan" ? (
        <List>
          {mainNav.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                className={item.className}
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
                  sx={{ color: router.pathname !== item.route ? "#344054" : "#3E4095" }}
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
                    sx={{ color: router.pathname !== item.route ? "#344054" : "#3E4095" }}
                    primary={item.name}
                  />
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </List>
      ) : (
        <List>
          {employerMainNav.map((item) => (
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
                className={item.className}
                sx={{ textAlign: "left", color: "primary.dark" }}
              >
                <ListItemText
                  sx={{ color: router.pathname !== item.route ? "#344054" : "#3E4095" }}
                  primary={item.name}
                />
                {item.name !== "Profile" ? null : open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
          ))}
          <Collapse in={open} timeout="auto" unmountOnExit>
            {employerProfileNav.map((item) => (
              <List key={item.name} component="div" disablePadding>
                <ListItemButton onClick={() => router.push(item.route)} sx={{ pl: 4 }}>
                  <ListItemText
                    sx={{ color: router.pathname !== item.route ? "#344054" : "#3E4095" }}
                    primary={item.name}
                  />
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </List>
      )}
      {user && (
        <List>
          <ListItem>
            <Button
              startIcon={<LogoutIcon />}
              onClick={(e: any) => {
                e.stopPropagation()
                onLogout()
              }}
              sx={{ width: "100%" }}
              color="error"
              variant="outlined"
            >
              Logout
            </Button>
          </ListItem>
        </List>
      )}
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
      //   //console.log(resp)
      // mutate("userProfile")
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
          ...(Boolean(websiteRef.current?.value) && { website: websiteRef.current?.value }),
          // website: websiteRef.current?.value,
          address: businessAddressRef.current?.value,
          email: businessEmailRef.current?.value,
          // logo_image_id: logo?.id,
          ...(Boolean(logo) && { logo_image_id: logo?.id }),
          // industry_id: industryRef.current?.value,
          industry_id: industryId?.id,
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
          //console.log(error.request)
        } else {
          //console.log("Error", error.message)
        }
        setIsError(true)
      } finally {
        setLoading(false)
      }
    },
    [user, logo, industryId],
  )

  const { data: notifications } = useSWR(user ? "notifications" : null, notificationsServices.getALlNotifications, {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  })

  const unreadNotification = React.useMemo(() => {
    const unread = notifications?.filter((item: any) => item.read_at === null)
    return unread?.length || 0
  }, [notifications])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => router.push(`/${user.user_type}/notification`)}>
        <IconButton
          onClick={() => router.push(`/${user.user_type}/notification`)}
          size="large"
          aria-label="new notifications"
          sx={{ color: "primary.main" }}
        >
          <Badge badgeContent={unreadNotification} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={goToProfile}>
        <IconButton
          size="small"
          onClick={goToProfile}
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {user?.user_type === "artisan" ? (
            <Avatar alt={`${user?.first_name}`} src={user?.relationships.profile_image?.url} />
          ) : (
            <Avatar alt={`${user?.relationships.company?.name}`} src={user?.relationships.company?.logo_image?.url} />
          )}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  const searchTerm: string = useArtisanSearch((state: any) => state.searchTerm)
  const setSearchTerm = useArtisanSearch((state: any) => state.setSearchTerm)

  const debouncedSearch = useDebounce(searchTerm, 1000)

  const onViewConnection = React.useCallback(
    (userId: string) => () => {
      router.push(`/profile/${userId}`)
      setSearchTerm("")
    },
    [],
  )

  const { data: approvedConnectionList } = useSWR(
    user ? "approvedConnections" : null,
    connectionService.getApprovedUserConnections,
  )
  //TODO : scale this algorightm later

  const isConnection = React.useCallback(
    (userId: string) => {
      return approvedConnectionList?.some((item: any) => item.id == userId)
    },
    [approvedConnectionList],
  )

  const { data: usersList } = useSWR(
    debouncedSearch ? `/search/artisans/employers?searchTerm=${debouncedSearch}` : null,
    utilsService.searchUsers,
    // {
    //   keepPreviousData: true,
    // },
  )

  const sendConnectionRequest = React.useCallback(
    async (userId: string) => {
      if (!user) {
        router.push("/auth/login")
        return
      }
      try {
        const response = await connectionService.sendConnectionRequest(userId)
        mutate("unApprovedConnections")
        mutate("approvedConnections")
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
    [user],
  )

  const [{ run, steps }, setState] = useSetState<any>({
    run: false,
    steps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: "center",
        target: "body",
      },
      {
        content: <h2>Search Here</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: ".search-intro",
      },
      {
        content: "section for feeds",
        placement: "bottom",
        styles: {
          options: {
            width: 300,
          },
        },
        target: ".feeds-section",
        title: "Feeds",
      },
      {
        content: <h2>Section for Connections</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: ".connection-section",
      },
      {
        content: <h2>Section for Jobs</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: ".my-jobs-section",
      },
      {
        content: <h2>Section for Messaging</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: ".messaging-section",
      },
      {
        content: <h2>Edit your profile</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: ".profile-section",
      },
    ],
  })

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setState({ run: false })
    }

    // logGroup(type, data)
  }

  React.useEffect(() => {
    if (user) {
      setState({ run: true })
    }
  }, [user])

  // React.useEffect(() => {
  //   if (!user?.user_type) {
  //     router.push("/join-as")
  //     return
  //   }

  //   if (!user?.has_verified_phone_number) {
  //     router.push(`/${user?.user_type}/profile/security/change-phone`)
  //   } else if (!user?.has_verified_email) {
  //     router.push(`/${user?.user_type}/profile/security/change-email`)
  //   }
  // }, [user])

  const defaultProps = {
    options: businessSectors,
    getOptionLabel: (option: { id: number; name: string }) => option.name,
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Container disableGutters maxWidth="xl">
        <ElevationScroll {...props}>
          <AppBar sx={{ bgcolor: "white" }} color="transparent" component="nav">
            <Container disableGutters maxWidth="xl">
              <Joyride
                callback={handleJoyrideCallback}
                continuous
                hideCloseButton
                run={run}
                scrollToFirstStep
                showProgress
                showSkipButton
                steps={steps}
                styles={{
                  options: {
                    zIndex: 10000,
                  },
                }}
              />
              <Toolbar sx={{ display: { xs: "flex" }, justifyContent: "space-between" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: "none" } }}
                >
                  <MenuLine />
                </IconButton>

                <Link sx={{ display: { xs: "none", md: "inline-block" } }} href="/" underline="none">
                  <Box sx={{ height: { xs: "1.5rem", sm: "3.2rem" }, width: { xs: "1.7rem", sm: "3.2rem" } }}>
                    <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
                  </Box>
                </Link>
                <Search className="search-intro">
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                    }}
                    value={searchTerm}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>

                {user &&
                  (user?.user_type === "artisan" ? (
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                      {mainNav.map((item) => (
                        <Button
                          key={item.name}
                          className={item.className}
                          onClick={() => router.push(item.route)}
                          variant={router.pathname !== item.route ? "text" : "outlined"}
                        >
                          {item.name}
                        </Button>
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                      {employerMainNav.map((item) => (
                        <Button
                          key={item.name}
                          className={item.className}
                          onClick={() => router.push(item.route)}
                          variant={router.pathname !== item.route ? "text" : "outlined"}
                        >
                          {item.name}
                        </Button>
                      ))}
                    </Box>
                  ))}

                <Box sx={{ display: { xs: "block", md: "block" } }}>
                  {!user ? (
                    <>
                      <Button
                        sx={{ display: { xs: "none", md: "inline-block" } }}
                        onClick={() => router.push("/auth/login")}
                        variant="text"
                      >
                        Login
                      </Button>
                      <Button
                        sx={{ display: { xs: "none", md: "inline-block" } }}
                        onClick={() => router.push(`/auth/signup`)}
                        variant="contained"
                      >
                        Sign up
                      </Button>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                          onClick={() => router.push(`/${user.user_type}/notification`)}
                          size="large"
                          aria-label="new notifications"
                          sx={{ color: "primary.main" }}
                        >
                          <Badge badgeContent={unreadNotification} color="error">
                            <NotificationsIcon />
                          </Badge>
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={goToProfile}
                          aria-label="account of current user"
                          aria-controls="primary-search-account-menu"
                          aria-haspopup="true"
                          color="inherit"
                        >
                          {user?.user_type === "artisan" ? (
                            <Avatar alt={`${user?.first_name}`} src={user?.relationships.profile_image?.url} />
                          ) : (
                            <Avatar
                              alt={`${user?.relationships.company?.name}`}
                              src={user?.relationships.company?.logo_image?.url}
                            />
                          )}
                        </IconButton>
                        <Button
                          startIcon={<LogoutIcon />}
                          onClick={() => {
                            onLogout()
                          }}
                          color="error"
                          variant="outlined"
                        >
                          Logout
                        </Button>
                      </Box>
                      <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                          onClick={() => router.push(`/${user.user_type}/notification`)}
                          size="large"
                          aria-label="new notifications"
                          sx={{ color: "primary.main" }}
                        >
                          <Badge badgeContent={unreadNotification} color="error">
                            <NotificationsIcon />
                          </Badge>
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={goToProfile}
                          aria-label="account of current user"
                          aria-controls="primary-search-account-menu"
                          aria-haspopup="true"
                          color="inherit"
                        >
                          {user?.user_type === "artisan" ? (
                            <Avatar alt={`${user?.first_name}`} src={user?.relationships.profile_image?.url} />
                          ) : (
                            <Avatar
                              alt={`${user?.relationships.company?.name}`}
                              src={user?.relationships.company?.logo_image?.url}
                            />
                          )}
                        </IconButton>
                        {/* <IconButton
                          size="large"
                          aria-label="show more"
                          aria-controls={mobileMenuId}
                          aria-haspopup="true"
                          onClick={handleMobileMenuOpen}
                          color="inherit"
                        >
                          <MoreIcon />
                        </IconButton>
                        {renderMobileMenu} */}
                      </Box>
                    </>
                  )}
                </Box>
              </Toolbar>
            </Container>

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
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
              >
                {drawer}
              </Drawer>
            </Box>
          </AppBar>
        </ElevationScroll>
        <Box component="main" sx={{ p: { xs: 0, md: 0 }, width: "100%" }}>
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
          open={Boolean(debouncedSearch)}
          fullWidth
          fullScreen
          aria-labelledby="workhistory-modal-title"
          aria-describedby="workhistory-modal-description"
        >
          <BootstrapDialogTitle
            id="title-work-history"
            onClose={() => {
              setSearchTerm("")
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={10} md={10}>
                <TextField
                  fullWidth
                  required
                  id="search-show"
                  value={searchTerm}
                  placeholder="Search occupation,artisan ..."
                  label="Search occupation,artisan ..."
                  variant="outlined"
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="Search for artisans.." edge="start">
                          <SearchIcon sx={{ color: "primary.dark" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </BootstrapDialogTitle>
          <DialogContent>
            <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "#1F204A", mb: 2 }}>
              Search result for “{searchTerm}”
            </Typography>
            <Stack direction="column" spacing={1}>
              {usersList?.map((item: any) => (
                <Paper
                  key={item.id}
                  elevation={1}
                  sx={{
                    p: 2,
                    boxShadow:
                      " 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                >
                  <Stack
                    onClick={onViewConnection(item.id)}
                    direction="row"
                    alignItems={{ xs: "start", md: "center" }}
                    spacing={{ xs: 1, md: 3 }}
                    sx={{ cursor: "pointer" }}
                  >
                    <Avatar
                      alt={item.first_name}
                      src={
                        item.relationships?.company
                          ? item.relationships?.company?.logo_image?.url
                          : item.relationships?.profile_image?.url
                      }
                      sx={{ width: { xs: "48px", md: "100px" }, height: { xs: "48px", md: "100px" } }}
                    />
                    <Stack
                      sx={{ flexGrow: 1 }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                    >
                      <Stack direction="column" spacing={1}>
                        <Typography sx={{ fontSize: { xs: 14, md: 16 } }} color="primary.main">
                          {item.relationships?.company
                            ? item.relationships?.company?.name
                            : `${item.first_name} ${item.last_name}`}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "#667085" }}>
                          {item.relationships?.company
                            ? item.relationships?.company?.business_sector?.name
                            : item.title}
                        </Typography>
                        {/* <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                          {item.relationships?.skills.map((skill: any) => (
                            <Chip key={skill.id} size={matches ? "medium" : "small"} label={skill.name} />
                          ))}
                        </Stack> */}
                      </Stack>
                      {!isConnection(item.id) && (
                        <Stack direction="column" alignItems={"flex-end"} spacing={1}>
                          {!matches ? (
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation()
                                sendConnectionRequest(item.id)
                              }}
                              color="primary"
                              aria-label="options"
                            >
                              <PersonAddAlt1Icon />
                            </IconButton>
                          ) : (
                            <Button
                              size={matches ? "medium" : "small"}
                              onClick={(e) => {
                                e.stopPropagation()
                                sendConnectionRequest(item.id)
                              }}
                              variant="contained"
                            >
                              Connect
                            </Button>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </DialogContent>
        </BootstrapDialog>
        <BootstrapDialog
          PaperProps={{ style: { margin: 8 } }}
          // open={true}
          open={Boolean(user && user?.user_type === "employer" && !user?.has_created_company)}
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
                  {/* <FormControl fullWidth>
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
                     
                    </Select>
                  </FormControl> */}
                  <Autocomplete
                    fullWidth
                    {...defaultProps}
                    onChange={(_ev, val) => setIndustryId(val)}
                    renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Business Sector" />}
                  />
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
                  <LoadingButton loading={loading} type="submit" fullWidth sx={{ px: 6 }} variant="contained">
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
      </Container>
    </Box>
  )
}
