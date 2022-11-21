import "../styles/globals.css"
import { useEffect } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useAuth } from "../store"
import { AuthGuard } from "../hooks/AuthGuard"
import { NextPage } from "next"

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
}

export default function MyApp({ Component, pageProps }: { Component: NextApplicationPage; pageProps: any }) {
  const setInitializing = useAuth((state: any) => state.setInitializing)
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3E4095",
        dark: "#1F204A",
      },
    },
    typography: {
      fontFamily: ["Circular Std", "sans-serif"].join(","),
      button: {
        textTransform: "none",
      },
    },
  })

  useEffect(() => {
    setInitializing(false)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        // public page
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  )
}
