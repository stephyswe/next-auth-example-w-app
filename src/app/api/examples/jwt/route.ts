// This is an example of how to access a session from an API route
import { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function GET(req: NextRequest) {
  const token = await getToken({ req })
  const formattedToken = JSON.stringify(token, null, 2)
  return new Response(formattedToken, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
