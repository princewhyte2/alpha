import { ReactElement, useState, useRef, useCallback, FormEvent, useEffect } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import LoadingButton from "@mui/lab/LoadingButton"
import MenuItem from "@mui/material/MenuItem"
import useSWR, { useSWRConfig } from "swr"
import { AlertColor } from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
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
import NavLayout from "../../../../components/layouts/nav"

function Page() {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { data: securityQuestions } = useSWR("securityQuestions", securityService.getSecurityQuestionsFetcher)
  const { data: userSecurityQuestion } = useSWR(
    "userSecurityQuestions",
    securityService.getUserSecurityQuestionsFetcher,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [questionId, setQuestionId] = useState(() => "")

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionId(event.target.value)
  }

  useEffect(() => {
    if (userSecurityQuestion?.question) {
      setQuestionId(userSecurityQuestion?.question?.id)
    }
  }, [userSecurityQuestion])

  //error handler
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  const answerRef = useRef<HTMLInputElement>()
  // const questionRef = useRef<HTMLInputElement>()

  const handleSaveSecurityQuestion = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      answer: answerRef.current?.value,
      question_id: questionId,
    }
    setIsLoading(true)
    try {
      const response = await securityService.saveUserSecurityQuestion(data as SecurityQuestionPostData)
      setMessage(response?.message)
      setType("success")
      setIsError(true)
      mutate("userSecurityQuestions")
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
        Generate Security Question
      </Button>
      <Typography variant="body2" sx={{ my: 1, color: "primary.dark" }}>
        Kindly create your security question(s) to further protect your account
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
        onSubmit={handleSaveSecurityQuestion}
      >
        <FormControl required fullWidth margin="dense">
          <InputLabel id="security-simple-select-label">Security Question</InputLabel>
          <Select
            // defaultValue={userSecurityQuestion ? Number(userSecurityQuestion?.question?.id) : ""}
            // inputRef={questionRef}
            labelId="security-select-label"
            id="security-select"
            label="Security Question"
            value={questionId}
            onChange={handleChange}
          >
            {securityQuestions?.map((question: SecurityQuestion) => (
              <MenuItem key={question.id} value={String(question.id)}>
                {question.question}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="dense"
          inputRef={answerRef}
          required
          fullWidth
          type={showPassword ? "text" : "password"}
          id="security-answer"
          placeholder="Type your answer"
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
          label="Answer"
          variant="outlined"
        />

        <LoadingButton
          loading={isLoading}
          type="submit"
          sx={{ maxWidth: "25rem", my: 4, width: { xs: "100%", md: "229px" }, alignSelf: "flex-end" }}
          variant="contained"
        >
          Save Changes
        </LoadingButton>
      </Box>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>
}

export default Page

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}
