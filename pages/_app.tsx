import "../styles/globals.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { SWRDevTools } from "swr-devtools"
import { SWRConfig } from "swr"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useAuth } from "../store"
import CssBaseline from "@mui/material/CssBaseline"
import { AuthGuard } from "../hooks/AuthGuard"
import { NextPage } from "next"
import Head from "next/head"

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean
  getLayout?: any
}

export default function MyApp({ Component, pageProps }: { Component: NextApplicationPage; pageProps: any }) {
  // const router = useRouter()
  const [pageLoading, setPageLoading] = useState(true)
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

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false)
    }, 3000)
  }, [])

  const getLayout = Component.getLayout ?? ((page: any) => page)

  if (pageLoading) {
    return (
      <div className="splashScreen">
        <div className="ping">
          <img src="/fynder_logo.png" alt="finder" />{" "}
        </div>
      </div>
    )
  }

  return (
    <SWRConfig
      value={{
        dedupingInterval: 5000,
        errorRetryCount: 2,
      }}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Work fynder</title>
        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        {Component.requireAuth
          ? getLayout(
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>,
            )
          : getLayout(
              // public page
              <Component {...pageProps} />,
            )}
      </ThemeProvider>
    </SWRConfig>
  )
}
