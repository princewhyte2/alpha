import { useCallback, useState, useEffect } from "react"
import Box from "@mui/material/Box"
import useMediaQuery from "@mui/material/useMediaQuery"
import CardMedia from "@mui/material/CardMedia"
import { styled, useTheme } from "@mui/material/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import useSWR, { useSWRConfig } from "swr"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { AlertColor } from "@mui/material"
import Link from "@mui/material/Link"
import profileServices from "../services/profile"
import { useRouter } from "next/router"
import { ErrorComponent } from "../components/alert"

const images = [
  {
    label: "Mechanic",
    imgPath: "/mechanic.webp",
  },
  {
    label: "Hair stylist",
    imgPath: "/hairstylelistone.webp",
  },
  {
    label: "hair Stylist 2",
    imgPath: "/hairstylelisttwo.webp",
  },
  {
    label: "Two tailors",
    imgPath: "/twotailors.webp",
  },
]
const JoinAs = () => {
  const router = useRouter()
  const theme = useTheme()
  const { data: user, error } = useSWR("userProfile", profileServices.profileFetcher, {
    dedupingInterval: 10000,
  })
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const { mutate } = useSWRConfig()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("An error occured")
  const [isError, setIsError] = useState(false)
  const [type, setType] = useState<AlertColor>("error")

  useEffect(() => {
    if (user?.user_type) {
      router.push(`/${user?.user_type}/profile/information`)
    }
  }, [user])

  const onJoinAsArtisan = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const response = await profileServices.joinAsArtisan()
      mutate("userProfile")
      setMessage(response?.message)
      setType("success")
      setIsError(true)
      router.replace("/artisan/profile/information")
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
      mutate("userProfile")
      setMessage(response?.message)
      setType("success")
      setIsError(true)
      router.replace("/employer/profile/information")
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
        <Link href="/" underline="none">
          <Box>
            <img src="/fynder_logo.png" alt="finder" height={"100%"} width={"auto"} />
          </Box>
        </Link>
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Stack sx={{ p: 4 }} direction={{ xs: "column", md: "row" }} spacing={2}>
            <Paper
              onClick={onJoinAsArtisan}
              sx={{
                // height: "297px",
                width: "100%",
                borderRadius: "8px",
                cursor: "pointer",
                p: { xs: 2, md: 4 },
                boxShadow:
                  "0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06), 0px 8px 48px #EEEEEE",
              }}
            >
              <Stack
                sx={{ height: "100%", width: { xs: "100%", md: "11.14rem" } }}
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                {/* <Box sx={{ width: "11.14rem", height: "12.496rem" }}>
                  <img className="img" src="/artisan.webp" alt="finder" width="auto" height={"100%"} />
                </Box> */}

                <Grid container sx={{ width: "100%", flexGrow: 1 }} spacing={1}>
                  {images.map((item) => (
                    <Grid key={item.label} item xs={6}>
                      <CardMedia component="img" height="100%" image={item.imgPath} alt={item.label} />
                    </Grid>
                  ))}
                </Grid>
                <Typography sx={{ color: "primary.main", fontSize: 16 }}>Join as an Artisan</Typography>
              </Stack>
            </Paper>
            <Paper
              onClick={onJoinAsEmployer}
              sx={{
                // height: "297px",
                width: "100%",
                borderRadius: "8px",
                p: { xs: 2, md: 4 },
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
                <Grid container sx={{ width: "100%", flexGrow: 1 }} spacing={1}>
                  <Grid item xs={12}>
                    <Box sx={{ width: { xs: "100%", md: "11.14rem", flexGrow: 1 }, height: "12.496rem" }}>
                      <img className="img" src="/employer.webp" alt="finder" height={"auto"} width={"100%"} />
                    </Box>
                  </Grid>
                </Grid>

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

// JoinAs.requireAuth = true

export default JoinAs
