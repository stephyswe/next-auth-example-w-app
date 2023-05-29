// This is an example of how to access a session from an API route
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextApiRequest } from "next"

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req })
  const formattedToken = JSON.stringify(token, null, 2)
  return new Response(formattedToken, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
