import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Home() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Layout mainPage title="About Me" description="Hey, I'm Seb!" image={`/assets/SVG${pathname}.svg`} prev="/" next="/skills">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className={inter.className}>I am a 17-year-old software engineer based in the UK.</p>
    </Layout>
  )
}
