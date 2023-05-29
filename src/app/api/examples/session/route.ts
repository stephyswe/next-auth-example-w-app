// This is an example of how to access a session from an API route
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const formattedSession = JSON.stringify(session, null, 2)
  return new Response(formattedSession, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
