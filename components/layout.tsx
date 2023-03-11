import Head from 'next/head';
import styles from './layout.module.css';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import React from 'react';
import { useRouter } from 'next/router';

export const siteName = 'Seb Doe';
export const siteDescription = 'Software Engineer';

// TODO: Make pages static

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export default function Layout({ children, mainPage = false, headerOnly = false, scrollNav = true, title, description, image, prev, next, onMouseMove }: { children: React.ReactNode, mainPage?: boolean, headerOnly?: boolean, scrollNav?: boolean, title?: string, description?: string, image?: string, prev?: string, next?: string, onMouseMove?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }) {
    const gradientImage = image || '@/assets/SVG/index.svg';
    const router = useRouter();

    let prevY = 0;
    let lastTimestamp = 0;

    let useNext = true;
    if (typeof window !== 'undefined' && scrollNav) {
        useNext = (window as any).next;

        window.addEventListener('keydown', e => {
            if (e.timeStamp - lastTimestamp < 100 || e.repeat) return;
            lastTimestamp = e.timeStamp;
            if (e.key === 'ArrowDown' && next) moveNext();
            else if (e.key === 'ArrowUp' && prev) movePrev();
        });
    }

    const variants = {
        hidden: { opacity: 0, x: 0, y: useNext ? 400 : -400 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: useNext ? -400 : 400 },
    }

    const enterVariants = {
        hidden: { opacity: 0, x: 0, y: 20 },
        enter: { opacity: 1, x: 0, y: 0 },
    }

    const moveNext = (): void => {
        if (!next || !scrollNav) return;
        (window as any).next = true;
        router.push(next);
    }

    const movePrev = (): void => {
        if (!prev || !scrollNav) return;
        (window as any).next = false;
        router.push(prev);
    }

    return (
        <div
            className={styles.wrapper}
            onWheel={e => {
                if (!scrollNav) return;
                if (e.deltaY > 0 && next) {
                    moveNext();
                } else if (e.deltaY < 0 && prev) {
                    movePrev();
                }
            }}
            onTouchStart={e => prevY = e.nativeEvent.touches[0].clientY}
            onTouchEnd={e => {
                if (!scrollNav) return;
                const deltaYSwipe = e.changedTouches[0].clientY - prevY;
                if (deltaYSwipe < 0 && next) {
                    moveNext();
                } else if (deltaYSwipe > 0 && prev) {
                    movePrev();
                }
            }}
            onMouseMove={onMouseMove}
        >
            <motion.div
                className={styles.container}
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ type: 'ease-in-out', duration: 0.25 }}
            >
                <Head>
                    <title>{title ? `${title} - ${siteName}` : siteName}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="description" content={siteDescription} />
                    <meta name="og:title" content={siteName} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Head>
                {mainPage || headerOnly ? <>
                    <Image
                        priority
                        src={gradientImage}
                        className={styles.mainPageImage}
                        height={250}
                        width={250}
                        alt="Colourful Gradient"
                        draggable={false}
                    />
                    <div className={styles.mainPageHeader}>
                        <motion.span
                            variants={enterVariants}
                            initial="hidden"
                            animate="enter"
                            transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.15 }}
                            className={[inter.className, styles.mainPageTitle].join(' ')}
                        >
                            {title}
                        </motion.span>
                        {mainPage ? <motion.span
                            variants={enterVariants}
                            initial="hidden"
                            animate="enter"
                            transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.15 }}
                            className={[inter.className, styles.mainPageDescription].join(' ')}
                        >
                            {description}
                        </motion.span> : null}
                    </div>
                </> : null}
                <motion.main
                    style={{ height: mainPage ? 'auto' : '100%', position: mainPage || headerOnly ? 'relative' : 'initial' }}
                    variants={enterVariants}
                    initial="hidden"
                    animate="enter"
                    transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.25 }}
                    className={styles.main}
                >
                    {children}
                </motion.main>
            </motion.div>
        </div>
    )
}