import React, { useState, useEffect, useRef, useCallback, RefObject } from 'react';
import styled from "styled-px2vw";
import { TimeTools } from '../../../es/TimeTools';

const LyricWarpper = styled.div`
  position:absolute;
  bottom:270px;
  /* background-color:red; */
  height:240px;
  width:100%;
  overflow:hidden;

  /* background-color:#FF0; */

  &.animation-element{
    animation-duration:0.5s;
    animation-timing-function:ease-out;
    /* animation-delay:s;  */
    /* animation-iteration-count:infinite; */
  }

  &::after {
    display:block;
    content: '';
    position: absolute;
    bottom: 0;
    width:100%;
    height:3px;
    /* background:linear-gradient(
     0 deg,
     rgba(0,0,0,0.001),
     rgba(0,0,0,1)
   ) ; */
   background-color:#000000;
   filter:blur(10px);
   pointer-events: none;
  }

`

const LyricContext = styled.ul`
`;

const LyricItem = styled.li`
  color:rgba(255,255,255,0.5);
  text-align:center;
  height:50;
  line-height:50px;
  font-size:26px;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  width:100%;
  padding:auto 10px;
  &.selected{ 
    color:rgba(255,255,255,1);
  }
`

type LyricProps = {
  percent?: number;
  lyric?: string;
  totalTime?: number;
}

const SCROLL_LIMITED: number = 2;

let curItem: Element = null;
let curIndex: number = -1;
let itemRectH: number = 50;
let initRectFlag: boolean = false;

type LyricLine = { t: string, index: number, str: string, t2: number };
type LyricMap = Map<number, LyricLine>;

const time2 = function (t: string) {
  let [t1, r1] = t.split(':');
  let [t2, ms] = r1.split('.');
  console.log(t1, t2, ms);
  return (Number(t1) * 60 + Number(t2)) * 1000 + Math.floor(Number(ms) * 10);
}

const Lyric = function (props: LyricProps) {
  let contentRef = useRef();
  let { percent, lyric, totalTime } = props;
  let [lyricText, setLyric] = useState<string>('');
  let [lyricLines, setLines] = useState(null);
  if (lyric != lyricText) setLyric(lyric);

  //划分歌词
  useEffect(() => {
    if (lyricText) {
      console.log(lyricText);
      let text_strs = lyricText.split('\n');
      let lyricMap: LyricMap = new Map();
      let i: number = 0;
      text_strs.filter((line) => {
        let [l, r] = line.split(']');
        if (r.trim()) {
          let t = line.substr(1, 8);
          let lineData: LyricLine = {
            t: t,
            index: i,
            str: line.slice(10),
            t2: time2(t)
          }
          i++;
          lyricMap.set(lineData.t2, lineData);
          return true;
        }
        return false;
      });
      console.log(lyricMap);
      setLines(lyricMap);

      let ulElement = contentRef.current as HTMLUListElement;
      let nowItem = ulElement.children.item(0);
      if (nowItem) {
        let rect = nowItem.getBoundingClientRect();
        itemRectH = rect.height;
      }
    }
  }, [lyricText]);

  /**滚动坐标 */
  const scrollTo = (progress: number) => {
    if (!lyricLines) return;
    let len = lyricLines.size;
    let nt = Math.floor(progress * (totalTime * 1000));
    // let k = TimeTools.mmssFormat(nt);

    let lryicIndex = curIndex;
    // if (lyricLines.has(k)) {
    //   lryicIndex = lyricLines.get(k).index;
    // }
    // else {
    // }

    let lines = [];
    let map = lyricLines as LyricMap;
    map.forEach(item => { lines.push(item) });
    lines = lines.sort((a, b) => { return a.t2 - b.t2 });
    let i = lines.length;
    while (--i > -1) {
      if (lines[i].t2 <= nt) {
        lryicIndex = lines[i].index;
        break;
      }
    }

    const selected = 'selected';
    if (curIndex != lryicIndex && curItem && curItem.className) {
      let classNames: string[] = curItem.className.split(' ');
      classNames = classNames.filter(str => {
        if (str != selected) return true;
      })
      curItem.className = classNames.join(" ");
    }

    let ulElement = contentRef.current as HTMLUListElement;
    let nowItem = ulElement.children.item(lryicIndex);
    if (!initRectFlag && nowItem) {
      initRectFlag = true;
      let rect = nowItem.getBoundingClientRect();
      itemRectH = rect.height;
    }

    if (nowItem && curIndex !== lryicIndex) {
      nowItem.className = [nowItem.className, selected].join(' ');
      curItem = nowItem;
      curIndex = lryicIndex;
    }

    if (curIndex > SCROLL_LIMITED && curItem) {
      let y = (curIndex - SCROLL_LIMITED) * itemRectH * -1;
      if (len - curIndex >= SCROLL_LIMITED) {
        ulElement.setAttribute('style', `transform:translateY(${y}px); transition:transform 0.3s;`);
      }
    }
    else {
      ulElement.setAttribute('style', `transform:translateY(0px); transition:transform 0.3s;`);
    }
  }

  //滚动歌词
  useEffect(() => {
    scrollTo(percent);
    return () => { };
  });

  const renderList = () => {
    let res = [];
    lyricLines && (lyricLines as Map<string, LyricLine>).forEach(element => {
      res.push(element);
    })
    res = res.sort((a, b) => (a.t2 - b.t2));
    return res.map(item => {
      return <LyricItem key={item.index + '_lyric'}> {item.str} </LyricItem>
    })
  }

  return (
    <LyricWarpper className={'animation-element lyric'}>
      <LyricContext ref={contentRef}>
        {renderList()}
      </LyricContext>
    </LyricWarpper>
  )
}

export default Lyric;