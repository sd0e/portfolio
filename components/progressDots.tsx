import styles from './progressDots.module.css';
import { Stack } from '@mui/material';

export default function ProgressDots({ num, selected } : { num: number, selected: number }) {
    return <Stack direction="row" spacing={1}>
        {[...Array(num)].map((_, i) => <div className={i + 1 === selected ? [styles.dot, styles.dotSelected].join(' ') : styles.dot}></div>)}
    </Stack>
}