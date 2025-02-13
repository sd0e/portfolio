import Layout from "@/components/layout";
import { getAllProjectIds, getProjectData } from "@/lib/projects";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Inter } from 'next/font/google';
import ProjectInfo from "@/components/projectinfo";

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export default function Project({ projectInfo }: { projectInfo: {
    name: string,
    headline: string,
    id: string,
    languages: Array<string>,
    month: string,
    year: number,
    link: string[],
    contentAsHtml: string,
    priority: number,
} }) {
  return (
    <Layout headerOnly scrollNav={false} title={projectInfo.name} image={`/assets/SVG/projects.svg`} overrideMetaDescription={projectInfo.headline} previousPageLink="/projects" previousPageTitle="Projects">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProjectInfo Skills={projectInfo.languages} URLS={projectInfo.link} Time={`${projectInfo.month} ${projectInfo.year.toString()}`} Year={projectInfo.year} />
      <div dangerouslySetInnerHTML={{ __html: projectInfo.contentAsHtml }} className={inter.className} style={{ paddingBottom: 32 }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllProjectIds();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const projectInfo = await getProjectData(params?.id as string);
    return {
        props: {
            projectInfo
        }
    }
}