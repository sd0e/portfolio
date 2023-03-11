import styles from '@/components/projectinfo.module.css';
import { OpenInNewOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { Inter } from 'next/font/google';
import SkillButton from './skillbutton';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600'] })

export default function ProjectInfo({ Skills, URL }: { Skills: string[], URL: string }) {
	return (
		<div className={styles.container}>
			<div>
                <Stack direction="column" spacing={6}>
                    <Stack direction="row" spacing={2}>
                        {Skills.map(skill => {
                            return <SkillButton>{skill}</SkillButton>
                        })}
                    </Stack>
                    <Stack direction="row" spacing={2}>
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