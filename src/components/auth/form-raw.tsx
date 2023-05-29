"use client"

import axios from "axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

interface CredentialsFormProps {
  csrfToken?: string
}

type Variant = "LOGIN" | "REGISTER"

export default function CredentialsForm({ csrfToken }: CredentialsFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [variant, setVariant] = useState<Variant>("LOGIN")

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    if (variant === "REGISTER") {
      const payload = {
        name: data.get("name") as string,
        email: data.get("email") as string,
        password: data.get("password") as string,
      }

      axios
        .post("/api/register", payload)
        .then(() =>
          signIn("credentials", {
            ...payload,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.ok) {
            router.push("/timeline")
          }
        })
      //.catch(() => toast.error("Something went wrong!"))
      //.finally(() => setIsLoading(false));
    } else {
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email: data.get("email") as string,
        password: data.get("password") as string,
      })

      if (signInResponse && signInResponse.error) {
        console.log("signInResponse", signInResponse)
        setError("Invalid credentials")
      } else {
        router.push("/auth/protected")
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full mt-8"
    >
      {error && <p className="text-red-500">{error}</p>}
      {variant === "REGISTER" && (
        <>
          <label className="text-lg font-semibold text-white">Name</label>
          <input
            name="name" // Add the name attribute here
            className="w-full p-2 mt-2 mb-4 text-lg font-semibold text-black rounded-md"
            type="name"
            placeholder="Name"
          />
        </>
      )}
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label className="text-lg font-semibold text-white">Email address</label>
      <input
        name="email" // Add the name attribute here
        className="w-full p-2 mt-2 mb-4 text-lg font-semibold text-black rounded-md"
        type="email"
        placeholder="Email address"
      />
      <label className="text-lg font-semibold text-white">Password</label>
      <input
        name="password" // Add the name attribute here
        className="w-full p-2 mt-2 mb-4 text-lg font-semibold text-black rounded-md"
        type="password"
        placeholder="Password"
      />
      <button
        type="submit"
        className="w-full p-2 mt-2 mb-4 text-lg font-semibold text-white bg-blue-500 rounded-md"
      >
        {variant === "LOGIN" ? "Login" : "Register"}
      </button>
      <div onClick={toggleVariant} className="underline cursor-pointer">
        {variant === "LOGIN" ? "Create an account" : "Login"}
      </div>
    </form>
  )
}
