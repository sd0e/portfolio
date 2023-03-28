import { ReactElement } from "react";
import styles from './overlaycontent.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function OverlayContent({ children }: { children: ReactElement }) {
    return <div className={[styles.overlay, inter.className].join(' ')}>
        {children}
    </div>
}