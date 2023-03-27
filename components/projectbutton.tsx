import styles from '@/components/projectbutton.module.css';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600'] })

export default function ProjectButton({ id, name, date, languages }: { id: string, name: string, date: string, languages: Array<string> }) {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        border: '1px solid rgba(242, 242, 242, 0.2)',
                        textTransform: 'none',
                    }
                }
            }
        }
    });

	return (
		<div className={styles.container}>
            <Link href={`/project/${id}`} aria-label={`View the project ${name}`}>
                <ThemeProvider theme={theme}>
                    <Button aria-label={`View the project ${name}`}>
                        <div className={styles.buttonInner}>
                            <span className={[styles.projectName, inter.className].join(' ')}>{name}</span>
                        </div>
                    </Button>
                </ThemeProvider>
            </Link>
		</div>
	)
}