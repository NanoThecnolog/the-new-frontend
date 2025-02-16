'use client'
import { useTheNewContext } from '@/contexts/newContext'
import styles from './styles.module.scss'
import { debug } from '@/utils/debugFunction'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function User() {
    const { user } = useTheNewContext()
    const router = useRouter()
    debug("user no dashboard user", user)
    useEffect(() => {
        if (!user) return router.push('/')
    }, [router, user])
    return (
        <>
            <h2 className={styles.text}>Bem Vindo usuário</h2>
            <h4>email: {user && user.email}</h4>
        </>
    )
}