import JwtView from "../../../components/auth/jwt"

export default async function JwtPage() {
  // await loginIsRequiredServer()
  return (
    <>
      <h1>Jwt Strategy</h1>
      <JwtView />
    </>
  )
}
