import Head from 'next/head';
import Image from 'next/image';
import DemoCard from '../components/DemoCard';
import styles from '../styles/Home.module.css';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useVirtualScroll } from '../util/useVirtualScroll';
import { ChangeEvent, createRef, useEffect, useMemo, useState } from 'react';

const DATA_COUNT = 100;
const EXTRA_ITEM_COUNT = 6

const getArray = (count: number) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr[i] = i;
  }
  return arr;
};

const items = getArray(DATA_COUNT)
const itemHeight = 338.391

export default function Home() {
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [startIndex, setStartIndex] = useState<number>(0);
  const maxDisplayCount = Math.floor(
    containerHeight / itemHeight + EXTRA_ITEM_COUNT
  );

  const displayingItems = useMemo(
    () => items.slice(startIndex - EXTRA_ITEM_COUNT >= 0 ? startIndex - EXTRA_ITEM_COUNT : 0 , startIndex + maxDisplayCount),
    [startIndex, maxDisplayCount]
  );

  useEffect(() => {
    const vh = window.innerHeight
    setContainerHeight(vh)
    const topLevelBox = document.getElementById('top-level-box');

    window.addEventListener("scroll", (e: any) => {
      console.log(window.pageYOffset);
      console.log(topLevelBox!.offsetTop)
      const scrollTop = window.pageYOffset - topLevelBox!.offsetTop
      const nextStartIndex = Math.floor(scrollTop / itemHeight) > 0 ? Math.floor(scrollTop / itemHeight) : 0;
      console.log(nextStartIndex)
      setStartIndex(nextStartIndex);
    })
  }, [])

  return (
    <div>
      <Container maxWidth="sm" style={{border: "2px solid #ccc"}}>
        <Box height={300}>
          ヘッダー
        </Box>
        <Box id="top-level-box" style={{height: items.length * itemHeight}}>
          <Box style={{ position: "relative", top: startIndex * itemHeight}}>
            {displayingItems.map(data => {
              return <DemoCard key={data} style={{margin: "20px auto 20px"}}/>
            })}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
