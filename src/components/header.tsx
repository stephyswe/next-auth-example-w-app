"use client"

import { signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import Link from "next/link"
import { defaultSignInRoute, signInRoute } from "../lib/constants"

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
      <a href={defaultSignInRoute} className={styles.buttonPrimary}>
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
        <Link href="/">Home</Link>
      </li>
      <li className={styles.navItem}>
        <Link href={signInRoute}>SignIn</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/client">Client</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/server">Server</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/protected">Protected</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/matcher">*Matcher</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/api-example">API</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/admin">Admin</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/me">Me</Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/jwt">Jwt</Link>
      </li>
    </ul>
  </nav>
)
