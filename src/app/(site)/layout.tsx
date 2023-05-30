import { AuthHeader } from "@/components/header"
import Footer from "../../components/footer"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
      <Footer />
    </>
  )
}
