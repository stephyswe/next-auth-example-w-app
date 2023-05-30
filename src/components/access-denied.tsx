import { signIn } from "next-auth/react"

import { defaultSignInRoute } from "@/lib/constants"

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href={defaultSignInRoute}
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
    </>
  )
}
