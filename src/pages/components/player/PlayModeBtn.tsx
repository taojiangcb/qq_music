
import React, { useState, useEffect, Component, RefObject, useCallback } from 'react';
import { PLAY_MODE } from '../../../logicFunction/Constant';
export const mode_cs = ['iconListCycleliebiaoxunhuan', 'iconSingleCycledanquxunhuan', 'iconRandomPlaysuijibofang'];

interface iProps {
  mode?: PLAY_MODE,
  modeChange?: Function
}

const ModeBtn = (props: iProps) => {
  const modecsClk = useCallback((e) => {
    console.log('modecsClk')
    let { modeChange } = props;
    console.log(modeChange);
    modeChange && modeChange(e);
  }, [])

  let modecs = mode_cs[props.mode - 1];
  return (<i onClick={modecsClk} className={`iconfont ${modecs}`}></i>)
}

export default React.memo((props: iProps) => {
  return <ModeBtn {...props}></ModeBtn>
})