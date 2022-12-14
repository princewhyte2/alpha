import type { ReactElement } from "react"
import Box from "@mui/material/Box"
import ProfileLayout from "../../components/layouts/profile"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

function Page() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ my: 1, color: "primary.dark" }}>
        Referral
      </Typography>
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
              0
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
                0
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
                    www.workfinder.ng/ref=olakunle01
                  </Typography>
                  <Button
                    sx={{ color: "white" }}
                    variant="text"
                    startIcon={<ContentCopyIcon sx={{ color: "white" }} />}
                  >
                    Copy link
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Page
