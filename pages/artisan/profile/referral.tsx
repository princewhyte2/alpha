import { ReactElement, useCallback, useState } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import useSWR from "swr"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme, Theme } from "@mui/material/styles"
import { useRouter } from "next/router"
import CancelIcon from "@mui/icons-material/Cancel"
import IconButton from "@mui/material/IconButton"
import profileServices from "../../../services/profile"
import { ErrorComponent } from "../../../components/alert"
import NavLayout from "../../../components/layouts/nav"

function Page() {
  const theme = useTheme()
  const [isError, setIsError] = useState(false)
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const router = useRouter()

  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(`${origin}/auth/signup?ref=${user?.referrer_code}`)
    setIsError(true)
  }, [user])

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
        <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
          Referral
        </Typography>
        {!matches && (
          <IconButton
            aria-label="close"
            onClick={() => router.back()}
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>
        )}
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography variant="body1" sx={{ my: 1, color: "primary.dark" }}>
          Tortor vitae porttitor purus nibh Tortor vitae porttitor purus nibh.
        </Typography>
      </Stack>
      <Box
        sx={{
          bgcolor: "primary.main",
          borderRadius: "0.5rem",
          width: "100%",
          maxWidth: "647px",
        }}
      >
        <Box sx={{ py: "2rem", borderBottom: "1px dashed white", width: "100%" }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
            <Typography variant="body1" sx={{ my: 1, color: "white" }}>
              Your Referral Points:
            </Typography>
            <Typography variant="h6" sx={{ my: 1, color: "white" }}>
              {user?.referrer_point}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ py: "2rem", width: "100%" }}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-around" alignItems="center" spacing={2}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
              <Typography variant="body1" sx={{ my: 1, color: "white" }}>
                Your Referrals:
              </Typography>
              <Typography variant="h6" sx={{ my: 1, color: "white" }}>
                {user?.relationships.referrals.length}
              </Typography>
            </Stack>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
              <Typography variant="body1" sx={{ my: 1, color: "white" }}>
                Your Referral Link:
              </Typography>
              <Box>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography variant="body2" sx={{ my: 1, color: "white" }}>
                    {origin}/auth/signup?ref={user?.referrer_code}
                  </Typography>
                  <Button
                    onClick={handleCopyClick}
                    sx={{ color: "white" }}
                    variant="text"
                    startIcon={<ContentCopyIcon sx={{ color: "white" }} />}
                  >
                    Copy link
                  </Button>
                </Stack>
              </Box>
              <ErrorComponent
                type={"success"}
                open={isError}
                message={"Copied to clipboard!"}
                handleClose={() => setIsError(false)}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
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
