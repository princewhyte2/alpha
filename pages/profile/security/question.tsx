import { ReactElement, useState } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import LoadingButton from "@mui/lab/LoadingButton"
import MenuItem from "@mui/material/MenuItem"
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
        onSubmit={() => console.log("submit")}
      >
        <FormControl fullWidth margin="dense">
          <InputLabel id="security-simple-select-label">Security Question</InputLabel>
          <Select
            labelId="security-select-label"
            id="security-select"
            value={0}
            label="Select Question"
            onChange={() => console.log("here")}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="answer"
          margin="dense"
          fullWidth
          required
          placeholder="Type your answer"
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
