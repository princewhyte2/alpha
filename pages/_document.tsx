import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.cdnfonts.com/css/circular-std" rel="stylesheet"></link>
      </Head>
      <body>
        <div id="splash">Loading...</div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
