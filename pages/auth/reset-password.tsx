import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import IconButton from "@mui/material/IconButton"
import FormControl from "@mui/material/FormControl"
import OutlinedInput from "@mui/material/OutlinedInput"
import Link from "@mui/material/Link"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import React, { useState } from "react"

const ResetPassword = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        py: 4,
      }}
    >
      <Paper
        sx={{
          maxWidth: "42.75rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: `${matches ? "center" : "start"}`,
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
        <Link href="/auth/login" underline="none">
          <Box sx={{ height: { sm: "4rem", xs: "2.6rem" }, width: "4rem" }}>
            <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
          </Box>
        </Link>
        <Typography sx={{ m: { sm: 4, xs: 2 }, color: "primary.dark" }} variant="h4" component="h4">
          Reset Password
        </Typography>

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
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
            id="confirm-password-reset"
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

          <Button sx={{ maxWidth: "25rem", m: 4, width: "100%" }} variant="contained">
            Reset Password
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default ResetPassword

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
