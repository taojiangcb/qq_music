import React, { useState, useEffect, Component, RefObject, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Song } from '../../../logicFunction/song';
import { PlayerPaperWapper, PlayerTop, PlayerCDWapper } from './PlayerPage.styled';
import { PLAY_MODE } from '../../../logicFunction/Constant';
import { PlayerButtonGroup } from './PlayerButtonGroup';
import { animateCSS } from '../../animateCSS/Animatecss';
import LineProcessBar from './LineProcess';
import Lyric from './Lyric';
import { getLyric } from '../../../api/Song';
import { Base64 } from 'js-base64'

export interface iPlayProps {
  curSong?: Song,
  isPlay?: boolean;
  percent?: number;
  mode?: PLAY_MODE;                   //播放模式
  totalTime?: number;                 //播放的时间

  pauseHandler?: Function;            //暂停
  nextHandler?: Function;             //下一曲
  prevHandler?: Function;             //上一曲
  hidePage?: Function;                //关闭
  modeChange?: Function;
  changeTime?: Function;
}

interface iState {
  lyricStr?: string;
}

class PlayerPage extends PureComponent<iPlayProps, iState> {

  /** cd 图片处理  */
  private cdRef: RefObject<HTMLDivElement>;
  private lyricRef: RefObject<any>;

  constructor(props: iPlayProps) {
    super(props);
    let { curSong } = this.props;
    this.state = { lyricStr: curSong.lyric }
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
        <Lyric lyric={this.state.lyricStr} percent={this.props.percent} totalTime={this.props.totalTime}></Lyric>
        <LineProcessBar changeTime={this.props.changeTime} percent={this.props.percent} totalTime={this.props.totalTime}></LineProcessBar>
        <PlayerButtonGroup {...this.props} />
      </PlayerPaperWapper >
    )
  }

  private backHandler = (e) => {
    let { hidePage } = this.props;
    this.fadeOut(hidePage);
  }

  componentDidMount() {
    this.fadeIn();
    this.featch_lyric();
  }

  componentDidUpdate(prevProps: iPlayProps, prevState) {
    if (this.props.curSong != prevProps.curSong) {
      this.featch_lyric();
    }
  }

  private featch_lyric = () => {
    let { curSong } = this.props;
    if (curSong && !curSong.lyric) {
      getLyric(curSong.mid)
        .then(res => {
          if (res.data.success) {
            curSong.lyric = Base64.decode(res.data.data.lyric);
            this.setState({ lyricStr: curSong.lyric })
          }
        })
    }
    else {
      this.setState({ lyricStr: curSong.lyric })
    }
  }

  private fadeIn = () => {
    animateCSS('.bg', 'fadeIn');
    animateCSS('.player-top-wapper', 'fadeInDown');
    animateCSS('.CDWapper', 'zoomIn');
    animateCSS('.player-btn-group-wapper', 'fadeInUp');
    animateCSS('.lineprocess-bar', 'fadeInUp');
    animateCSS('.lyric', 'fadeInUp');
  }

  private fadeOut = (cb) => {
    animateCSS('.bg', 'fadeOut', cb);
    animateCSS('.lineprocess-bar', 'fadeOut');
    animateCSS('.player-top-wapper', 'fadeOutUp');
    animateCSS('.CDWapper', 'zoomOut');
    animateCSS('.player-btn-group-wapper', 'fadeOutDown');
    animateCSS('.lyric', 'fadeOut');
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