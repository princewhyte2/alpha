import Box from "@mui/material/Box"
import { styled, useTheme } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import LoadingButton from "@mui/lab/LoadingButton"
import useMediaQuery from "@mui/material/useMediaQuery"
import GoogleIcon from "../../components/icons/Google"
import FacebookIcon from "../../components/icons/Facebook"
import InputAdornment from "@mui/material/InputAdornment"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import IconButton from "@mui/material/IconButton"
import EmailIcon from "@mui/icons-material/Email"
import Link from "@mui/material/Link"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import OutlinedInput from "@mui/material/OutlinedInput"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import React, { useState, useRef } from "react"
import authService from "../../services/authentication"
import { ErrorComponent } from "../../components/alert"
import { validateEmail } from "../../utils"
import { useAuth } from "../../store"
import { useRouter } from "next/router"

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),

  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(4),
  },
  ".MuiDivider-root": {
    "&::before": {
      borderTopColor: "#1F204A",
    },
    "&::after": {
      borderTopColor: "#1F204A",
    },
  },
}))

const Login = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const setUser = useAuth((state: any) => state.setUser)
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const emailPhoneRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!emailPhoneRef.current || !passwordRef.current) return
    setIsLoading(true)
    try {
      let res: any
      if (validateEmail(emailPhoneRef.current.value)) {
        res = await authService.emailLogin(emailPhoneRef.current.value, passwordRef.current.value)
      } else {
        res = await authService.phoneLogin(emailPhoneRef.current.value, passwordRef.current.value)
      }
      setUser(res.result.user)
      localStorage.setItem("access_token", res.result.token)
      const { redirect = "/" } = router.query
      router.push(redirect as string)
    } catch (error: any) {
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
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper
        sx={{
          maxWidth: "42.75rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: `${matches ? "center" : "start"}`,
          py: 2,
          px: {
            xs: 3,
            sm: "5.25rem",
          },
          boxShadow: { md: 3 },
        }}
        elevation={matches ? 2 : 0}
      >
        <Link href="/auth/login" underline="none">
          <Box>
            <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
          </Box>
        </Link>
        <Typography sx={{ mt: { sm: 4, xs: 2 }, color: "primary.dark" }} variant="h5" component="h5">
          Welcome Back
        </Typography>
        <Button sx={{ mt: 2, color: "primary.dark" }} startIcon={<GoogleIcon />} variant="outlined">
          Log in with Google
        </Button>
        <Button sx={{ mt: 2, color: "primary.dark" }} startIcon={<FacebookIcon />} variant="outlined">
          Log in with Facebook
        </Button>
        <Root sx={{ px: { xs: 2 } }}>
          <Divider component="div" role="presentation">
            <Typography variant="h5" component="h5">
              or
            </Typography>
          </Divider>
        </Root>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "29.68rem",
            width: "100%",
          }}
          onSubmit={handleLogin}
        >
          <TextField
            sx={{ m: 1, width: "100%" }}
            id="email-or-phone"
            inputRef={emailPhoneRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="email or phonenumber" edge="end">
                    <EmailIcon sx={{ color: "primary.dark" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Email address, phone number"
            variant="outlined"
          />
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              inputRef={passwordRef}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "primary.dark" }} />
                    ) : (
                      <Visibility sx={{ color: "primary.dark" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", m: 1, width: "100%" }}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={<Typography sx={{ color: "primary.dark", fontSize: { xs: "0.815rem" } }}>Remember me</Typography>}
            />
            <Link href="/auth/forgot-password" underline="none">
              <Typography sx={{ color: "#1B1B1B", fontSize: { xs: "0.815rem" } }}>Forgot Password?</Typography>
            </Link>
          </Box>
          <LoadingButton
            loading={isLoading}
            type="submit"
            sx={{ maxWidth: "25rem", m: 1, width: "100%" }}
            variant="contained"
          >
            Login
          </LoadingButton>
        </Box>

        <Typography sx={{ color: "primary.dark", m: 1, fontSize: { xs: "0.875rem" } }}>
          Don’t have an account?{" "}
          <Link href="/auth/signup" underline="none">
            Sign up for free
          </Link>
        </Typography>
      </Paper>
      <ErrorComponent open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

export default Login

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
