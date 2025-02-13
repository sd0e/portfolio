import Head from 'next/head';
import styles from './layout.module.css';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createTheme, ThemeProvider, Stack, IconButton, Tooltip } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, KeyboardArrowLeft } from '@mui/icons-material';
import ProgressDots from './progressDots';
import Link from 'next/link';

export const siteName = 'Seb Doe - Portfolio';
export const siteDescription = 'Software Engineer in the UK';

// TODO: Make pages static

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export default function Layout({ children, mainPage = false, headerOnly = false, scrollNav = true, title, description, image, prev, next, onMouseMove, pageIdx, fullHeight = false, overrideMetaDescription = siteDescription, previousPageLink, previousPageTitle }: { children: React.ReactNode, mainPage?: boolean, headerOnly?: boolean, scrollNav?: boolean, title?: string, description?: string, image?: string, prev?: string, next?: string, onMouseMove?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void, pageIdx?: number, fullHeight?: boolean, overrideMetaDescription?: string, previousPageLink?: string, previousPageTitle?: string }) {
    const gradientImage = image || '@/assets/SVG/index.svg';
    const router = useRouter();

    let prevY = 0;
    let lastTimestamp = 0;
    
    // let useNext = true;
    const [useNext, setUseNext] = useState(true);

    function keydownEvent(e: KeyboardEvent) {
        if (e.timeStamp - lastTimestamp < 100 || e.repeat) return;
        lastTimestamp = e.timeStamp;
        if (e.key === 'ArrowDown' && next) moveNext();
        else if (e.key === 'ArrowUp' && prev) movePrev();
    }

    function keyupEvent(e: KeyboardEvent) {
        if (e.key === 'ArrowLeft' && previousPageLink) movePreviousPageLink();
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && scrollNav) {
            setUseNext((window as any).next);

            window.addEventListener('keydown', keydownEvent);
        }

        if (typeof window !== 'undefined' && previousPageLink) {
            window.addEventListener('keyup', keyupEvent)
        }
    }, []);

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
        if (!next || !scrollNav || ((document as any).getElementById('wrapper').scrollTop + 50) < (document as any).getElementById('wrapper').scrollHeight - (window as any).visualViewport.height) return;
        (window as any).next = true;

        window.removeEventListener('keydown', keydownEvent);

        router.push(next);
    }

    const movePrev = (): void => {
        if (!prev || !scrollNav || (document as any).getElementById('wrapper').scrollTop !== 0) return;
        (window as any).next = false;

        window.removeEventListener('keydown', keydownEvent);
        
        router.push(prev);
    }

    const movePreviousPageLink = (): void => {
        if (!previousPageLink) return;
        
        window.removeEventListener('keyup', keyupEvent);

        router.push(previousPageLink);
    }

    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiLinearProgress: {
                styleOverrides: {
                    bar: {
                        backgroundColor: 'rgba(242, 242, 242, 0.2)'
                    },
                    root: {
                        backgroundColor: 'rgba(242, 242, 242, 0.1)'
                    }
                }
            }
        }
    });

    useEffect(() => {
        if (next) router.prefetch(next);
    }, [router]);

    return (
        <div
            className={styles.wrapper}
            id="wrapper"
            onWheel={e => {
                const isTouchpad = (e as any).wheelDeltaY ? (e as any).wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0;
                if (isTouchpad) e.preventDefault();
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
                    <title>{title ? title : siteName}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="title" content={title ? title : siteName} />
                    <meta name="og:title" content={title ? title : siteName} />
			        <meta name="twitter:title" content={title ? title : siteName} />
                    <meta name="description" content={overrideMetaDescription} />
                    <meta name="og:description" content={overrideMetaDescription} />
                    <meta name="twitter:description" content={overrideMetaDescription} />
                    <meta name="twitter:card" content="summary_large_image" />
			        <meta name="twitter:site" content="@sbd0e" />
			        <meta property="og:site_name" content={siteName} />
                    <meta name="author" content="Seb Doe" />
                    <meta name="keywords" content="Software Engineer, Hire, Fullstack, React, Next.js, Node.js, UK, London" />
                </Head>
                {mainPage || headerOnly ? <>
                    { gradientImage ? <Image
                        priority
                        src={gradientImage}
                        className={styles.mainPageImage}
                        height={250}
                        width={250}
                        alt="Colourful Gradient"
                        draggable={false}
                    /> : null }
                    <div className={styles.mainPageHeader}>
                        <Stack direction="column" spacing={4}>
                            <div>
                                <motion.span
                                    variants={enterVariants}
                                    initial="hidden"
                                    animate="enter"
                                    transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.15 }}
                                    className={[inter.className, styles.mainPageTitle].join(' ')}
                                >
                                    <Stack direction="column" spacing={4}>
                                        { mainPage ? <ThemeProvider theme={theme}>
                                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                                <ProgressDots num={6} selected={pageIdx || 0} />
                                                <Tooltip title="Tip: scroll or use arrow keys to navigate">
                                                    <Stack direction="row" alignItems="center">
                                                        { prev !== undefined ? <Link href={prev} aria-label="Navigate to previous page">
                                                            <IconButton>
                                                                <KeyboardArrowUp sx={{ color: "rgba(255, 255, 255, 0.8)"}} fontSize="small" />
                                                            </IconButton>
                                                        </Link> : null }
                                                        { pageIdx !== 6 && next !== undefined ? <Link href={next} aria-label="Navigate to next page">
                                                            <IconButton>
                                                                <KeyboardArrowDown sx={{ color: "rgba(255, 255, 255, 0.8)"}} fontSize="small" />
                                                            </IconButton>
                                                        </Link> : null }
                                                    </Stack>
                                                </Tooltip>
                                            </Stack>
                                        </ThemeProvider> : null }
                                        { previousPageLink && previousPageTitle ? <ThemeProvider theme={theme}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Link href={previousPageLink} aria-label="Navigate to previous page">
                                                    <IconButton>
                                                        <KeyboardArrowLeft sx={{ color: "rgba(255, 255, 255, 0.8)"}} fontSize="small" />
                                                    </IconButton>
                                                </Link>
                                                <p style={{ fontWeight: 600, fontSize: "1rem" }}>{previousPageTitle}</p>
                                            </Stack>
                                        </ThemeProvider> : null }
                                        <span className={styles.mainPageTitleText}>{title}</span>
                                    </Stack>
                                </motion.span>
                            </div>
                            {description ? <motion.span
                                variants={enterVariants}
                                initial="hidden"
                                animate="enter"
                                transition={{ type: 'ease-in-out', duration: 0.25, delay: 0.15 }}
                                className={[inter.className, styles.mainPageDescription].join(' ')}
                            >
                                {description}
                            </motion.span> : null}
                        </Stack>
                    </div>
                </> : null}
                <motion.main
                    style={{ height: fullHeight ? '100%' : 'auto', position: mainPage || headerOnly ? 'relative' : 'initial' }}
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