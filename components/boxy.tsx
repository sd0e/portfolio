import { ReactElement, useEffect, useState } from "react";
import { Stack } from "@mui/material";

export default function Boxy({ columns = 2, items, children }: { columns: number, items: Array<any>, children: (props: typeof items[0]) => ReactElement }) {
    const [windowWidth, setWindowWidth] = useState(1000);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
      }
    }, []);

    let columnNumber = Math.ceil(windowWidth / 650);
    if (columnNumber > columns) columnNumber = columns;
    let columnItems = new Array(columnNumber);

    let currColNum = 0;
    for (let idx = 0; idx < items.length; idx++) {
        if (idx < columnNumber) columnItems[currColNum] = [];
        columnItems[currColNum].push(items[idx]);

        if (currColNum === columnNumber - 1) currColNum = 0
        else currColNum++;
    }

    return (
        <Stack direction="row" spacing={4}>
            {columnItems.map((column: [{ title: string, monthsSince2000: number }], idx) => {
                return <Stack direction="column" spacing={4} flexGrow={1} key={`column${idx}`}>
                {column.map(columnInfo => {
                    return children(columnInfo);
                })}
                </Stack>
            })}
        </Stack>
    )
}