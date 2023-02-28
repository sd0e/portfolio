import Head from 'next/head';
import styles from './layout.module.css';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import React from 'react';

export const siteName = 'Seb Doe';
export const siteDescription = 'Developer in the UK';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

const variants = {
    hidden: { opacity: 0, x: 0, y: -200 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 200 },
}

export default function Layout({ children, mainPage = false, title, description, image }: { children: React.ReactNode, mainPage?: boolean, title?: string, description?: string, image?: string }) {
    const gradientImage = image || '@/assets/SVG/index.svg';

    return (
        <motion.div
            className={styles.container}
            variants={variants} // Pass the variant object into Framer Motion 
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: 'ease-in-out' }} // Set the transition to linear
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