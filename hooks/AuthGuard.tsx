import { useRouter } from "next/router"
import { useLayoutEffect } from "react"
import { useAuth } from "../store"

export function AuthGuard({ children }: { children: JSX.Element }) {
  const user = useAuth((state: any): any => state.user)
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
