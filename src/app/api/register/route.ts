import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

interface RequestBody {
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()

    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.error("REGISTRATION ERROR", error.message, error.stack, error)
    return new NextResponse(error.message, { status: 500 })
  }
}
