"use client"

import { signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import Link from "next/link"

interface SessionInfoProps {
  session: any
}

const SessionInfo: React.FC<SessionInfoProps> = ({ session }) => {
  const isSignedIn = !!session

  if (isSignedIn) {
    const { email, name, image } = session.user

    return (
      <>
        {image && (
          <span
            style={{ backgroundImage: `url('${image}')` }}
            className={styles.avatar}
          />
        )}
        <span className={styles.signedInText}>
          <small>Signed in as</small>
          <br />
          <strong>{email ?? name} - </strong>
          <small
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => signOut()}
          >
            Quick sign-out option.
          </small>
        </span>
        <a className={styles.button} href={`/api/auth/signout`}>
          Sign out
        </a>
      </>
    )
  }

  return (
    <>
      <small>You are not signed in</small>
      <a href="/api/auth/signin" className={styles.buttonPrimary}>
        Sign in
      </a>
    </>
  )
}

export const AuthHeader = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          <SessionInfo session={session} />
        </p>
        <Nav />
      </div>
    </header>
  )
}
const Nav = () => (
  <nav>
    <ul className={styles.navItems}>
      <li className={styles.navItem}>
        <Link href="/auth/">Home</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/auth/signin">SignIn</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="auth/client">Client</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="auth/server">Server</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="auth/protected">Protected</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="auth/matcher">*Matcher</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="auth/api-example">API</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="auth/admin">Admin</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="auth/me">Me</Link>
      </li>
    </ul>
  </nav>
)
