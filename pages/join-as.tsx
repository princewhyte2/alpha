import { useCallback, useState } from "react"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled, useTheme } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
// import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { AlertColor } from "@mui/material"
import Link from "@mui/material/Link"
import profileServices from "../services/profile"
import { useRouter } from "next/router"
import { ErrorComponent } from "../components/alert"

const JoinAs = () => {
  const router = useRouter()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  const onJoinAsArtisan = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const response = await profileServices.joinAsArtisan()

      setMessage(response?.message)
      setType("success")
      setIsError(true)
      router.push("/artisan/profile/information")
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
  }, [isLoading])

  const onJoinAsEmployer = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const response = await profileServices.joinAsEmployer()
      setMessage(response?.message)
      setType("success")
      setIsError(true)
      router.push("/employer/profile/information")
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
  }, [isLoading])

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
          //   boxShadow: { md: 3 },
        }}
        elevation={0}
      >
        <Link href="/auth/login" underline="none">
          <Box>
            <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
          </Box>
        </Link>
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Stack sx={{ p: 4 }} direction={{ xs: "column", md: "row" }} spacing={2}>
            <Paper
              onClick={onJoinAsArtisan}
              sx={{
                height: "297px",
                width: "100%",
                borderRadius: "8px",
                cursor: "pointer",
                p: 4,
                boxShadow:
                  "0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
              }}
            >
              <Stack
                sx={{ height: "100%" }}
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Box sx={{ width: "11.14rem", height: "12.496rem" }}>
                  <img className="img" src="/artisan.webp" alt="finder" width="auto" height={"100%"} />
                </Box>
                <Typography sx={{ color: "primary.main", fontSize: 16 }}>Join as an Artisan</Typography>
              </Stack>
            </Paper>
            <Paper
              onClick={onJoinAsEmployer}
              sx={{
                height: "297px",
                width: "100%",
                borderRadius: "8px",
                p: 4,
                cursor: "pointer",
                boxShadow:
                  "0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
              }}
            >
              <Stack
                direction="column"
                sx={{ height: "100%" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Box sx={{ width: "11.14rem", height: "12.496rem", mt: 4 }}>
                  <img className="img" src="/employer.webp" alt="finder" height={"auto"} width={"100%"} />
                </Box>

                <Typography sx={{ color: "primary.main", fontSize: 16 }}>Join as an Employer</Typography>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Paper>
      <ErrorComponent type={type} open={isError} message={message} handleClose={() => setIsError(false)} />
    </Box>
  )
}

export default JoinAs
