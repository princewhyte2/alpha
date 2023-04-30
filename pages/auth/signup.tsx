import Box from "@mui/material/Box"
import { styled, useTheme } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import useMediaQuery from "@mui/material/useMediaQuery"
import Grid from "@mui/material/Grid"
import GoogleIcon from "../../components/icons/Google"
import FacebookIcon from "../../components/icons/Facebook"
import InputAdornment from "@mui/material/InputAdornment"
import Divider from "@mui/material/Divider"
import Cookies from "js-cookie"
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
import PhoneIcon from "@mui/icons-material/Phone"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import React, { useState, useRef, useMemo, useEffect } from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import authService from "../../services/authentication"
import { useRouter } from "next/router"
import { ErrorComponent } from "../../components/alert"
import { useAuth } from "../../store"
import { AlertColor } from "@mui/material"
import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  linkWithPopup,
  FacebookAuthProvider,
} from "firebase/auth"
import { auth } from "../../lib/firebaseConfig"

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

const googleProvider = new GoogleAuthProvider()

const facebookProvider = new FacebookAuthProvider()

const SignUp = () => {
  const theme = useTheme()
  const router = useRouter()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const setUser = useAuth((state: any) => state.setUser)
  const [showPassword, setShowPassword] = useState(false)
  const [type, setType] = useState<AlertColor>("error")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const emailRef = useRef<HTMLInputElement>()
  const firstNameRef = useRef<HTMLInputElement>()
  const lastNameRef = useRef<HTMLInputElement>()
  const phoneNumberRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const confirmPasswordRef = useRef<HTMLInputElement>()
  const termsRef = useRef<HTMLInputElement>()
  const policyRef = useRef<HTMLInputElement>()
  const referralRef = useRef<HTMLInputElement>()

  const refId = useMemo(() => router.query.ref, [router.query])

  useEffect(() => {
    if (refId && referralRef?.current) {
      referralRef.current.value = refId as string
    }
  }, [refId, referralRef])

  const handleRegisteration = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (
      !firstNameRef.current ||
      !lastNameRef.current ||
      !emailRef.current ||
      !phoneNumberRef.current ||
      !passwordRef.current ||
      !termsRef.current?.checked ||
      !policyRef.current?.checked ||
      !confirmPasswordRef.current
    )
      return
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setMessage("passwords don't match")
      setIsError(true)
      return
    }

    setIsLoading(true)
    try {
      const res: any = await authService.userRegistration({
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        phone_number: phoneNumberRef.current.value,
        password: passwordRef.current.value,
        referral_code: referralRef.current?.value,
      })
      setUser(res.result.user)
      setMessage("registration successful")
      setType("success")
      setIsError(true)
      // localStorage.setItem("access_token", res.result.token)
      Cookies.set("access_token", res.result.token, {
        expires: new Date(Date.now() + 5 * 600 * 600 * 10000),
      })
      router.push("/auth/verification")
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
  }

  const onGoogleLogin = async () => {
    try {
      let result: any
      if (auth?.currentUser) {
        result = await linkWithPopup(auth.currentUser, googleProvider)
      } else {
        result = await signInWithPopup(auth, googleProvider)
      }
      const gUser = result.user
      const res = await authService.socialSignUp(gUser.accessToken)

      const user = res.result.user

      setUser(user)
      // localStorage.setItem("access_token", res.result.token)
      Cookies.set("access_token", res.result.token, {
        expires: new Date(Date.now() + 5 * 600 * 600 * 10000),
      })
      setMessage("login successful")
      setType("success")
      setIsError(true)

      if (!user?.has_verified_email) {
        router.push("/auth/verification")
        return
      }
      if (!user?.user_type) {
        router.push("/join-as")
        return
      }
      if (!user?.has_verified_phone_number) {
        router.push(`/${user?.user_type}/profile/security/change-phone`)
        return
      }
      // const { redirect = "/profile/information" } = router.query
      const redirect = `/${user?.user_type}/feed`
      router.push(redirect)
    } catch (error: any) {
      // The provider's credential:
      let credential = GoogleAuthProvider.credentialFromError(error)
      // In case of auth/account-exists-with-different-credential error,
      // you can fetch the providers using this:
      if (error.code === "auth/credential-already-in-use" && credential) {
        try {
          const sign: any = await signInWithCredential(auth, credential)
          if (sign) {
            const res = await authService.socialSignUp(sign.user.accessToken)

            const user = res.result.user

            setUser(user)
            // localStorage.setItem("access_token", res.result.token)
            Cookies.set("access_token", res.result.token, {
              expires: new Date(Date.now() + 5 * 600 * 600 * 10000),
            })
            setMessage("login successful")
            setType("success")
            setIsError(true)

            if (!user?.has_verified_email) {
              router.push("/auth/verification")
              return
            }
            if (!user?.user_type) {
              router.push("/join-as")
              return
            }
            if (!user?.has_verified_phone_number) {
              router.push(`/${user?.user_type}/profile/security/change-phone`)
              return
            }
            // const { redirect = "/profile/information" } = router.query
            const redirect = `/${user?.user_type}/feed`
            router.push(redirect)
          }
        } catch (error) {
          //console.log(error)
        }

        return
      }
      setType("error")
      if (error.response) {
        //console.log("error is here 1", error)
        setMessage(error.response.data.message)
      } else if (error.request) {
        //console.log(error.request)
        //console.log("error is here 2", error)
      } else {
        //console.log("Error", error.message)
        //console.log("error is here 3", error)
      }
      setIsError(true)
    }
  }

  const onFaceBookLogin = async () => {
    try {
      let result: any

      if (auth?.currentUser) {
        result = await linkWithPopup(auth.currentUser, facebookProvider)
      } else {
        result = await signInWithPopup(auth, facebookProvider)
      }

      const res = await authService.socialSignUp(result.user.accessToken)

      // const user = res.user
      // const response = await authService.googleLogin()
      // //console.log("google", response)

      const user = res.result.user

      setUser(user)
      // localStorage.setItem("access_token", res.result.token)
      Cookies.set("access_token", res.result.token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      })

      setMessage("login successful")
      setType("success")
      setIsError(true)

      if (!user?.has_verified_email) {
        router.push("/auth/verification")
        return
      }
      if (!user?.user_type) {
        router.push("/join-as")
        return
      }
      if (!user?.has_verified_phone_number) {
        router.push(`/${user?.user_type}/profile/security/change-phone`)
        return
      }
      // const { redirect = "/profile/information" } = router.query
      const redirect = `/${user?.user_type}/feed`
      router.push(redirect)
    } catch (error: any) {
      // The provider's credential:
      let credential = FacebookAuthProvider.credentialFromError(error)
      // In case of auth/account-exists-with-different-credential error,
      // you can fetch the providers using this:
      if (error.code === "auth/credential-already-in-use" && credential) {
        try {
          const sign: any = await signInWithCredential(auth, credential)
          if (sign) {
            const res = await authService.socialLogin(sign.user.accessToken)

            const user = res.result.user

            setUser(user)
            // localStorage.setItem("access_token", res.result.token)
            Cookies.set("access_token", res.result.token, {
              expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
            })
            setMessage("login successful")
            setType("success")
            setIsError(true)

            if (!user?.has_verified_email) {
              router.push("/auth/verification")
              return
            }
            if (!user?.user_type) {
              router.push("/join-as")
              return
            }
            if (!user?.has_verified_phone_number) {
              router.push(`/${user?.user_type}/profile/security/change-phone`)
              return
            }
            // const { redirect = "/profile/information" } = router.query
            const redirect = `/${user?.user_type}/feed`
            router.push(redirect)
          }
        } catch (error) {
          //console.log(error)
        }

        return
      }
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
  }

  React.useEffect(() => {
    if (Cookies.get("access_token")) {
      Cookies.remove("access_token")
    }
  }, [])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: `${matches ? "center" : "start"}`,
        minHeight: "100vh",
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
        <Link href="/" underline="none">
          <Box sx={{ height: "4rem", width: "4rem" }}>
            <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
          </Box>
        </Link>
        <Typography sx={{ mt: { sm: 4, xs: 2 }, color: "primary.dark" }} variant="h5" component="h5">
          Create Account
        </Typography>
        <Button
          onClick={onGoogleLogin}
          sx={{ mt: 2, color: "primary.dark" }}
          startIcon={<GoogleIcon />}
          variant="outlined"
        >
          Sign up with Google
        </Button>
        <Button
          onClick={onFaceBookLogin}
          sx={{ mt: 2, color: "primary.dark" }}
          startIcon={<FacebookIcon />}
          variant="outlined"
        >
          Sign up with Facebook
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
          onSubmit={handleRegisteration}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "29.68rem",
            width: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                inputRef={firstNameRef}
                sx={{ width: "100%", my: { md: 1 } }}
                id="firstName"
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                inputRef={lastNameRef}
                sx={{ width: "100%", my: { md: 1 } }}
                id="lastName"
                label="Last Name"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField
            id="email"
            margin="dense"
            fullWidth
            required
            inputRef={emailRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Email" edge="end">
                    <EmailIcon sx={{ color: "primary.dark" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Email"
            variant="outlined"
          />
          <TextField
            margin="dense"
            fullWidth
            required
            id="phone"
            inputRef={phoneNumberRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Phone Number" edge="end">
                    <PhoneIcon sx={{ color: "primary.dark" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Phone Number"
            variant="outlined"
          />

          <TextField
            margin="dense"
            inputRef={referralRef}
            InputProps={{
              readOnly: Boolean(refId),
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: "100%", my: { md: 1 } }}
            id="refId"
            label="Referral Code"
            placeholder="Referral Code"
            variant="outlined"
          />

          <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="signup-password">Password</InputLabel>
            <OutlinedInput
              id="signup-password"
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
          <TextField
            margin="dense"
            fullWidth
            required
            type={showPassword ? "text" : "password"}
            inputRef={confirmPasswordRef}
            id="confirm-password-signup"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
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
              ),
            }}
            label="Confirm Password"
            variant="outlined"
          />

          <FormControlLabel
            sx={{ my: 1, width: "100%" }}
            inputRef={termsRef}
            control={<Checkbox required />}
            label={
              <Typography sx={{ color: "primary.dark", fontSize: { xs: "0.815rem" } }}>
                I agree to Workfinder <Link href="#">Terms & Conditions</Link>
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ my: 1, width: "100%" }}
            inputRef={policyRef}
            control={<Checkbox required />}
            label={
              <Typography sx={{ color: "primary.dark", fontSize: { xs: "0.815rem" } }}>
                I understand that Workfinder will process my information in accordance with their{" "}
                <Link href="#">Privacy Policy</Link>.
              </Typography>
            }
          />

          <LoadingButton
            loading={isLoading}
            type="submit"
            sx={{ maxWidth: "25rem", m: 1, width: "100%" }}
            variant="contained"
          >
            Create Account
          </LoadingButton>
        </Box>

        <Typography sx={{ color: "primary.dark", m: 1, fontSize: { xs: "0.875rem" } }}>
          Already have an account?{" "}
          <Link href="/auth/login" underline="none">
            Login
          </Link>
        </Typography>
      </Paper>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

export default SignUp

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
