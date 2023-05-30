import { redirect } from "next/navigation"
import { getSession } from "./getSession"
import { signInRoute } from "./constants"

export async function loginIsRequiredServer() {
  const session = await getSession()
  if (!session) return redirect(signInRoute)
}
