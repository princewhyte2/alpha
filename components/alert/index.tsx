import React from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { AlertColor } from "@mui/material"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorComponent = ({
  open,
  handleClose,
  message,
  type = "error",
}: {
  message: string
  open: boolean
  handleClose: () => void
  type?: AlertColor
}) => {
  return (
    <Snackbar
      key={"top-center"}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}!
      </Alert>
    </Snackbar>
  )
}
