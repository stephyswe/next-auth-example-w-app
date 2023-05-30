import { withAuth } from "next-auth/middleware"
import { signInRoute } from "./src/lib/constants"

export default withAuth({
  pages: {
    signIn: signInRoute,
  },
})

export const config = {
  matcher: ["/matcher/:path*"],
}
