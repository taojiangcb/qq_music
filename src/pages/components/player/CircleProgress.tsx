import styled from "styled-px2vw";
import React from "react";
import { iPlayProps } from "./PlayerPage";

const ProcessWapper = styled.div`
  position: relative;
  width:100px;
  height:120px;
  display:inline-block;
  vertical-align:middle;
  /* transform:scale(0.9); */
  > svg {
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    > circle {
      cx:50%;
      cy:50%;
      r:35px;
      strokeWidth:4px;
    }
  }

  > div {
      font-size:60px;
      color:${props => props.theme.$color$theme};
      position:absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%;
      text-align:center;
      vertical-align:middle;
  }
`

export const PlayerProcess = (props: iPlayProps) => {
  let percent = props.percent;
  let dashArray = Math.PI * 100 / 2.2;
  let dashOffset = (1 - percent) * dashArray;
  let isPlay = props.isPlay;
  let cssPlus = isPlay ? 'iconPlaybofang' : 'iconPausezanting';

  return (
    <ProcessWapper onClick={e => { props.pauseHandler && props.pauseHandler(e) }} >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle stroke="rgba(255, 205, 49, 0.5)" fill="transparent" />
        <circle stroke="#fcd32d"  strokeDasharray={dashArray} strokeDashoffset={dashOffset} fill="transparent" />
      </svg>
      <div className={`iconfont ${cssPlus}`}></div>
    </ProcessWapper>
  )
}