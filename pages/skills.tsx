import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import SkillBox from '@/components/skillbox';
import Boxy from '@/components/boxy';
import { Stack } from '@mui/material';
import Link from 'next/link';
import SkillButton from '@/components/skillbutton';
import { SchoolOutlined } from '@mui/icons-material';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Skills() {
  const router = useRouter();
  const pathname = router.pathname;

  const skills = [
    {
      title: "JavaScript",
      monthsSince2000: 12 * 17 + 2
    }, {
      title: "Python",
      monthsSince2000: 12 * 18
    }, {
      title: "React",
      monthsSince2000: 12 * 21 + 6
    }, {
      title: "TypeScript",
      monthsSince2000: 12 * 21 + 2
    // }, {
    //   title: "C#",
    //   monthsSince2000: 12 * 22 + 7
    // }, {
    //   title: "Go",
    //   monthsSince2000: 12 * 23
    }, {
      title: "Next.js",
      monthsSince2000: 12 * 23 + 1
    // }, {
    //   title: "ASP.NET",
    //   monthsSince2000: 12 * 23 + 2
    }, {
      title: "Kotlin",
      monthsSince2000: 12 * 22 + 11
    }, {
      title: "Haskell",
      monthsSince2000: 12 * 24 + 10
    }
  ];

  const getMonthsSince2000 = () => {
    const date = new Date();
    const years = date.getFullYear() - 2000;
    const months = date.getMonth();
    return years * 12 + months;
  }

  const parseDate = (inputMonthsSince2000: number) => {
    const currentMonthsSince2000 = getMonthsSince2000();
    const monthDifference = currentMonthsSince2000 - inputMonthsSince2000;

    if (monthDifference > 12) return `for ${Math.floor(monthDifference / 12)} year${Math.floor(monthDifference / 12) === 1 ? '' : 's'}`
    else if (monthDifference >= 1) return `for ${monthDifference} month${monthDifference === 1 ? '' : 's'}`
    else return `this month`;
  }

  return (
    <Layout mainPage title="Skills" description="Some languages and frameworks I have used" image={`/assets/SVG${pathname}.svg`} prev="/experience" next="/projects" pageIdx={4} overrideMetaDescription="A selection of languages and frameworks I have worked with before">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://doe.lc/skills" />
      </Head>
      <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 2 }} style={{ marginBottom: '3rem' }}>
        <Link href="/qualifications">
          <SkillButton Icon={SchoolOutlined}>View Qualifications</SkillButton>
        </Link>
      </Stack>
      <Boxy columns={3} items={skills}>
        {(skill) => {
          const relativeDate = parseDate(skill.monthsSince2000);
          return <SkillBox Title={skill.title} Description={relativeDate} key={skill.title} />
        }}
      </Boxy>
    </Layout>
  )
}
