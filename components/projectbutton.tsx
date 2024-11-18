import styles from '@/components/projectbutton.module.css';
import { Star } from '@mui/icons-material';
import { Button, createTheme, ThemeProvider, Stack } from '@mui/material';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600'] })

export default function ProjectButton({ id, name, date, languages, selectedSkill, featured, headline }: { id: string, name: string, date: string, languages: Array<string>, selectedSkill?: string, featured: boolean, headline: string }) {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        border: '1px solid rgba(242, 242, 242, 0.2)',
                        borderRadius: '0.5rem',
                        textTransform: 'none',
                        width: '100%',
                    }
                }
            }
        }
    });

    let limitedLanguages = languages.length > 3 ? languages.slice(0, 2) : languages;
    const languagesAreLimited = languages.length > 3;
    if (selectedSkill && !limitedLanguages.includes(selectedSkill)) limitedLanguages = [selectedSkill, ...limitedLanguages.slice(0, 1)]

	return (
		<div className={styles.container}>
            <Link href={`/project/${id}`} aria-label={`View the project ${name}`}>
                <ThemeProvider theme={theme}>
                    <Button aria-label={`View the project ${name}`}>
                        <div className={styles.buttonInner}>
                            <Stack direction="column" spacing={2} alignItems="flex-start" sx={{ width: '100%' }}>
                                <div className={styles.projectInfoTop}>
                                    <span className={[styles.projectName, inter.className].join(' ')}>{name}</span>
                                    { featured ? <Star fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.8)' }} /> : null }
                                </div>
                                <span className={[styles.projectHeadline, inter.className].join(' ')}>{headline}</span>
                                <Stack direction="row" flexWrap="wrap">
                                    <span className={[styles.projectDate, inter.className].join(' ')}>{date}</span>
                                    {limitedLanguages.map(language => <span className={[language === selectedSkill ? styles.projectLanguageSelected : styles.projectLanguage, inter.className].join(' ')} key={language}>{language}</span>)}
                                    {languagesAreLimited ? <span className={[styles.projectLanguage, inter.className].join(' ')}>and more</span> : null}
                                </Stack>
                            </Stack>
                        </div>
                    </Button>
                </ThemeProvider>
            </Link>
		</div>
	)
}