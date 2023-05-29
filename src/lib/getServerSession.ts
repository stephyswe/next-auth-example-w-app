import { Session } from "next-auth"
import { getSession } from "./getSession"

export default async function getServerSessionAction() {
  try {
    const session = await getSession()
    if (!session) return null
    return session as Session
  } catch (error) {
    return null
  }
}
