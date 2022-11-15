import React, { useState } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import InputAdornment from "@mui/material/InputAdornment"
import PhoneIcon from "@mui/icons-material/Phone"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import EmailIcon from "@mui/icons-material/Email"

const ForgotPassword = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [showOtp, setShowOtp] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          maxWidth: "42.75rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          px: {
            xs: 3,
            sm: "5.25rem",
          },
          boxShadow: { md: 1 },
        }}
        elevation={matches ? 2 : 0}
        variant={matches ? "outlined" : undefined}
      >
        <Box sx={{ height: { sm: "4rem", xs: "2.6rem" }, width: { sm: "4rem", xs: "2.6rem" } }}>
          <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
        </Box>
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
              <TextField sx={{ m: 2, width: "100%" }} id="otp-email" label="OTP Code" variant="outlined" />
            )}

            <Button sx={{ maxWidth: "25rem", m: 3, width: "100%" }} variant="contained">
              Continue
            </Button>
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
              <TextField sx={{ m: 2, width: "100%" }} id="otp-phone" label="OTP Code" variant="outlined" />
            )}

            <Button sx={{ maxWidth: "25rem", m: 3, width: "100%" }} variant="contained">
              Continue
            </Button>
          </Box>
        )}
      </Paper>
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
