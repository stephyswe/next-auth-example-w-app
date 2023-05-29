import { getServerSession } from "next-auth/next"
import { authOptions } from "../app/api/auth/[...nextauth]/auth"

export async function getSession() {
  return await getServerSession(authOptions)
}
