import React, { useState, useEffect, Component, RefObject } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Song } from '../../../logicFunction/song';
import { PlayerPaperWapper, PlayerTop, PlayerCDWapper } from './PlayerPage.styled';
import { PLAY_MODE } from '../../../logicFunction/Constant';
import { PlayerButtonGroup } from './PlayerButtonGroup';
import { animateCSS } from '../../animateCSS/Animatecss';


export interface iPlayProps {
  curSong?: Song,
  isPlay?: boolean;
  percent?: number;
  mode?: PLAY_MODE;       //播放模式
  pauseHandler?: Function;
  nextHandler?: Function;
  prevHandler?: Function;
  hidePage?: Function;
  modeChange?: Function;
}

interface iState { }

class PlayerPage extends Component<iPlayProps, iState> {

  private cdRef: RefObject<HTMLDivElement>;
  constructor(props: iPlayProps) {
    super(props);
    this.state = {}
  }

  render() {
    let { curSong, isPlay } = this.props;
    let songName: string = curSong ? curSong.name : "";
    let singer: string = curSong ? curSong.singer : "";
    let img: string = curSong.image ? curSong.image : "";
    let { hidePage } = this.props;

    return (
      <PlayerPaperWapper>
        <div className={'animation-element bg'}>
          <img src={img} />
        </div>
        <PlayerTop className='player-top-wapper animation-element'>
          <i onClick={e => { this.backHandler(e) }} className={'iconfont iconRectangleCopy'}></i>
          <h1> {songName} </h1>
          <p> {singer} </p>
        </PlayerTop>
        <PlayerCDWapper ref={this.cdRef}>
          <div className={"CDWapper animation-element"}>
            <img src={img} className={isPlay ? 'rotation' : ""}></img>
          </div>
        </PlayerCDWapper>
        <PlayerButtonGroup {...this.props} />
      </PlayerPaperWapper>
    )
  }

  private backHandler = (e) => {
    let { hidePage } = this.props;
    this.fadeOut(hidePage);
  }

  componentDidMount() {
    this.fadeIn();
  }

  private fadeIn = () => {
    animateCSS('.bg', 'fadeIn');
    animateCSS('.player-top-wapper', 'fadeInDown');
    animateCSS('.CDWapper', 'zoomIn');
    animateCSS('.player-btn-group-wapper', 'fadeInUp');
  }

  private fadeOut = (cb) => {
    animateCSS('.bg', 'fadeOut', cb);
    animateCSS('.player-top-wapper', 'fadeOutUp');
    animateCSS('.CDWapper', 'zoomOut');
    animateCSS('.player-btn-group-wapper', 'fadeOutDown');
  }
}

const mapStateToProps = (state: any) => {
  return {
    curSong: state.reducerPlay.curSong,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage)