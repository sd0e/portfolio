import styles from '@/components/skillbox.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600'] })

export default function InfoBox({ Title, Description }: { Title: string, Description: string }) {
	return (
		<div className={styles.container}>
			<div>
				<span className={[styles.title, inter.className].join(' ')}>{ Title }</span>
				<span className={[styles.description, inter.className].join(' ')}>{ Description }</span>
			</div>
		</div>
	)
}