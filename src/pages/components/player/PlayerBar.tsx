

import React, { useState, useEffect, Component, RefObject, Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PlayerBarWaraper } from './PlayerBar.styled';
import { PLAY_MODE } from '../../../logicFunction/Constant';
import { Song } from '../../../logicFunction/song';

const QMPlayer = Object(window).QMplayer;
// import QMplayer from 'qm-player';
import { PlayerProcess } from './PlayerProgress';

const enum EType {
  play = 'play',                //事件在暂停时触发
  error = 'error',              //事件在发生错误时触发
  pause = 'pause',              //事件在关闭弹窗时触发
  add = 'add',
  ended = 'ended',              //事件在播放停止时触发
  timeupdate = 'timeupdate',    //事件在播放位置发生改变时触发
  waiting = 'waiting'           //事件在缓冲数据时触发
}

interface iPorps {
  curSong?: Song;
}

interface iState {
  mode?: PLAY_MODE.LOOP_LIST;
  isPlay?: boolean;
  percent?: number;
}

class PlayerBar extends Component<iPorps, iState> {

  private player;
  constructor(props: iPorps) {
    super(props);
    this.player = new QMPlayer();
    this.player.loop = false;
    this.state = {
      mode: PLAY_MODE.LOOP_LIST,
      isPlay: true,
      percent: 0
    }
  }

  private pauseClickHandler = (e) => {
    let { curSong } = this.props;
    this.player.toggle();
  }

  render() {
    let { curSong } = this.props;
    let { isPlay } = this.state;
    let img = curSong ? curSong.image : '';
    let songName = curSong ? curSong.name : '';
    let percent = this.state.percent || 0;
    const getDesc = (song: Song) => (song ? `${song.singer}·${song.album}` : "");

    let progressProps = {
      isPlay,
      percent,
      onClick: this.pauseClickHandler
    }

    return (
      <PlayerBarWaraper id='playerBar' img={img}>
        <div className="c1" ><span className={`imgCir ${isPlay ? 'imgCirRation' : ''}`}></span></div>
        <div className="c2">
          <h2 className="no-warp">{songName}</h2>
          <p className="no-warp">{getDesc(curSong)}</p>
        </div>
        <div className="c3">
          <PlayerProcess {...progressProps}></PlayerProcess>
          <i className="iconfont iconSongListgedan"></i>
        </div>
      </PlayerBarWaraper>
    )
  }

  private onPlay = (e) => {
    console.log('play');
    if (!this.state.isPlay) {
      this.setState({ isPlay: true })
    }
  }

  private onEnded = (e) => {
    console.log('ended');
  }

  private onTimeupdate = (e) => {
    let totalTime = this.player.duration || 0;
    let p = this.player.currentTime / totalTime;
    this.setState({ percent: p });
    //console.log('timeupdate', this.player.currentTime);
  }

  private onPause = (e) => {
    console.log('onPause');
    if (this.state.isPlay) this.setState({ isPlay: false });
  }

  private nextPlay = () => {
    console.log('nextPlay');
  }

  private prevPlay = () => {
    console.log('prevPlay');
  }

  private onListener = () => {
    if (this.player) {
      this.player.on(EType.play, this.onPlay);
      this.player.on(EType.ended, this.onEnded);
      this.player.on(EType.pause, this.onPause);
      this.player.on(EType.timeupdate, this.onTimeupdate);
    }
  }

  private autoPlay = () => {
    let { curSong } = this.props;
    if (this.player && curSong) {
      this.player.play(curSong.mid);
    }
  }

  componentDidMount() {
    this.onListener();
    this.autoPlay();
  }

  componentDidUpdate(prevProps, prevState) {
    let { curSong } = this.props;
    if (curSong != prevProps.curSong) {
      this.autoPlay();
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.off(EType.play, this.onPlay);
      this.player.off(EType.ended, this.onEnded);
      this.player.off(EType.pause, this.onPause);
      this.player.off(EType.timeupdate, this.onTimeupdate);
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(PlayerBar);