import styles from '@/components/projectinfo.module.css';
import useStorage from '@/hooks/useStorage';
import { CalendarMonthOutlined, GitHub, OpenInNewOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import SkillButton from './skillbutton';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600'] })

export default function ProjectInfo({ Skills, URLS, Time, Year }: { Skills: string[], URLS: string[], Time: string, Year: number }) {
    const { setItem } = useStorage();
    const router = useRouter();

	return (
		<div className={styles.container}>
			<div>
                <Stack direction="column" spacing={5}>
                    <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 2 }}>
                        {Skills.map(skill => {
                            return <SkillButton key={skill} onClick={() => {
                                setItem('skills', skill);
                                setItem('date', '');
                                router.push('/projects'); 
                            }}>{skill}</SkillButton>
                        })}
                    </Stack>
                    <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 2 }}>
                            <SkillButton Icon={CalendarMonthOutlined} onClick={() => {
                                setItem('date', Year.toString());
                                setItem('skills', '');
                                router.push('/projects');
                            }}>{Time}</SkillButton>
                        { URLS.map( URL => <a href={URL} target="_blank" rel="noreferrer" key={URL}>
                            <SkillButton Icon={URL.split('://')[1].split('/')[0] === 'github.com' ? GitHub : OpenInNewOutlined}>{URL.split('://')[1].split('/')[0]}</SkillButton>
                        </a> )}
                    </Stack>
                    {/* <span className={[styles.date, inter.className].join(' ')}>{ Date }</span> */}
                </Stack>
			</div>
		</div>
	)
}