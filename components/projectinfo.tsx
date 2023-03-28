import styles from '@/components/projectinfo.module.css';
import useStorage from '@/hooks/useStorage';
import { CalendarMonthOutlined, OpenInNewOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import SkillButton from './skillbutton';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600'] })

export default function ProjectInfo({ Skills, URL, Time, Year }: { Skills: string[], URL: string, Time: string, Year: number }) {
    const { setItem } = useStorage();
    const router = useRouter();

	return (
		<div className={styles.container}>
			<div>
                <Stack direction="column" spacing={5}>
                    <Stack direction="row" spacing={2}>
                        {Skills.map(skill => {
                            return <SkillButton key={skill}>{skill}</SkillButton>
                        })}
                    </Stack>
                    <Stack direction="row" spacing={2}>
                            <SkillButton Icon={CalendarMonthOutlined} onClick={() => {
                                setItem('date', Year.toString());
                                router.push('/projects');
                            }}>{Time}</SkillButton>
                        <a href={URL} target="_blank" rel="noreferrer">
                            <SkillButton Icon={OpenInNewOutlined}>{URL.split('://')[1].split('/')[0]}</SkillButton>
                        </a>
                    </Stack>
                    {/* <span className={[styles.date, inter.className].join(' ')}>{ Date }</span> */}
                </Stack>
			</div>
		</div>
	)
}