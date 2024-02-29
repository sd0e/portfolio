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

    return (
        <Layout headerOnly scrollNav={false} title="Qualifications" image={`/assets/SVG/skills.svg`} description="Some of my qualifications" overrideMetaDescription="Some of my qualifications">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <FancySubheading>GCSE (2022 Series)</FancySubheading>
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table aria-label="GCSE results">
                    <TableHead>
                        <TableRow>
                            <TableCell>Grade</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Percentage</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Exam Board</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gcseResults.map(result => <TableRow key={result.subject}>
                            <TableCell>{result.grade}</TableCell>
                            <TableCell>{result.subject}</TableCell>
                            <TableCell>{result.percentage}</TableCell>
                            <TableCell>{result.code}</TableCell>
                            <TableCell>{result.examBoard}</TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
        <FancySubheading>UKMT Senior Mathematical Challenge</FancySubheading>
        <ThemeProvider theme={theme}>
            <TableContainer>
                <Table aria-label="GCSE results">
                    <TableHead>
                        <TableRow>
                            <TableCell>Year</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>Level</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>2023</TableCell>
                            <TableCell>92</TableCell>
                            <TableCell>Gold</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
        </Layout>
    )
}