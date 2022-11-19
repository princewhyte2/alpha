import React, { useState, useRef } from "react"

import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Link from "@mui/material/Link"
import InputAdornment from "@mui/material/InputAdornment"
import PhoneIcon from "@mui/icons-material/Phone"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import EmailIcon from "@mui/icons-material/Email"
import LoadingButton from "@mui/lab/LoadingButton"
import authService from "../../services/authentication"
import { useRouter } from "next/router"
import { ErrorComponent } from "../../components/alert"

const ForgotPassword = () => {
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [isLoading, setIsLoading] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [receipient, setReceipient] = useState("")
  const emailRef = useRef<HTMLInputElement>()
  const phoneNumRef = useRef<HTMLInputElement>()
  const emailOtpRef = useRef<HTMLInputElement>()
  const phoneNumOtpRef = useRef<HTMLInputElement>()

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      if (tabValue === 0) {
        //check if we are handling otp verification
        if (!showOtp) {
          if (!emailRef.current) return
          setIsLoading(true)
          await authService.forgotPasswordEmail(emailRef.current.value)
          setReceipient(emailRef.current.value)
          emailRef.current.value = ""
          setShowOtp(true)
        } else {
          if (!emailOtpRef.current) return
          //handle the otp here
          router.push(`/auth/reset-password?token=${emailOtpRef.current.value}&receipient=${receipient}`)
        }
      } else if (tabValue) {
        if (!showOtp) {
          if (!phoneNumRef.current) return
          setIsLoading(true)
          await authService.forgotPasswordPhone(phoneNumRef.current.value)
          setReceipient(phoneNumRef.current.value)
          phoneNumRef.current.value = ""
          setShowOtp(true)
        } else {
          if (!phoneNumOtpRef.current) return
          router.push(`/auth/reset-password?token=${phoneNumOtpRef.current.value}&receipient=${receipient}`)
          //handle the otp here
        }
      }
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
          boxShadow: { md: 2 },
        }}
        variant={matches ? "outlined" : undefined}
      >
        <Link href="/auth/login" underline="none">
          <Box sx={{ height: "4rem", width: "4rem" }}>
            <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
          </Box>
        </Link>
        <Typography sx={{ mt: { sm: 4, xs: 2 }, color: "primary.dark" }} variant="h5" component="h5">
          Forgot Password
        </Typography>

        <Typography
          textAlign="center"
          sx={{ m: { sm: 4, xs: 2 }, color: "#464646", maxWidth: "24rem" }}
          variant="body2"
        >
          Can’t remember your password? You can reset it with either your email address or phone number
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleChange} aria-label="password recovery tabs">
            <Tab label="Email Address" {...a11yProps(0)} />
            <Tab label="Phone Number" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box
            component="form"
            onSubmit={handleForgotPassword}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "29.68rem",
              width: "100%",
            }}
          >
            <Typography textAlign="center" sx={{ m: { sm: 4, xs: 2 }, color: "#464646" }} variant="body2">
              {!showOtp
                ? "Type your email address to get a link to reset your password"
                : "Input your OTP to reset your password"}
            </Typography>
            {!showOtp ? (
              <TextField
                sx={{ m: 2, width: "100%" }}
                id="email-password"
                label="Email address"
                inputRef={emailRef}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="email" edge="end">
                        <EmailIcon sx={{ color: "primary.dark" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <TextField
                inputRef={emailOtpRef}
                sx={{ m: 2, width: "100%" }}
                id="otp-email"
                label="OTP Code"
                variant="outlined"
              />
            )}

            <LoadingButton
              type="submit"
              loading={isLoading}
              sx={{ maxWidth: "25rem", m: 3, width: "100%" }}
              variant="contained"
            >
              Continue
            </LoadingButton>
          </Box>
        )}
        {tabValue === 1 && (
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "29.68rem",
              width: "100%",
            }}
            onSubmit={handleForgotPassword}
          >
            <Typography
              textAlign="center"
              sx={{ m: { sm: 4, xs: 2 }, color: "#464646", width: "100%" }}
              variant="body2"
            >
              {!showOtp
                ? "Input your phone number to get a OTP to enable you reset your password"
                : "Input your OTP to reset your password"}
            </Typography>
            {!showOtp ? (
              <TextField
                sx={{ m: 2, width: "100%" }}
                id="phone-password"
                label="Phone Number"
                variant="outlined"
                inputRef={phoneNumRef}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="phonenumber" edge="end">
                        <PhoneIcon sx={{ color: "primary.dark" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <TextField
                inputRef={phoneNumOtpRef}
                sx={{ m: 2, width: "100%" }}
                id="otp-phone"
                label="OTP Code"
                variant="outlined"
              />
            )}

            <LoadingButton
              type="submit"
              loading={isLoading}
              sx={{ maxWidth: "25rem", m: 3, width: "100%" }}
              variant="contained"
            >
              Continue
            </LoadingButton>
          </Box>
        )}
      </Paper>
      <ErrorComponent open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

export default ForgotPassword

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
