import { Inter } from 'next/font/google';
import styles from './roundsearch.module.css';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function RoundSearch({ placeholder, setState }: { placeholder: string, setState: (val: string) => void }) {
    return <input className={[styles.input, inter.className].join(' ')} placeholder={placeholder} onChange={e => setState(e.target.value)} autoCapitalize="false" autoComplete="false" autoFocus={false} />
}