import { User } from "@prisma/client"
import { getSession } from "./getSession"

export default async function getCurrentUser() {
  try {
    const session = await getSession()
    if (!session) return null
    return session.user as User
  } catch (error) {
    return null
  }
}
