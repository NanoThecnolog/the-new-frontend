'use client'
import { useTheNewContext } from '@/contexts/newContext'
import styles from './styles.module.scss'
import { debug } from '@/utils/debugFunction'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import UserCard from '@/components/user/UserCard'
import ChallengeCard from '@/components/user/ChallengeCard'

export default function User() {
    const { user } = useTheNewContext()
    const router = useRouter()
    //debug("user no dashboard user", user)
    useEffect(() => {
        if (!user) return router.push('/')
    }, [router, user])
    return (
        <>
            <main className={styles.container}>
                <article className={styles.articleContainer}>
                    <section className={styles.sectionContainer}>
                        <UserCard newsLetters={user ? user?.newsLetters : []} />
                        <ChallengeCard user={user} />
                        <div>
                            desafios diários e progresso deles
                        </div>
                        <div>
                            lista com newsletters visualizadas pelo usuario
                        </div>
                        <div>
                            ranking geral e por categoria (maior streak?, mais newsletter lidas, etc)
                        </div>

                        <div className={styles.centralContainer}>
                            <h2 className={styles.text}>Bem vindo usuário</h2>
                            <h4>email: {user && user.email}</h4>
                        </div>
                    </section>
                </article>
            </main>
        </>
    )
}