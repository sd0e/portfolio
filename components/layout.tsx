import Head from 'next/head';
import styles from './layout.module.css';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import React from 'react';
import { useRouter } from 'next/router';

export const siteName = 'Seb Doe';
export const siteDescription = 'Developer in the UK';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export default function Layout({ children, mainPage = false, title, description, image, prev, next }: { children: React.ReactNode, mainPage?: boolean, title?: string, description?: string, image?: string, prev?: string, next?: string }) {
    const gradientImage = image || '@/assets/SVG/index.svg';
    const router = useRouter();

    let useNext = true;
    if (typeof window !== 'undefined') {
        useNext = (window as any).next;
    }

    const variants = {
        hidden: { opacity: 0, x: 0, y: useNext ? 400 : -400 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: useNext ? -400 : 400 },
    }

    return (
        <motion.div
            className={styles.container}
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: 'ease-in-out', duration: 0.25 }}
            onWheel={e => {
                if (e.deltaY > 0 && next) {
                    (window as any).next = true;
                    router.push(next);
                } else if (e.deltaY < 0 && prev) {
                    (window as any).next = false;
                    router.push(prev);
                }
            }}
        >
            <Head>
                <title>{title || siteName}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={siteDescription} />
                <meta name="og:title" content={siteName} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {mainPage ? <>
                <Image
                    priority
                    src={gradientImage}
                    className={styles.mainPageImage}
                    height={250}
                    width={250}
                    alt="Colourful Gradient"
                />
                <div className={styles.mainPageHeader}>
                    <span className={[inter.className, styles.mainPageTitle].join(' ')}>{ title }</span>
                    <span className={[inter.className, styles.mainPageDescription].join(' ')}>{ description }</span>
                </div>
            </> : null}
            <main style={{ height: mainPage ? 'auto' : '100%' }}>{children}</main>
        </motion.div>
    )
}