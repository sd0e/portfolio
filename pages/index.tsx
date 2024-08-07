import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout, { siteDescription } from '@/components/layout';
import classes from '@/styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowDownwardOutlined, ArticleOutlined, Close, GitHub, WorkOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import SkillButton from '@/components/skillbutton';
import { createTheme, IconButton, Stack, ThemeProvider, Tooltip } from '@mui/material';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export default function Home() {
  const router = useRouter();
  const pathname = router.pathname;

  const [centralDeltaX, setCentralDeltaX] = useState(0);
  const [centralDeltaY, setCentralDeltaY] = useState(0);

  const [errorAlert, setErrorAlert] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const centralXDiff = window.innerWidth / 2 - e.clientX;
    const centralYDiff = window.innerHeight / 2 - e.clientY;

    const centralDeltaX = 1/(1 - (window.innerWidth / 2 + window.innerWidth / 8) / Math.abs(centralXDiff)) * 30;
    const centralDeltaY = 1/(1 - (window.innerHeight / 2 + window.innerHeight / 8) / Math.abs(centralYDiff)) * 30;
    
    setCentralDeltaX(centralXDiff < 0 ? centralDeltaX : -centralDeltaX);
    setCentralDeltaY(centralYDiff < 0 ? centralDeltaY : -centralDeltaY);
  }

  useEffect(() => {
    if (router.query["ref"] && router.query["ref"] === "404") {
      setErrorAlert(true);
      router.replace('/', undefined, { shallow: true });
    }
  }, [router]);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <Layout next="/about" onMouseMove={onMouseMove} fullHeight>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://doe.lc/" />
      </Head>
      <Image
        priority
        src={`/assets/SVG${pathname === '/' ? '/index' : pathname}.svg`}
        className={classes.homeGradient}
        height={500}
        width={500}
        alt="Colourful Gradient"
        style={{ top: `calc(50% - 250px + ${centralDeltaY}px)`, left: `calc(50% - 250px + ${centralDeltaX}px)` }}
      />
      <div className={classes.homeOuter}>
        <div className={classes.homeCentral}>
          <Stack direction="column" spacing={4} alignItems="center">
            <h1 className={inter.className}>Seb Doe</h1>
            <h2 className={inter.className}>{siteDescription}</h2>
            <Stack sx={{ paddingTop: '16px' }} direction="row" spacing={2}>
              <a href="https://sebdoe.com" target="_blank" rel="noreferrer">
                <SkillButton Icon={ArticleOutlined}>Blog</SkillButton>
              </a>
              <a href="https://github.com/sd0e" target="_blank" rel="noreferrer">
                <SkillButton Icon={GitHub}>GitHub</SkillButton>
              </a>
              <a href="https://hire.sebdoe.com" target="_blank" rel="noreferrer">
                <SkillButton Icon={WorkOutline}>Hire Me</SkillButton>
              </a>
            </Stack>
          </Stack>
        </div>
      </div>
      <div className={classes.bottom}>
        <Tooltip title="Scroll or swipe between pages">
          <Link href="/about">
            <div className={classes.scrollHolder}>
              <span className={[inter.className, classes.scrollText].join(' ')}>Explore</span>
              <ArrowDownwardOutlined className={classes.scrollIcon} />
            </div>
          </Link>
        </Tooltip>
      </div>
      { errorAlert ? <div className={classes.alert}>
        <ThemeProvider theme={theme}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <span className={[inter.className, classes.alertTitle].join(' ')}>Page Not Found</span>
              <IconButton onClick={() => setErrorAlert(false)}>
                <Close fontSize="small" />
              </IconButton>
            </Stack>
            <span className={[inter.className, classes.alertText].join(' ')}>Unfortunately, the page you were searching for could not be found. Please try again or <a href="https://github.com/sd0e?tab=repositories" className={classes.alertLink} target="_blank" rel="noreferrer">search for the repository on my GitHub</a> to check for any updates.</span>
          </Stack>
        </ThemeProvider>
      </div> : null }
    </Layout>
  )
}
