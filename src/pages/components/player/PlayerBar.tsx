
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
import { action_play_Song, action_play_model, action_play_showPage, action_featch_musiclist } from './reducer/Actions.play';
import { clientStore } from '../../../redux/Store';

enum EType {
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
  mode?: PLAY_MODE;
  change_mode?: (mode: PLAY_MODE) => void;
  showPageFlag?: boolean;
  show_page?: (show: boolean) => void;
}

interface iState {
  // mode?: PLAY_MODE.LOOP_LIST;       //播放模式
  isPlay?: boolean;                 //是否player
  percent?: number;                 //百分比
}

class PlayerBar extends PureComponent<iPorps, iState> {
  private player;
  constructor(props: iPorps) {
    super(props);

    this.player = new QMPlayer();
    this.player.loop = false;

    this.state = {
      isPlay: true,
      percent: 0,
    }
  }

  private pauseClickHandler = (e) => {
    let { curSong } = this.props;
    this.player.toggle();
  }

  render() {
    let { curSong, mode, showPageFlag } = this.props;
    let { isPlay } = this.state;
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

    const renderPlayPage = (
      showPageFlag && curSong
        ? <PlayerPage {...progressProps}></PlayerPage>
        : ""
    )

    return (
      <Fragment>
        {renderBar}
        {renderPlayPage}
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
    let { mode, change_mode } = this.props;
    if (mode == Number(PLAY_MODE.RANDOM)) {
      mode = PLAY_MODE.LOOP_LIST;
    }
    else {
      mode++;
    }
    change_mode && change_mode(mode);
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
    if(songList.length === 0) return;
    let { mode } = this.props;
    if (mode === Number(PLAY_MODE.LOOP_LIST) || mode === Number(PLAY_MODE.LOOP_ONCE)) {
      let idx = songList.indexOf(curSong);
      if (idx != -1) {
        if (idx === songList.length - 1) {
          play_song && play_song(songList[0]);
        }
        else {
          let n = idx + 1;
          if (n < songList.length) {
            play_song && play_song(songList[idx + 1]);
          }
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
    let { mode } = this.props;
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
    let { songList, curSong } = this.props;
    let nList = songList.concat();
    this.nextPlay();
    for (let i = 0; i < nList.length;) {
      if (nList[i].mid === curSong.mid) {
        nList.splice(i, 1);
        break;
      }
      else {
        i++;
      }
    }
    let store = clientStore();
    if (store) {
      store.dispatch(action_featch_musiclist(nList))
    }
  }

  private hidePage = e => {
    this.props.show_page(false);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0)
  }

  private showPage = e => {
    this.props.show_page(true);
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
    mode: state.reducerPlay.mode,
    showPageFlag: state.reducerPlay.showPageFlag,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    play_song(song: Song) {
      dispatch(action_play_Song(song));
    },
    change_mode(mode: PLAY_MODE) {
      dispatch(action_play_model(mode));
    },
    show_page(show) {
      dispatch(action_play_showPage(show));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerBar);