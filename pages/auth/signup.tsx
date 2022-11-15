import Box from "@mui/material/Box"
import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Grid from "@mui/material/Grid"
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
import PhoneIcon from "@mui/icons-material/Phone"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import React, { useState } from "react"

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

const SignUp = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Paper
        sx={{
          maxWidth: "42.75rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "auto",
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
          Create Account
        </Typography>
        <Button sx={{ mt: 2, color: "primary.dark" }} startIcon={<GoogleIcon />} variant="outlined">
          Sign up with Google
        </Button>
        <Button sx={{ mt: 2, color: "primary.dark" }} startIcon={<FacebookIcon />} variant="outlined">
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
              <TextField sx={{ width: "100%", my: { md: 1 } }} id="firstName" label="First Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField sx={{ width: "100%", my: { md: 1 } }} id="lastName" label="Last Name" variant="outlined" />
            </Grid>
          </Grid>
          <TextField
            id="email"
            margin="dense"
            fullWidth
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
            id="phone"
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
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="signup-password">Password</InputLabel>
            <OutlinedInput
              id="signup-password"
              type={showPassword ? "text" : "password"}
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
            control={<Checkbox defaultChecked />}
            label={
              <Typography sx={{ color: "primary.dark", fontSize: { xs: "0.815rem" } }}>
                I agree to Workfinder <Link href="#">Terms & Conditions</Link>
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ my: 1, width: "100%" }}
            control={<Checkbox defaultChecked />}
            label={
              <Typography sx={{ color: "primary.dark", fontSize: { xs: "0.815rem" } }}>
                I understand that Workfinder will process my information in accordance with their{" "}
                <Link href="#">Privacy Policy</Link>.
              </Typography>
            }
          />

          <Button sx={{ maxWidth: "25rem", m: 1, width: "100%" }} variant="contained">
            Create Account
          </Button>
        </Box>

        <Typography sx={{ color: "primary.dark", m: 1, fontSize: { xs: "0.875rem" } }}>
          Already have an account?{" "}
          <Link href="/auth/login" underline="none">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default SignUp

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
