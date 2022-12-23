import { ReactElement, useState } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import LoadingButton from "@mui/lab/LoadingButton"
import { styled, useTheme } from "@mui/material/styles"
import { MuiOtpInput } from "mui-one-time-password-input"
import useMediaQuery from "@mui/material/useMediaQuery"
import EmailIcon from "@mui/icons-material/Email"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import { useRouter } from "next/router"

function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  const handleChange = (newValue: string) => {
    setOtp(newValue)
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        Password & Security
      </Typography>
      <Button onClick={() => router.back()} variant="text" startIcon={<KeyboardBackspaceIcon />}>
        Change Phone Number
      </Button>
      <Typography variant="body2" sx={{ my: 1, color: "primary.dark" }}>
        To change your phone number, a token will be sent to your registered phone number
      </Typography>
      {/* <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "29.68rem",
          width: "100%",
        }}
        onSubmit={() => console.log("submit")}
      >
        <TextField
          id="email"
          margin="dense"
          fullWidth
          required
          disabled
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

        <LoadingButton
          loading={isLoading}
          type="submit"
          sx={{ maxWidth: "25rem", my: 4, width: { xs: "100%", md: "229px" }, alignSelf: "flex-end" }}
          variant="contained"
        >
          Send Token
        </LoadingButton>
          </Box> */}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "29.68rem",
          width: "100%",
        }}
        onSubmit={() => console.log("submit")}
      >
        {/* <OutlinedInput sx={{ width: "3.5rem", height: "3.5rem", borderRadius: "4px", border: "1px solid #BDBDBD" }} /> */}
        <MuiOtpInput display={"flex"} value={otp} onChange={handleChange} length={6} gap={matches ? 4 : 1} />
        <Typography textAlign="left" sx={{ width: "100%", color: "primary.dark", m: 2, fontSize: { xs: "0.875rem" } }}>
          Didn’t get a verification token?
          <Button onClick={() => console.log()} variant="text">
            Resend Token
          </Button>
        </Typography>
        <LoadingButton
          loading={isLoading}
          type="submit"
          sx={{ maxWidth: "25rem", my: 4, width: { xs: "100%", md: "229px" }, alignSelf: "flex-end" }}
          variant="contained"
        >
          Confirm
        </LoadingButton>
      </Box>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
