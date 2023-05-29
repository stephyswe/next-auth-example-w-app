import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.error("REGISTRATION ERROR", error.message, error.stack, error)
    return new NextResponse(error.message, { status: 500 })
  }
}
