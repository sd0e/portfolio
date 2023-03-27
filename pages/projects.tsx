import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { getSortedProjects } from '@/lib/projects';
import { GetStaticProps } from 'next/types';
import ProjectButton from '@/components/projectbutton';
import Boxy from '@/components/boxy';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Projects({ projects }: { projects: Array<{
  id: string,
  name: string,
  languages: Array<string>,
  month: string,
  year: number,
  link: string,
  priority: number
}>}) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <Layout mainPage title="Projects" description="Some of my notable projects" image={`/assets/SVG${pathname}.svg`} prev="/skills">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Boxy columns={2} items={projects}>
        {(project) => {
          return <ProjectButton
            id={project.id}
            name={project.name}
            date={`${project.month} ${project.year}`}
            languages={project.languages}
            key={project.id}
          />
        }}
      </Boxy>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getSortedProjects();
  return {
      props: {
          projects
      }
  }
}