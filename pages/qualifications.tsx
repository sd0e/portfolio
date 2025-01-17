import Layout from "@/components/layout";
import Head from "next/head";
import { Inter } from 'next/font/google';
import { createTheme, ThemeProvider, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@mui/material";
import FancySubheading from "@/components/fancySubheading";

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] })

export default function Qualifications() {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: '"Inter", sans-serif'
        }
    });

    const gcseResults: Array<{ code: string, subject: string, examBoard: string, percentage: string, grade: string }> = [
        {
            code: "4MA1",
            subject: "Mathematics",
            examBoard: "Edexcel IGCSE",
            percentage: "98%",
            grade: "9"
        },
        {
            code: "J277",
            subject: "Computer Science",
            examBoard: "OCR GCSE",
            percentage: "95%",
            grade: "9"
        },
        {
            code: "4CH1",
            subject: "Chemistry (Triple)",
            examBoard: "Edexcel IGCSE",
            percentage: "95%",
            grade: "9"
        },
        {
            code: "4PH1",
            subject: "Physics (Triple)",
            examBoard: "Edexcel IGCSE",
            percentage: "94%",
            grade: "9"
        },
        {
            code: "4BI1",
            subject: "Biology (Triple)",
            examBoard: "Edexcel IGCSE",
            percentage: "93%",
            grade: "9"
        },
        {
            code: "8203C",
            subject: "Graphic Communication",
            examBoard: "AQA GCSE",
            percentage: "93%",
            grade: "9"
        },
        {
            code: "J282",
            subject: "Latin",
            examBoard: "OCR GCSE",
            percentage: "90%",
            grade: "9"
        },
        {
            code: "4ET1",
            subject: "English Literature",
            examBoard: "Edexcel IGCSE",
            percentage: "84%",
            grade: "9"
        },
        {
            code: "7160",
            subject: "Spanish",
            examBoard: "CIE IGCSE",
            percentage: "Unknown",
            grade: "9"
        },
        {
            code: "4EA1",
            subject: "English Language",
            examBoard: "Edexcel IGCSE",
            percentage: "Unknown",
            grade: "9"
        }
    ];

    const aLevelResults: Array<{ code: string, subject: string, examBoard: string, mark: string, grade: string }> = [
        {
            code: "9MA0",
            subject: "Mathematics",
            examBoard: "Edexcel",
            mark: "299 / 300",
            grade: "A*"
        },
        {
            code: "9FM0",
            subject: "Further Mathematics",
            examBoard: "Edexcel",
            mark: "282 / 300",
            grade: "A*"
        },
        {
            code: "H556",
            subject: "Physics",
            examBoard: "OCR",
            mark: "244 / 270",
            grade: "A*"
        },
        {
            code: "H446",
            subject: "Computer Science",
            examBoard: "OCR",
            mark: "313 / 350",
            grade: "A*"
        }
    ];

    function CustomTableCell({ children, header }: { children: string, header?: any }) {
        return <TableCell sx={header ? {
            fontWeight: 700,
            opacity: 0.8
        } : null}>{children}</TableCell>
    }

    return (
        <Layout headerOnly scrollNav={false} title="Qualifications" image={`/assets/SVG/skills.svg`} description="Some of my qualifications and examination results" overrideMetaDescription="A Level and GCSE results" previousPageLink="/skills" previousPageTitle="Skills">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="canonical" href="https://doe.lc/qualifications" />
        </Head>
        <FancySubheading>A Level (2024 Series)</FancySubheading>
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table aria-label="A Level results">
                    <TableHead>
                        <TableRow>
                            <CustomTableCell header>Grade</CustomTableCell>
                            <CustomTableCell header>Subject</CustomTableCell>
                            <CustomTableCell header>Mark</CustomTableCell>
                            <CustomTableCell header>Code</CustomTableCell>
                            <CustomTableCell header>Exam Board</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {aLevelResults.map(result => <TableRow key={result.subject}>
                            <CustomTableCell>{result.grade}</CustomTableCell>
                            <CustomTableCell>{result.subject}</CustomTableCell>
                            <CustomTableCell>{result.mark}</CustomTableCell>
                            <CustomTableCell>{result.code}</CustomTableCell>
                            <CustomTableCell>{result.examBoard}</CustomTableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
        <FancySubheading>STEP (Sixth Term Examination Paper in Mathematics) (2024 Series)</FancySubheading>
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table aria-label="STEP results">
                    <TableHead>
                        <TableRow>
                            <CustomTableCell header>Grade</CustomTableCell>
                            <CustomTableCell header>Exam</CustomTableCell>
                            <CustomTableCell header>Mark</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <CustomTableCell>2</CustomTableCell>
                            <CustomTableCell>STEP II</CustomTableCell>
                            <CustomTableCell>55</CustomTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
        <FancySubheading>GCSE (2022 Series)</FancySubheading>
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table aria-label="GCSE results">
                    <TableHead>
                        <TableRow>
                            <CustomTableCell header>Grade</CustomTableCell>
                            <CustomTableCell header>Subject</CustomTableCell>
                            <CustomTableCell header>Percentage</CustomTableCell>
                            <CustomTableCell header>Code</CustomTableCell>
                            <CustomTableCell header>Exam Board</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gcseResults.map(result => <TableRow key={result.subject}>
                            <CustomTableCell>{result.grade}</CustomTableCell>
                            <CustomTableCell>{result.subject}</CustomTableCell>
                            <CustomTableCell>{result.percentage}</CustomTableCell>
                            <CustomTableCell>{result.code}</CustomTableCell>
                            <CustomTableCell>{result.examBoard}</CustomTableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
        <FancySubheading>UKMT Senior Mathematical Challenge</FancySubheading>
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table aria-label="Senior Mathematical Challenge results">
                    <TableHead>
                        <TableRow>
                            <CustomTableCell header>Year</CustomTableCell>
                            <CustomTableCell header>Mark</CustomTableCell>
                            <CustomTableCell header>Level</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <CustomTableCell>2023</CustomTableCell>
                            <CustomTableCell>92</CustomTableCell>
                            <CustomTableCell>Gold</CustomTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
        </Layout>
    )
}