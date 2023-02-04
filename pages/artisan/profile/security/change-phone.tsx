import { ReactElement, useState, useRef, useCallback, FormEvent } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import LoadingButton from "@mui/lab/LoadingButton"
import Link from "@mui/material/Link"
import { styled, useTheme } from "@mui/material/styles"
import { AlertColor } from "@mui/material"
import useSWR, { useSWRConfig } from "swr"
import { MuiOtpInput } from "mui-one-time-password-input"
import PhoneIcon from "@mui/icons-material/Phone"
import useMediaQuery from "@mui/material/useMediaQuery"
import EmailIcon from "@mui/icons-material/Email"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputAdornment from "@mui/material/InputAdornment"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import { useRouter } from "next/router"
import securityService from "../../../../services/security"
import { ErrorComponent } from "../../../../components/alert"
import { validateEmail } from "../../../../utils"
import profileServices from "../../../../services/profile"
import NavLayout from "../../../../components/layouts/nav"

function Page() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("")
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  const answerRef = useRef<HTMLInputElement>()
  const phoneNumberRef = useRef<HTMLInputElement>()

  const { data: userSecurityQuestion } = useSWR(
    "userSecurityQuestions",
    securityService.getUserSecurityQuestionsFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const handleUpdatePhone = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (!validateEmail(emailRef.current?.value as string)) {
    //   setMessage("invalid email")
    //   setType("error")
    //   setIsError(true)
    //   return
    // }

    const data = {
      answer: answerRef.current?.value,
      phone_number: phoneNumberRef.current?.value,
    }

    setIsLoading(true)

    try {
      // @ts-ignore
      const response = await profileServices.updateMainNumber(data)
      mutate("userProfile")
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
      {userSecurityQuestion?.question ? (
        <Box
          component="form"
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "29.68rem",
            width: "100%",
          }}
          onSubmit={handleUpdatePhone}
        >
          <TextField
            id="change-phone"
            margin="dense"
            fullWidth
            required
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
            inputRef={phoneNumberRef}
          />

          <TextField
            fullWidth
            id="security-title-question"
            label={userSecurityQuestion?.question?.question}
            placeholder="Answer"
            variant="outlined"
            required
            inputRef={answerRef}
            sx={{ my: "1rem" }}
          />

          <LoadingButton
            loading={isLoading}
            type="submit"
            sx={{ maxWidth: "25rem", my: 4, width: { xs: "100%", md: "229px" }, alignSelf: "flex-end" }}
            variant="contained"
          >
            Send Token
          </LoadingButton>
        </Box>
      ) : (
        <Link
          href="/artisan/profile/security/question"
          variant="body2"
          sx={{ my: 1, color: "primary.main", alignSelf: "flex-start" }}
        >
          Please set your security question and return.
        </Link>
      )}
      {/* <Box
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
        <OutlinedInput sx={{ width: "3.5rem", height: "3.5rem", borderRadius: "4px", border: "1px solid #BDBDBD" }} />
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
      </Box> */}
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <NavLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </NavLayout>
  )
}

Page.requireAuth = true

export default Page

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
