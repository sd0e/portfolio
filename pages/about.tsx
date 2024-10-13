import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import InfoBox from '@/components/infobox';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600', '700'] })

export default function Home() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Layout mainPage title="About Me" description="Hey, I'm Seb!" image={`/assets/SVG${pathname}.svg`} prev="/" next="/skills" pageIdx={2} overrideMetaDescription="Learn more about me">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://doe.lc/about" />
      </Head>
      <p className={inter.className}>I am an 18-year-old Computing student at Imperial College London and software engineer; I love developing tools which help people achieve tasks more easily.</p>
      <p className={inter.className} style={{ marginTop: '1.5rem' }}>I am based in the UK, having previously lived in Sydney and Hong Kong.</p>
      <InfoBox Title="Available for internships!" Description="I am available for internships in London in July to September 2025, please get in touch." />
    </Layout>
  )
}