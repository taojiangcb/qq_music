

import React, { useState, useEffect, Component, RefObject, Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PlayerBarWaraper } from './PlayerBar.styled';
import { PLAY_MODE } from '../../../logicFunction/Constant';
import { Song } from '../../../logicFunction/song';

// import QMplayer from 'qm-player';
const QMPlayer = Object(window).QMplayer;

import { PlayerProcess } from './CircleProgress';
import PlayerPage, { iPlayProps } from './PlayerPage';
import { action_play_Song } from './reducer/Actions.play';

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
  songList?: Song[];
  play_song?: (song: Song) => void;
}

interface iState {
  mode?: PLAY_MODE.LOOP_LIST;       //播放模式
  isPlay?: boolean;                 //是否player
  percent?: number;                 //百分比
  showPageFlag?: boolean;           //显示page
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
      percent: 0,
      showPageFlag: true
    }
  }

  private pauseClickHandler = (e) => {
    let { curSong } = this.props;
    this.player.toggle();
  }

  render() {
    let { curSong } = this.props;
    let { isPlay, showPageFlag, mode } = this.state;
    let img = curSong ? curSong.image : '';
    let songName = curSong ? curSong.name : '';
    let percent = this.state.percent || 0;
    const getDesc = (song: Song) => (song ? `${song.singer}·${song.album}` : "");

    let progressProps: iPlayProps = {
      mode,
      isPlay,
      percent,
      pauseHandler: this.pauseClickHandler,
      nextHandler: this.nextPlay,
      prevHandler: this.prevPlay,
      hidePage: this.hidePage,
      modeChange: this.modeChange
    }

    const renderBar = (
      !showPageFlag
        ? <PlayerBarWaraper id='playerBar' img={img}>
          <div className="c1" >
            <span onClick={e => { this.showPage(e) }} className={`imgCir ${isPlay ? 'imgCirRation' : ''}`}></span>
          </div>
          <div className="c2">
            <h2 className="no-warp">{songName}</h2>
            <p className="no-warp">{getDesc(curSong)}</p>
          </div>
          <div className="c3">
            <PlayerProcess {...progressProps}></PlayerProcess>
            <i className="iconfont iconSongListgedan"></i>
          </div>
        </PlayerBarWaraper>
        : ""
    )

    return (
      <Fragment>
        {renderBar}
        {
          showPageFlag && curSong
            ? <PlayerPage {...progressProps}></PlayerPage>
            : ""
        }
      </Fragment >
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
    this.nextPlay();
  }

  private modeChange = (e) => {
    console.log('modeChnge');
    let { mode } = this.state;
    if (mode == Number(PLAY_MODE.RANDOM)) {
      mode = PLAY_MODE.LOOP_LIST;
    }
    else {
      mode++;
    }
    this.setState({ mode })
  }

  private onTimeupdate = (e) => {
    let totalTime = this.player.duration || 0;
    let p = this.player.currentTime / totalTime;
    this.setState({ percent: p });
  }

  private onPause = (e) => {
    console.log('onPause');
    if (this.state.isPlay) this.setState({ isPlay: false });
  }

  private nextPlay = () => {
    console.log('nextPlay');
    let { curSong, songList, play_song } = this.props;
    let { mode } = this.state;
    if (mode === Number(PLAY_MODE.LOOP_LIST) || mode === Number(PLAY_MODE.LOOP_ONCE)) {
      let idx = songList.indexOf(curSong);
      if (idx != -1) {
        if (idx === songList.length - 1) {
          play_song && play_song(songList[0]);
        }
        else {
          play_song && play_song(songList[idx + 1]);
        }
      }
      else {
        play_song && play_song(songList[0]);
      }
    }
    else {
      let idx = Math.round((songList.length - 1) * Math.random());
      play_song && play_song(songList[idx]);
    }
  }

  private prevPlay = () => {
    console.log('prevPlay');
    let { curSong, songList, play_song } = this.props;
    let { mode } = this.state;
    if (mode === Number(PLAY_MODE.LOOP_LIST) || mode === Number(PLAY_MODE.LOOP_ONCE)) {
      let idx = songList.indexOf(curSong);
      let nid: string = '';
      if (idx != -1) {
        if (idx === 0) {
          play_song && play_song(songList[songList.length - 1]);
        }
        else {
          play_song && play_song(songList[idx - 1]);
        }
      }
      else {
        play_song && play_song(songList[0]);
      }
    }
    else {
      let idx = Math.round((songList.length - 1) * Math.random());
      play_song && play_song(songList[idx]);
    }
  }

  private onPlayerError = (e) => {
    console.log('playError');
    this.nextPlay();
  }

  private hidePage = e => {
    this.setState({ showPageFlag: false }, () => {
      window.dispatchEvent(new Event('resize'));
    })
    console.log('hidePage');
  }

  private showPage = e => {
    this.setState({ showPageFlag: true });
    console.log('hidePage');
  }

  private onListener = () => {
    if (this.player) {
      this.player.on(EType.play, this.onPlay);
      this.player.on(EType.ended, this.onEnded);
      this.player.on(EType.pause, this.onPause);
      this.player.on(EType.timeupdate, this.onTimeupdate);
      this.player.on(EType.error, this.onPlayerError);
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
    songList: state.reducerPlay.songList,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    play_song(song: Song) {
      dispatch(action_play_Song(song));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerBar);