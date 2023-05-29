"use client"

import { BsGithub, BsGoogle } from "react-icons/bs"
import { IconType } from "react-icons"
import { signIn } from "next-auth/react"
import { FC, useState } from "react"
import { toast } from "react-hot-toast"

interface SocialSignInButtonProps {
  icon: IconType
  provider: string
}

const SocialSignInButton: FC<SocialSignInButtonProps> = ({
  icon: Icon,
  provider,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const socialAction = () => {
    setIsLoading(true)

    // NextAuth Social Sign In
    signIn(provider, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!")
        }

        if (callback?.ok) {
          toast.success("Logged in Social!")
          // router.push("/conversations");
        }
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false))
  }

  return (
    <button
      type="button"
      onClick={socialAction}
      className="
        inline-flex
        w-full
        justify-center
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:bg-gray-50
        focus:outline-offset-0
      "
    >
      <Icon />
    </button>
  )
}

export const GithubSignInButton = () => {
  return <SocialSignInButton icon={BsGithub} provider="github" />
}

export const GoogleSignInButton = () => {
  return <SocialSignInButton icon={BsGoogle} provider="google" />
}
