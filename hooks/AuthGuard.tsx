import { useRouter } from "next/router"
import useSWR from "swr"
import { useLayoutEffect } from "react"
import { useAuth } from "../store"
import profileServices from "../services/profile"

export function AuthGuard({ children }: { children: JSX.Element }) {
  // const user = useAuth((state: any): any => state.user)
  const { data: user } = useSWR("userProfile", profileServices.profileFetcher)
  const initializing = useAuth((state: any): any => state.initializing)
  const router = useRouter()

  useLayoutEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!user) {
        // remember the page that user tried to access
        // setRedirect(router.route)
        router.push(`/auth/login?redirect=${router.route}`)
      }
      if (user && !user?.has_verified_email) {
        router.push(`/auth/verification`)
      }
      if (user && !user?.user_type) {
        router.push("/join-as")
        return
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
