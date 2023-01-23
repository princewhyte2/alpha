import React, { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material/styles"
import Link from "@mui/material/Link"
import useMediaQuery from "@mui/material/useMediaQuery"
import TextField from "@mui/material/TextField"
import authService from "../../services/authentication"
import { ErrorComponent } from "../../components/alert"
import { useRouter } from "next/router"
import { AlertColor } from "@mui/lab/Alert"

const Verification = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState("An error occured")
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState<AlertColor>("error")
  const router = useRouter()
  const tokenRef = useRef<HTMLInputElement>()

  const handleEmailVerification = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const token = tokenRef.current?.value
    if (!token) return
    setIsLoading(true)
    try {
      await authService.verifyEmail(token)
      setMessage("Verification successfull")
      setType("success")
      setIsError(true)
      router.push("/join-as")
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error", error.message)
      }
      setType("error")
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
          Account Verification
        </Typography>
        <Typography textAlign="center" sx={{ mt: { sm: 4, xs: 2 }, color: "primary.dark" }} variant="h6" component="h6">
          Check you email or phone number for verification token
        </Typography>
        <Typography textAlign="center" sx={{ m: { sm: 4, xs: 2 }, color: "#464646" }} variant="body2">
          An email has been sent to your email address. Check the inbox of your email account for the verification token
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
          onSubmit={handleEmailVerification}
        >
          <TextField
            inputRef={tokenRef}
            sx={{ m: 2, width: "100%" }}
            id="token-verify"
            label="Verification Token"
            variant="outlined"
          />

          <LoadingButton
            type="submit"
            loading={isLoading}
            sx={{ maxWidth: "25rem", m: 3, width: "100%" }}
            variant="contained"
          >
            Continue
          </LoadingButton>
        </Box>

        <Typography
          textAlign="center"
          sx={{ width: "100%", color: "primary.dark", m: 2, fontSize: { xs: "0.875rem" } }}
        >
          Didn’t receive an email or SMS?
          <Button
            onClick={(): Promise<any> => authService.resendEmailToken().catch((err: any) => console.log(err))}
            variant="text"
          >
            Retry
          </Button>
        </Typography>
      </Paper>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

export default Verification

// Verification.requireAuth = true

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
