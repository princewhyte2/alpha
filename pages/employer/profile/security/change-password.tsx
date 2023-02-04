import { ReactElement, useState, useRef, useCallback, FormEvent } from "react"
import useSWR, { useSWRConfig } from "swr"
import { AlertColor } from "@mui/material"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import ProfileLayout from "../../../../components/layouts/profile"
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
import securityService from "../../../../services/security"
import { ErrorComponent } from "../../../../components/alert"
import EmployerProfileLayout from "../../../../components/layouts/employerProfile"
import EmployerNavLayout from "../../../../components/layouts/employernav"
import NavLayout from "../../../../components/layouts/nav"

function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  const { data: userSecurityQuestion } = useSWR(
    "userSecurityQuestions",
    securityService.getUserSecurityQuestionsFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  //input refs
  const answerRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const newPasswordRef = useRef<HTMLInputElement>()
  const confirmPasswordRef = useRef<HTMLInputElement>()

  const handleUpdatePassword = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newPasswordRef.current?.value !== confirmPasswordRef.current?.value) {
      setMessage("New password don't match")
      setType("error")
      setIsError(true)
      return
    }

    const data = {
      answer: answerRef.current?.value,
      current_password: passwordRef.current?.value,
      new_password: newPasswordRef.current?.value,
      confirm_password: confirmPasswordRef.current?.value,
    }

    setIsLoading(true)

    try {
      const response = await securityService.updatePassword(data as UpdatePasswordPostData)
      router.replace("/auth/login")
      setMessage(response?.message)
      setType("success")
      setIsError(true)
    } catch (error: any) {
      setType("error")
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
  }, [])

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
      {userSecurityQuestion?.question ? (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "29.68rem",
            width: "100%",
          }}
          onSubmit={handleUpdatePassword}
        >
          <FormControl required sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-security-password">Current Password</InputLabel>
            <OutlinedInput
              id="outlined-security-password"
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
              label="Current Password"
            />
          </FormControl>
          <TextField
            inputRef={newPasswordRef}
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
            inputRef={confirmPasswordRef}
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

          <TextField
            fullWidth
            id="security-title-question"
            label={userSecurityQuestion?.question?.question}
            placeholder="Answer"
            variant="outlined"
            required
            // defaultValue={projectData?.title || ""}
            inputRef={answerRef}
            sx={{ my: "1rem" }}
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
      ) : (
        <Link
          href="/employer/profile/security/question"
          variant="body2"
          sx={{ my: 1, color: "primary.main", alignSelf: "flex-start" }}
        >
          Please set your security question and return.
        </Link>
      )}
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout>
      <EmployerProfileLayout>{page}</EmployerProfileLayout>
    </NavLayout>
  )
}

Page.requireAuth = true

export default Page

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
