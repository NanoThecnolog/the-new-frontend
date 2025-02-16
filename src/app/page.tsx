'use client'
import { toast } from "react-toastify";
import styles from "../styles/page.module.scss";
import { api } from "@/utils/api";
import { toastLoading } from "@/utils/toastLoading";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('')

  async function signIn() {
    try {
      const response = await api.post
    } catch (err) {
      toast.error("Email não encontrado, confirme seu email e tente novamente!")
    }
  }



  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <article>
          <section>
            <div className={styles.s}>
              <h1>Bem vindo, usuário</h1>
              <h2>Faça seu login para acompanhar seu crescimento</h2>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="email">
                Email:
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                  placeholder="Digite seu email.."
                />
              </label>
            </div>
            <div>
              <button type="button" onClick={signIn}>Login</button>
            </div>

          </section>
        </article>
      </main>
    </div>
  );
}
