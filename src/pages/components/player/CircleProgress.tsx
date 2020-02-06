import styled from "styled-px2vw";
import React from "react";
import { iPlayProps } from "./PlayerPage";

const ProcessWapper = styled.div`
  position: relative;
  width:90px;
  height:120px;
  display:inline-block;
  vertical-align:middle;
  transform:scale(0.9);
  > svg {
    width:90px;
    height:120px;
    > circle {
      cx:50%;
      cy:50%;
      r:40px;
      /* transform: scale(0.9) rotate(-90deg) */
    }
  }

  > i {
      font-size:80px;
      color:${props => props.theme.$color$theme};
      position:absolute;
      left:50%;
      top:1px;
      margin-left:-40px;
      /* margin-top:-40px; */
  }
`

// interface iProps {
//   percent?: number;
//   isPlay?: boolean;
//   pauseClick?: Function;
// }

export const PlayerProcess = (props: iPlayProps) => {
  let percent = props.percent;
  let dashArray = Math.PI * 100 / 2.2;
  let dashOffset = (1 - percent) * dashArray;
  let isPlay = props.isPlay;
  let cssPlus = isPlay ? 'iconPlaybofang' : 'iconPausezanting';

  return (
    <div style={{ display: 'inline-block' }} onClick={e => { props.pauseHandler && props.pauseHandler(e) }}>
      <ProcessWapper >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle stroke="rgba(255, 205, 49, 0.5)" strokeWidth="2" fill="transparent" />
          <circle stroke="#fcd32d" strokeWidth="2" strokeDasharray={dashArray} strokeDashoffset={dashOffset} fill="transparent" />
        </svg>
        <i className={`iconfont ${cssPlus}`}></i>
      </ProcessWapper>
    </div >
  )
}