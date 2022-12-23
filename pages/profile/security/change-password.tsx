import { ReactElement, useState } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import LoadingButton from "@mui/lab/LoadingButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import useMediaQuery from "@mui/material/useMediaQuery"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import IconButton from "@mui/material/IconButton"
import FormControl from "@mui/material/FormControl"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useRouter } from "next/router"

function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        Password & Security
      </Typography>
      <Button onClick={() => router.back()} variant="text" startIcon={<KeyboardBackspaceIcon />}>
        Change Password
      </Button>
      <Typography variant="body2" sx={{ my: 1, color: "primary.dark" }}>
        Please provide your current password and choose a new password.
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
        onSubmit={() => console.log("submit")}
      >
        <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-security-password">Current Password</InputLabel>
          <OutlinedInput
            id="outlined-security-password"
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
            label="Current Password"
          />
        </FormControl>
        <TextField
          margin="dense"
          required
          fullWidth
          type={showPassword ? "text" : "password"}
          id="confirm-security-password-reset"
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
          label="New Password"
          variant="outlined"
        />
        <TextField
          margin="dense"
          required
          fullWidth
          type={showPassword ? "text" : "password"}
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
          label="Confirm New Password"
          variant="outlined"
        />
        <Typography variant="body2" sx={{ my: 1, color: "primary.main", alignSelf: "flex-start" }}>
          Can’t remember my password.
        </Typography>

        <LoadingButton
          loading={isLoading}
          type="submit"
          sx={{ maxWidth: "25rem", my: 4, width: { xs: "100%", md: "229px" }, alignSelf: "flex-end" }}
          variant="contained"
        >
          Save Changes
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
