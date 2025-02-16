import Link from 'next/link'
import styles from '../styles/not-found.module.scss'

export default function NotFound() {
    return (
        <>
            <main className={styles.mainContainer}>
                <section className={styles.sectionContainer}>
                    <h1>Página não encontrada</h1>
                    <p>
                        A página que você tentou acessar não existe..
                    </p>
                    <Link href='/'>Voltar para Home</Link>
                </section>
            </main>
        </>
    )
}