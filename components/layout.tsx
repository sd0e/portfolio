import Head from 'next/head';
import styles from './layout.module.css';

export const siteName = 'Seb Doe';
export const siteDescription = 'Developer in the UK';

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{siteName}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={siteDescription} />
                <meta name="og:title" content={siteName} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <main>{children}</main>
        </div>
    )
}