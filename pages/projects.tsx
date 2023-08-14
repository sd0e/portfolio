import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { getSortedProjects, getAllSkills } from '@/lib/projects';
import { GetStaticProps } from 'next/types';
import ProjectButton from '@/components/projectbutton';
import Boxy from '@/components/boxy';
import { Autocomplete, Stack, Popover, IconButton, TextField, createTheme, ThemeProvider } from '@mui/material';
import SkillButton from '@/components/skillbutton';
import { AddCircleOutlineOutlined, ArrowDropDownCircleOutlined, CalendarMonthOutlined, ClearAllOutlined, RemoveCircleOutlineOutlined } from '@mui/icons-material';
import RoundSearch from '@/components/roundsearch';
import { useEffect, useRef, useState } from 'react';
import OverlayContent from '@/components/overlaycontent';
import useStorage from '@/hooks/useStorage';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Projects({ projects, skills }: {
  projects: Array<{
    id: string,
    name: string,
    languages: Array<string>,
    month: string,
    year: number,
    link: string,
    priority: number
}>,
skills: Array<string>}) {
  const router = useRouter();
  const pathname = router.pathname;

  const dateButtonRef = useRef();
  const skillsButtonRef = useRef();

  const [searchValue, setSearchValue] = useState('');
  const { getItem, setItem } = useStorage();
  
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [skillsAnchorEl, setSkillsAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [dateVal, setDateVal] = useState('Choose Year');
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [skillsVal, setSkillsVal] = useState<string | null>(null);
  const [date, setDate] = useState<number | null>(null);
  const dateId = dateOpen ? 'date-popover' : undefined;
  const skillsId = skillsOpen ? 'skills-popover' : undefined;

  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            width: '10rem',
          }
        }
      }
    }
  });

  useEffect(() => {
    const item = getItem('date');
    if (item) {
      setDateVal(item);
      setDate(Number(item));
    };

    const skillItem = getItem('skills');
    if (skillItem) setSkillsVal(skillItem);
  }, []);

  const updateDateVal = (newDateVal?: number | null) => {
    if (newDateVal === undefined) newDateVal = date;
    setDateVal(newDateVal ? newDateVal.toString() : 'Choose Year')
  };

  const toggleDateOpen = (newDateVal?: number | null) => {
    if (dateOpen) updateDateVal(newDateVal);
    setDateOpen(val => !val);
  }

  const updateDate = (newDate: number) => {
    setDate(newDate);
    setItem('date', newDate.toString());
  }

  console.log(projects);

  return (
    <ThemeProvider theme={theme}>
      <Layout mainPage title="Projects" description="Some of my notable projects" image={`/assets/SVG${pathname}.svg`} prev="/skills" pageIdx={4}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Stack direction="row" spacing={0} sx={{ flexWrap: 'wrap', gap: 2 }} style={{ marginBottom: '3rem' }}>
          <SkillButton Icon={CalendarMonthOutlined} id={dateId} onClick={e => {
            setAnchorEl(e.currentTarget);
            if (!date) {
              if (!getItem('date')) setItem('date', new Date().getFullYear().toString())
              const fetchedDate = getItem('date');
              setDate(Number(fetchedDate));
            }
            toggleDateOpen();
          }}>{
            dateVal
          }</SkillButton>
          <SkillButton Icon={ArrowDropDownCircleOutlined} id={skillsId} onClick={e => {
            setSkillsAnchorEl(e.currentTarget);
            setSkillsOpen(value => !value);
          }}>{skillsVal || `Skills`}</SkillButton>
          <RoundSearch placeholder="Search" setState={setSearchValue} />
        </Stack>
        <Popover
          id={dateId}
          open={dateOpen}
          anchorEl={anchorEl}
          onClose={() => toggleDateOpen()}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <OverlayContent>
              <>
                <IconButton color="secondary" disabled={date === 2015} onClick={() => updateDate(date ? date - 1 : new Date().getFullYear() - 1)}>
                  <RemoveCircleOutlineOutlined />
                </IconButton>
                <span style={{
                  margin: '0 1rem',
                  fontSize: '1.2rem',
                  color: 'rgba(242, 242, 242, 0.8)'
                }}>{date}</span>
                <IconButton color="secondary" disabled={date === new Date().getFullYear()} onClick={() => updateDate(date ? date + 1 : new Date().getFullYear())}>
                  <AddCircleOutlineOutlined />
                </IconButton>
                <IconButton color="warning" onClick={() => {
                  setDate(null);
                  setItem('date', '');
                  toggleDateOpen(null);
                }}>
                  <ClearAllOutlined />
                </IconButton>
              </>
          </OverlayContent>
        </Popover>
        <Popover
          id={skillsId}
          open={skillsOpen}
          anchorEl={skillsAnchorEl}
          onClose={() => setSkillsOpen(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <OverlayContent>
            <>
              <Autocomplete
                freeSolo
                disableClearable
                options={skills}
                value={skillsVal || undefined}
                onChange={(_, newVal) => {
                  setSkillsVal(newVal);
                  setItem('skills', newVal);
                  setSkillsOpen(false);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select skill"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
              <IconButton color="warning" style={{ marginLeft: '1rem' }} onClick={() => {
                setSkillsVal(null);
                setItem('skills', '');
                setSkillsOpen(false);
              }}>
                <ClearAllOutlined />
              </IconButton>
            </>
          </OverlayContent>
        </Popover>
        <Boxy columns={2} items={projects.filter(project => {
          return (
            (!date || project.year === date)
            &&
            (!skillsVal || project.languages.includes(skillsVal))
            &&
            (!searchValue || project.name.toLowerCase().includes(searchValue.toLowerCase()))
          )
        })}>
          {(project) => {
            return <ProjectButton
              id={project.id}
              name={project.name}
              date={`${project.month} ${project.year}`}
              languages={project.languages}
              key={project.id}
              selectedSkill={skillsVal || undefined}
            />
          }}
        </Boxy>
      </Layout>
    </ThemeProvider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getSortedProjects();
  const skills = await getAllSkills();
  return {
      props: {
          projects,
          skills
      }
  }
}