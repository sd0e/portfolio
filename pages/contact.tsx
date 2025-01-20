import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import SkillButton from '@/components/skillbutton';
import { MailOutlined, LinkedIn } from '@mui/icons-material';
import { Stack } from '@mui/material';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600', '700'] })

export default function Home() {
  const router = useRouter();
  const pathname = router.pathname;

  const displayEmail = () => {
	window.alert('Email seb at doe dot lc');
  }

  return (
    <Layout mainPage title="Contact" image={`/assets/SVG${pathname}.svg`} prev="/projects" pageIdx={6} overrideMetaDescription="Get in contact with me">
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://doe.lc/contact" />
		</Head>
		<Stack direction="column" spacing={4}>
			<p className={inter.className}>If you have any enquiries whatsoever, please do not hesitate to contact me using one of the methods below.</p>
			<Stack direction="row" spacing={2}>
				<a onClick={displayEmail} target="_blank" rel="noreferrer">
					<SkillButton Icon={MailOutlined}>Email</SkillButton>
				</a>
				<a href="https://www.linkedin.com/in/sdoe/" target="_blank" rel="noreferrer">
					<SkillButton Icon={LinkedIn}>LinkedIn</SkillButton>
				</a>
			</Stack>
		</Stack>
    </Layout>
  )
}
