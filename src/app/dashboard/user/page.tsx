'use client'
import { useTheNewContext } from '@/contexts/newContext'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import UserCard from '@/components/user/UserCard'
import ChallengeCard from '@/components/user/ChallengeCard'
import History from '@/components/user/HistoryNews'
import RankingCard from '@/components/user/RankingCard'

export default function User() {
    const { user } = useTheNewContext()
    const router = useRouter()
    useEffect(() => {
        if (!user) return router.push('/')
    }, [router, user])
    return (
        <>
            <main className={styles.container}>
                <article className={styles.articleContainer}>
                    <div className={styles.centralContainer}>
                        <h2 className={styles.text}>Bem vindo usuário</h2>
                        <h4>email: {user && user.email}</h4>
                    </div>
                    <section className={styles.sectionContainer}>
                        <UserCard newsLetters={user ? user.newsLetters : []} />
                        <ChallengeCard user={user} />
                        <RankingCard />
                        {
                            <History news={user ? user.newsLetters : []} />
                        }
                    </section>
                </article>
            </main>
        </>
    )
}