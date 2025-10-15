import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import InfoBox from '@/components/infobox';
import ExperienceInfo from '@/components/experienceInfo';
import ExperienceList from '@/components/experienceList';

const inter = Inter({ subsets: ['latin'], weight: ['500', '600', '700'] })

export default function Experience() {
  const router = useRouter();
  const pathname = router.pathname;

  const experiences = [
	{
		"title": "Computing (BEng)",
		"location": "Imperial College London",
		"date": "Sep 2024 - Jun 2027",
		"content": "Currently in my second year of an undergraduate degree in Computing.",
		"current": true,
	},
	{
		"title": "A Level and GCSE",
		"location": "Norwich School",
		"date": "Sep 2017 - Jul 2024",
		"content": "Achieved four A* grades and ten 9s at A Level and GCSE respectively.",
		"current": false,
	},
  ]

  return (
    <Layout mainPage title="Experience" image={`/assets/SVG/about.svg`} prev="/about" next="/skills" pageIdx={3} overrideMetaDescription="Learn more about me">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://doe.lc/experience" />
      </Head>
	  <ExperienceList experiences={experiences} />
      {/* <ExperienceInfo title="Computing (BEng)" location="Imperial College London" date="Sep 2024 - Jun 2027" content="Currently in my first year of an undergraduate degree in Computing." />
	  <ExperienceInfo title="A Level and GCSE" location="Norwich School" date="Sep 2017 - Jul 2024" content="Achieved four A* grades and ten 9s at A Level and GCSE respectively." /> */}
    </Layout>
  )
}
