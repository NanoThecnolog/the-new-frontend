'use client'
import styles from "../styles/page.module.scss";
import { useState } from "react";
import { useTheNewContext } from "@/contexts/newContext";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState('')
  const { signIn } = useTheNewContext()

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    signIn(email)
  }


  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <Image src='/the news logo sem fundo.png' fill alt="Logomarca The News" />
      </div>
      <main className={styles.main}>
        <article className={styles.articleContainer}>
          <section className={styles.sectionContainer}>
            <div className={styles.textContainer}>
              <h1>Bem vindo ao The News!</h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className={styles.inputContainer}>
                <label htmlFor="email">
                  <p>Email:</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    id="email"
                    placeholder="Digite seu email.."
                  />
                </label>
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit">Login</button>
              </div>
            </form>
          </section>
        </article>
      </main>
    </div>
  )
}
