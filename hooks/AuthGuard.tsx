import { useRouter } from "next/router"
import useSWR from "swr"
import Cookies from "js-cookie"
import Snackbar from "@mui/material/Snackbar"
import { usePWAInstall } from "react-use-pwa-install"
import Button from "@mui/material/Button"
import { useLayoutEffect, useEffect, useState } from "react"
import { useAuth } from "../store"
import { ConfirmProvider } from "material-ui-confirm"
import profileServices from "../services/profile"

export function AuthGuard({ children }: { children: JSX.Element }) {
  // const user = useAuth((state: any): any => state.user)
  const { data: user } = useSWR(Cookies.get("access_token") ? "userProfile" : null, profileServices.profileFetcher)
  const initializing = useAuth((state: any): any => state.initializing)
  const install = usePWAInstall()
  const router = useRouter()
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!user && !Cookies.get("access_token")) {
        // remember the page that user tried to access
        // setRedirect(router.route)
        router.push(`/auth/login?redirect=${router.route}`)
        return
      }
      if (user && Cookies.get("access_token") && !user?.has_verified_email) {
        router.push(`/auth/verification`)
        return
      }
      if (user && Cookies.get("access_token") && !user?.user_type) {
        router.push("/join-as")
        return
      }
    }
  }, [initializing, router, user])

  /* show loading indicator while the auth provider is still initializing */
  if (initializing) {
    return (
      <div className="splashScreen">
        <div className="ping">
          <img src="/fynder_logo.png" alt="finder" />{" "}
        </div>
      </div>
    )
  }

  // if auth initialized with a valid user show protected page
  if (!initializing && user) {
    return (
      <>
        <ConfirmProvider>
          {children}
          {install && (
            <Snackbar
              open={isShow}
              onClose={() => setIsShow(false)}
              message="Install Workfynder for easy access"
              action={
                <Button onClick={install} color="inherit" size="small">
                  install
                </Button>
              }
              sx={{ bottom: { xs: 90, sm: 0 } }}
            />
          )}
        </ConfirmProvider>
      </>
    )
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return (
    <div className="splashScreen">
      <div className="ping">
        <img src="/fynder_logo.png" alt="finder" />{" "}
      </div>
    </div>
  )
}
