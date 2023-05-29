import { getSession } from "./getSession"

export default async function getCurrentUser() {
  try {
    const session = await getSession()
    if (!session) return null
    return session.user
  } catch (error) {
    return null
  }
}
