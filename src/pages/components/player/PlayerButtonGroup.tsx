import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-px2vw';
import { iPlayProps } from './PlayerPage';
import { mode_cs } from './PlayModeBtn';

const ButtonGroupWapper = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  width:100%;
  height:100px;
  /* padding:0 30px; */
  position:fixed;
  bottom:120px;

  &.animation-element{
    animation-duration:0.6s;
    animation-timing-function:ease-out;
    /* animation-delay:1s;  */
  }

  div {
    flex:0 0 120px;
    text-align:center;
  }

  i {
    width:100%;
    height:100%;
    text-align:center;
    vertical-align:center;
    font-size:30pt;
    color:${props => props.theme.$color$theme}
  }

`

interface iState {

}

export class PlayerButtonGroup extends Component<iPlayProps, iState> {

  private prev_cs = 'iconLastshangyiqu';
  private next_cs = 'iconNextxiayiqu';
  private play_cs = ['iconPlaybofang', 'iconPausezanting'];
  private like_cs = ['iconshoucang'];

  constructor(props: iPlayProps) {
    super(props);
    this.state = {}
  }

  private modecsClk = (e) => {
    let { modeChange } = this.props;
    modeChange && modeChange(e);
  }

  private prevClk = (e) => {
    let { prevHandler } = this.props;
    prevHandler && prevHandler(e);
  }

  private nextClk = (e) => {
    let { nextHandler } = this.props;
    nextHandler && nextHandler(e);
  }

  private pauseClk = e => {
    let { pauseHandler } = this.props;
    pauseHandler && pauseHandler(e);

  }

  render() {

    let mode = this.props.mode || 1;
    let isPlay = this.props.isPlay || false;

    let modecs = mode_cs[mode - 1];
    let playcs = isPlay ? this.play_cs[0] : this.play_cs[1];
    let likecs = this.like_cs[0];

    return (
      <ButtonGroupWapper className={'player-btn-group-wapper animation-element'}>
        <div><i onClick={this.modecsClk} className={`iconfont ${modecs}`}></i></div>
        <div><i onClick={this.prevClk} className={`iconfont ${this.prev_cs}`}></i></div>
        <div><i onClick={this.pauseClk} className={`iconfont ${playcs}`}></i></div>
        <div><i onClick={this.nextClk} className={`iconfont ${this.next_cs}`}></i></div>
        <div><i className={`iconfont ${likecs}`}></i></div>
      </ButtonGroupWapper>
    )
  }
}