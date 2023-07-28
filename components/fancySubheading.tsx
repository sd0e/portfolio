import styles from './fancySubheading.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function FancySubheading({ children } : { children: string }) {
    return <div className={[inter.className, styles.subheading].join(' ')}>
        <h3 className={styles.subheadingText}>{children}</h3>
        <div className={styles.subheadingDivider}></div>
    </div>
}