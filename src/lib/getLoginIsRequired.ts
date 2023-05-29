import { redirect } from "next/navigation"
import { getSession } from "./getSession"

export async function loginIsRequiredServer() {
  const session = await getSession()
  if (!session) return redirect("/auth/signin")
}
