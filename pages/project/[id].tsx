import Layout from "@/components/layout";
import { getAllProjectIds, getProjectData } from "@/lib/projects";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export default function Project({ projectInfo }: { projectInfo: {
    name: string,
    id: string,
    languages: Array<string>,
    month: string,
    year: number,
    link: string,
    description: string,
    priority: number,
} }) {
    return (
        <Layout>
            <Head>
                <title>{projectInfo.name}</title>
            </Head>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllProjectIds();
    console.log(paths);
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