
import React, { useRef, useEffect, useState, useCallback } from 'react';

import styled from "styled-px2vw";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { TimeTools } from '../../../es/TimeTools';


interface iStyledProps {
  scale: number;
  $color$theme?: string;
}

const LineProcessBarStyled = styled.div`
  height:30px;
  flex:0 0 52%;
`

const LineProcessStyled = styled.div`
  background-color:rgba(0,0,0,0.3);
  height:4px;
  margin-top:13px;
  position: relative;
`

const LineProcess = styled.div.attrs((props: iStyledProps) => ({ scale: props.scale }))`
  background-color:${props => props.theme.$color$theme};
  height:4px;
  margin-top:13px;
  transform-origin:left;
`

const LineBar = styled.div`
  border-radius:50%;
  width:30px;
  height:30px;
  background-color:${props => props.theme.$color$theme};
  position:absolute;
  transform-origin:center center;
  top:-15px;
  left:-15px;
  pointer-events:none;
  border:1px solid #FFF;
`

const LineProcessWapper = styled.div`
  position:absolute;
  bottom:200px;
  color:#FFF;
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  justify-items:center;
  font-size:20px;
  span {
    padding:0 10px;
    line-height:30px;
    width:80px;
    text-align:center;
    display:block
  }
  &.animation-element{
    animation-duration:0.5s;
    animation-timing-function:ease-out;
    /* animation-delay:s;  */
    /* animation-iteration-count:infinite; */
  }
`;

interface iProcessProps {
  percent?: number;
  totalTime?: number;
  changeTime?: Function;
  changeTimeHandler?: Function;
}

let lineW: number = 0;
let sx: number = 0;
let mx: number = 0;
let rect: DOMRect;
// let rate: number = 0;
/**
 * lineProcess
 * @param props 
 */
const lineProcessBar = function (props: iProcessProps) {

  let { percent, totalTime, changeTime, changeTimeHandler } = props;

  let [process, setProcess] = useState(percent);
  let [mv, setmove] = useState(1);
  let [op, setop] = useState(true);


  useEffect(() => {
    if (!op) {
      changeTime && changeTime(process * totalTime);

    }
    setop(true);
  }, [mv]);

  useEffect(() => {
    if (op) { setProcess(() => percent); }
  }, [op, percent])

  let mouseUp = useCallback((e: TouchEvent) => {
    let element: HTMLElement = refBar.current;
    document.removeEventListener('touchend', mouseUp);
    document.removeEventListener('touchmove', mouseMove);
    setmove(1 + mv++);
    document.dispatchEvent(new Event('lyricChange'));
  }, [])

  let mouseDown = useCallback((e: TouchEvent) => {
    setop(false);
    console.log('mouseDonw');

    let element: HTMLElement = refBar.current;
    document.addEventListener('touchend', mouseUp);
    document.addEventListener('touchmove', mouseMove);

    sx = e.touches[0].pageX - rect.left;
    mx = e.touches[0].pageX;

    // console.log(e.offsetX, e.screenX);

    let rate = sx / lineW;
    setProcess(rate);
  }, []);


  let mouseMove = useCallback((e: TouchEvent) => {
    let nx = e.touches[0].pageX;
    let add = nx - mx;
    let x = Math.max(0, Math.min(sx + add, lineW));
    mx = nx;
    sx = x;
    let rate = x / lineW;
    setProcess(rate);
  }, []);

  let refBar = useRef();

  useEffect(() => {
    let element: HTMLElement = refBar.current;
    let resizeHandler = () => {
      rect = element.getBoundingClientRect();
      lineW = rect.right - rect.left;
      console.log('reszie lineW change to ' + lineW);
    }
    resizeHandler();

    if (element) {
      console.log('listener.....');
      element.addEventListener('touchstart', mouseDown);
      window.addEventListener('resize', resizeHandler);
    }

    return () => {
      element.removeEventListener('touchstart', mouseDown);
      document.removeEventListener('touchmove', mouseMove);
      document.removeEventListener('touchend', mouseUp);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <LineProcessWapper className={'lineprocess-bar animation-element'}>
      <div><span>{TimeTools.mmssFormat((process * totalTime * 1000) || 0)}</span></div>
      <LineProcessBarStyled ref={refBar}>
        <LineProcessStyled>
          <LineProcess style={{ transform: `scale(${process},1)` }}></LineProcess>
          <LineBar style={{ transform: `translateX(${process * lineW}px)` }}></LineBar>
        </LineProcessStyled>
      </LineProcessBarStyled>
      <div><span>{TimeTools.mmssFormat((totalTime * 1000) || 0)}</span></div>
    </LineProcessWapper>
  )
}

const propsMap = function (state: any) {
  return {}
}

const dispatchMap = function (dispatch: ThunkDispatch<any, any, AnyAction>) {
  return {}
}

const LineProcessBar = connect(propsMap, dispatchMap)(lineProcessBar);
export default LineProcessBar;

