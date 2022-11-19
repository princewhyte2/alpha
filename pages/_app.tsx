import Head from "next/head"
import "../styles/globals.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
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
  return (
    <>
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
        <link href="https://fonts.cdnfonts.com/css/circular-std" rel="stylesheet"></link>
        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>

      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
