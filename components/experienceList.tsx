import ExperienceInfo from './experienceInfo';
import styles from './experienceList.module.css';

export default function ExperienceList({ experiences } : { experiences: Array<{ title: string, location: string, date: string, content: string, current: boolean }> }) {
	return <div className={styles.experienceListOuter}>
		<div className={styles.bar}></div>
		{ experiences.map(experience => <ExperienceInfo title={experience.title} location={experience.location} date={experience.date} content={experience.content} key={experience.title} current={experience.current} />) }
	</div>
}