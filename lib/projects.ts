import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

interface Dictionary<T> {
    [key: string]: T;
}

const projectsDirectory = path.join(process.cwd(), 'projects');

export function getSortedProjects() {
    const projectFileNames = fs.readdirSync(projectsDirectory);
    const allProjectData = projectFileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        
        const projectPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(projectPath, 'utf8');

        const matterRes = matter(fileContents);

        return {
            id,
            ...(matterRes.data as {
                name: string,
                headline: string,
                languages: Array<string>,
                month: string,
                year: number,
                link: string,
                priority: number
            })
        }
    });

    return allProjectData.sort((a, b) => {
        return (a.priority < b.priority) ? 1 : -1;
    })
}

export function getAllProjectIds() {
    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

function getProjectAttribute(id: string, attribute: string) {
    const projectPath = path.join(projectsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(projectPath, 'utf8');

    const matterRes = matter(fileContents);
    return matterRes.data[attribute];
}

export async function getAllSkills() {
    const projectIds = getAllProjectIds();

    let skillObjects: Dictionary<number> = {};

    projectIds.forEach(projectIdParams => {
        const skills: string[] = getProjectAttribute(projectIdParams.params.id, 'languages');

        skills.forEach(skill => {
            skillObjects[skill] = 1;
        })
    });

    return Object.keys(skillObjects);
}

export async function getProjectData(id: string) {
    const projectPath = path.join(projectsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(projectPath, 'utf8');

    const matterRes = matter(fileContents);

    const processedProjectContent = await remark()
        .use(html)
        .process(matterRes.content)
    
    const contentAsHtml = processedProjectContent.toString()

    return {
        id,
        contentAsHtml,
        ...(matterRes.data as {
            name: string,
            headline: string,
            languages: Array<string>,
            month: string,
            year: number,
            link: string,
            priority: number
        })
    }
}