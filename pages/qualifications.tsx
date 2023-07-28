import Layout from "@/components/layout";
import Head from "next/head";
import { Inter } from 'next/font/google';
import FancySubheading from "@/components/fancySubheading";

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Qualifications() {
  return (
    <Layout headerOnly scrollNav={false} title="Qualifications" image={`/assets/SVG/skills.svg`} description="Some of my qualifications">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FancySubheading>GCSE</FancySubheading>
    </Layout>
  )
}