import { SvgIconComponent } from "@mui/icons-material";
import { createTheme, ThemeProvider, Button } from "@mui/material";
import styles from '@/components/skillbutton.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600'] })

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '1.5rem',
                    textTransform: 'none',
                    border: '2px solid rgba(242, 242, 242, 0.2)',
                    color: 'rgba(242, 242, 242, 0.8)',
                    padding: '0.25rem 0.75rem',
                }
            }
        }
    }
});

export default function SkillButton({ children, onClick, Icon }: { children: string, onClick?: () => void, Icon?: SvgIconComponent }) {
    return <ThemeProvider theme={theme} key={children}>
        <Button onClick={onClick} key={`button-${children}`}>
            <div className={styles.skillButtonContents}>
                { Icon ? <Icon className={[styles.skillButtonIcon, inter.className].join(' ')} /> : null }
                {children}
            </div>
        </Button>
    </ThemeProvider>
}