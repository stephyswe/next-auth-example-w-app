"use client"

import { useSession } from "next-auth/react"

export default function Page() {
  const session = useSession()

  if (session?.data?.user?.role === "USER") {
    return <p>You are an admin, welcome!</p>
  }

  return (
    <>
      <h1>This page is protected by Middleware</h1>
      <p>Only admin users can see this page.</p>
      <p>
        To learn more about the NextAuth middleware see&nbsp;
        <a href="https://next-auth.js.org/configuration/nextjs#middleware">
          the docs
        </a>
        .
      </p>
    </>
  )
}
