import { loginIsRequiredServer } from "@/lib/getLoginIsRequired"

export default async function MatcherPage() {
  await loginIsRequiredServer()
  return (
    <>
      <h1>Matcher Page</h1>
      <p>
        <strong>
          This page redirects if you are not signed in. You can access the
          content because you are currently authenticated.
        </strong>
      </p>
    </>
  )
}
