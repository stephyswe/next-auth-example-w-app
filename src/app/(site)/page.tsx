import AuthPage from "@/components/auth/auth-page"

export default function RootPage() {
  return (
    <>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
      <AuthPage />
    </>
  )
}
