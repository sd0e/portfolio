import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout home>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        main
      </main>
    </Layout>
  )
}
