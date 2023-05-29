import AuthContext from "./AuthContext"
import ToasterContext from "./ToastContext"

export interface RootContextProps {
  children: React.ReactNode
}

export default function RootContext({ children }: RootContextProps) {
  return (
    <AuthContext>
      <ToasterContext />
      {children}
    </AuthContext>
  )
}
