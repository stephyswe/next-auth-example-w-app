import * as bcrypt from "bcrypt"

import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface RequestBody {
  email: string
  password: string
}
export async function POST(request: Request) {
  const credentials: RequestBody = await request.json()

  if (!credentials || !credentials.email || !credentials.password) {
    throw new Error("Invalid credentials")
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  })

  if (!user || !user?.hashedPassword) {
    throw new Error("Invalid credentials")
  }

  const isCorrectPassword = await bcrypt.compare(
    credentials.password,
    user.hashedPassword
  )

  if (!isCorrectPassword) {
    throw new Error("Invalid credentials")
  }

  const { hashedPassword, createdAt, id, ...dbUserWithoutPassword } = user

  return NextResponse.json(dbUserWithoutPassword)
}
