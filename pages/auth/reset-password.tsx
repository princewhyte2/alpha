import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
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
import React, { useRef, useState } from "react"
import authService from "../../services/authentication"
import { useRouter } from "next/router"
import { ErrorComponent } from "../../components/alert"
import { useReset } from "../../store"
import { AlertColor } from "@mui/lab"

const ResetPassword = () => {
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")
  const resetPasswordRef = useRef<HTMLInputElement>()
  const confirmPasswordRef = useRef<HTMLInputElement>()
  const reset = useReset((state: any) => state.reset)

  const handleResetpassword = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const password = resetPasswordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value
    if (!password || !confirmPassword) return
    if (password !== confirmPassword) {
      setMessage("Password don't match")
      setIsError(true)
      return
    }
    setIsLoading(true)
    try {
      const token = reset.token
      const email_or_phone_number = reset.email
      if (!token || !email_or_phone_number) return
      await authService.resetPassword({ token, password, email_or_phone_number })
      setMessage("reset password successfull")
      setType("success")
      setIsError(true)
      router.push("/auth/login")
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
          justifyContent: `${matches ? "center" : "start"}`,
          alignItems: "center",
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
          <Box sx={{ height: "4rem", width: "4rem" }}>
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
          onSubmit={handleResetpassword}
        >
          <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              inputRef={resetPasswordRef}
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
            required
            fullWidth
            type={showPassword ? "text" : "password"}
            inputRef={confirmPasswordRef}
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

          <LoadingButton
            loading={isLoading}
            type="submit"
            sx={{ maxWidth: "25rem", m: 4, width: "100%" }}
            variant="contained"
          >
            Reset Password
          </LoadingButton>
        </Box>
      </Paper>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

export default ResetPassword

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
