import { useRouter } from "next/router"
import useSWR from "swr"
import Cookies from "js-cookie"
import { useLayoutEffect, useEffect } from "react"
import { useAuth } from "../store"
import profileServices from "../services/profile"

export function AuthGuard({ children }: { children: JSX.Element }) {
  // const user = useAuth((state: any): any => state.user)
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const initializing = useAuth((state: any): any => state.initializing)
  const router = useRouter()

  useEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!Cookies.get("access_token")) {
        // remember the page that user tried to access
        // setRedirect(router.route)
        router.push(`/auth/login?redirect=${router.route}`)
      }
      if (user && Cookies.get("access_token") && !user?.has_verified_email) {
        router.push(`/auth/verification`)
      }
      if (user && Cookies.get("access_token") && !user?.user_type) {
        router.push("/join-as")
      }
    }
  }, [initializing, router, user])

  /* show loading indicator while the auth provider is still initializing */
  if (initializing) {
    return <h1>Application Loading</h1>
  }

  // if auth initialized with a valid user show protected page
  if (!initializing && user) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}
