import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout, { siteDescription, siteName } from '@/components/layout';
import classes from '@/styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Skills() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Layout mainPage title="Skills" description="Some languages and frameworks I have used" image={`/assets/SVG${pathname}.svg`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Layout>
  )
}
