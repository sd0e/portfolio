import styles from './experienceInfo.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600', '700'] })

export default function ExperienceInfo({ title, location, date, content, current } : { title: string, location: string, date: string, content: string, current: boolean }) {
	return <div className={styles.experienceHolder}>
		<div className={styles.experienceLeft}>
			{ current ? <div className={styles.experienceIconCurrent}>
				<span className={styles.inner}></span>
				<span className={styles.pulsing}></span>
			</div> : <div className={styles.experienceIconHolder}></div> }
		</div>
		<div className={[inter.className, styles.experienceInfoOuter].join(" ")}>
			<span className={styles.experienceTitle}>{title}</span>
			<span className={styles.experienceInformation}>{location} · <span className={styles.experienceDate}>{date}</span></span>
			<span className={styles.experienceContent}>{content}</span>
		</div>
	</div>
}