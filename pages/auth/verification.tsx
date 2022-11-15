import React from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import Link from "@mui/material/Link"
import useMediaQuery from "@mui/material/useMediaQuery"
import TextField from "@mui/material/TextField"

const Verification = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
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
        <Link href="/auth/login" underline="none">
          <Box sx={{ height: "4rem", width: "4rem" }}>
            <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
          </Box>
        </Link>
        <Typography sx={{ mt: { sm: 4, xs: 2 }, color: "primary.dark" }} variant="h5" component="h5">
          Account Verification
        </Typography>
        <Typography textAlign="center" sx={{ mt: { sm: 4, xs: 2 }, color: "primary.dark" }} variant="h6" component="h6">
          Check you email or phone number for verification token
        </Typography>
        <Typography textAlign="center" sx={{ m: { sm: 4, xs: 2 }, color: "#464646" }} variant="body2">
          An email has been sent to your email address. Check the inbox of your email account fot the verification token
          provided.
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
          <TextField sx={{ m: 2, width: "100%" }} id="token-verify" label="Verification Token" variant="outlined" />

          <Button sx={{ maxWidth: "25rem", m: 3, width: "100%" }} variant="contained">
            Continue
          </Button>
        </Box>

        <Typography
          textAlign="center"
          sx={{ width: "100%", color: "primary.dark", m: 2, fontSize: { xs: "0.875rem" } }}
        >
          Didn’t receive an email or SMS?
          <Button variant="text">Retry</Button>
        </Typography>
      </Paper>
    </Box>
  )
}

export default Verification

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
