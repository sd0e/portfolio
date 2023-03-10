import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout, { siteDescription, siteName } from '@/components/layout';
import classes from '@/styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowDownwardOutlined } from '@mui/icons-material';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export default function Home() {
  const router = useRouter();
  const pathname = router.pathname;

  const [centralDeltaX, setCentralDeltaX] = useState(0);
  const [centralDeltaY, setCentralDeltaY] = useState(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const centralXDiff = window.innerWidth / 2 - e.clientX;
    const centralYDiff = window.innerHeight / 2 - e.clientY;

    const centralDeltaX = 1/(1 - (window.innerWidth / 2 + window.innerWidth / 8) / Math.abs(centralXDiff)) * 30;
    const centralDeltaY = 1/(1 - (window.innerHeight / 2 + window.innerHeight / 8) / Math.abs(centralYDiff)) * 30;
    
    setCentralDeltaX(centralXDiff < 0 ? centralDeltaX : -centralDeltaX);
    setCentralDeltaY(centralYDiff < 0 ? centralDeltaY : -centralDeltaY);
  }

  return (
    <Layout next="/about" onMouseMove={onMouseMove}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
          <h1 className={inter.className} style={{ marginBottom: '1.5rem' }}>{siteName}</h1>
          <h2 className={inter.className}>{siteDescription}</h2>
        </div>
      </div>
      <div className={classes.bottom}>
        <Link href="/about">
          <ArrowDownwardOutlined className={classes.scrollIcon} />
          {/* <span className={[inter.className, classes.scrollText].join(' ')}>Scroll</span> */}
        </Link>
      </div>
    </Layout>
  )
}
