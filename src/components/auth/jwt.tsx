"use client"

import { useSession } from "next-auth/react"

const JwtView = () => {
  const { data: session, update } = useSession()

  async function logSession() {
    console.log("session", session)
  }

  async function updateSession() {
    await update({
      ...session,
      expires: new Date().toISOString(),
      user: {
        ...session?.user,
        accessToken: "new-access-token",
      },
    })
  }

  if (!session) return <div>loading</div>

  return (
    <div>
      <h4>use buttons to log and update refresh token.</h4>

      <button onClick={updateSession}>Update Session</button>
      <button onClick={logSession}>Log Session</button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default JwtView
