import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import SkillBox from '@/components/skillbox';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Skills() {
  const router = useRouter();
  const pathname = router.pathname;

  const [windowWidth, setWindowWidth] = useState(1000);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    }
  }, []);

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
    },
    {
      title: "TypeScript",
      monthsSince2000: 12 * 21 + 2
    }, {
      title: "C#",
      monthsSince2000: 12 * 22 + 7
    }, {
      title: "Go",
      monthsSince2000: 12 * 23
    }, {
      title: "Next.js",
      monthsSince2000: 12 * 23 + 1
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

  let columnNumber = Math.ceil(windowWidth / 650);
  if (columnNumber > 3) columnNumber = 3;
  let columns = new Array(columnNumber);

  let currColNum = 0;
  for (let idx = 0; idx < skills.length; idx++) {
    if (idx < columnNumber) columns[currColNum] = [];
    columns[currColNum].push(skills[idx]);

    if (currColNum === columnNumber - 1) currColNum = 0
    else currColNum++;
  }

  return (
    <Layout mainPage title="Skills" description="Some languages and frameworks I have used" image={`/assets/SVG${pathname}.svg`} prev="/about" next="/projects">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="row" spacing={4}>
        {columns.map((column: [{ title: string, monthsSince2000: number }], idx) => {
          return <Stack direction="column" spacing={4} flexGrow={1} key={`column${idx}`}>
            {column.map(columnInfo => {
              const relativeDate = parseDate(columnInfo.monthsSince2000);
              return <SkillBox Title={columnInfo.title} Description={relativeDate} key={columnInfo.title} />
            })}
          </Stack>
        })}
      </Stack>
    </Layout>
  )
}
