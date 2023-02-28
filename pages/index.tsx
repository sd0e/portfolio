import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout, { siteDescription, siteName } from '@/components/layout';
import classes from '@/styles/Home.module.css';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Home() {
  return (
    <Layout home>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        priority
        src="/assets/SVG/index.svg"
        className={classes.homeGradient}
        height={500}
        width={500}
        alt="Colourful Gradient"
      />
      <div className={classes.homeOuter}>
        <div className={classes.homeCentral}>
          <h1 className={inter.className} style={{ marginBottom: '1.5rem' }}>{siteName}</h1>
          <h2 className={inter.className}>{siteDescription}</h2>
        </div>
      </div>
    </Layout>
  )
}
