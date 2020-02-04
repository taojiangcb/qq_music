

import React, { Component, RefObject } from 'react';
import { Model } from '../../modules/DataStruct';
import { StatuBar } from '../components/statubar/StatuBar';
import { IconPlay, RankMusicWapper, MusicBanner, RankMusicFilter, SongListItem } from './RankMusic.styled';
import { initLoadData } from '../../redux/Store';
import { dispatch_featch_musiclist } from './reducer/Actions.Rank';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Song } from '../../logicFunction/Song';
import { Scroll } from '../components/scroll/Scroll';
import { action_play_Song } from '../components/player/reducer/Actions.play';

interface iPorps {
  topInfo?: Model.TopInfo;
  signList?: Song[];
  onBack?: Function;
  play_song?: (song: Song) => void;
}

interface iState { }
class RankMusic extends Component<iPorps, iState> {

  private bannerRef: RefObject<HTMLDivElement>;
  constructor(props: iPorps) {
    super(props);
    this.state = {};
    this.bannerRef = React.createRef();
  }

  private onBackHandler = () => {
    let { onBack } = this.props;
    onBack && onBack();
  }

  private onScroll(e) {
    let topY = window.scrollY;
    console.log(topY);
  }

  private scrollOffH = () => {
    let rect: DOMRect = this.bannerRef.current.getBoundingClientRect();
    return rect.bottom - rect.top;
  }

  render() {
    let { topInfo } = this.props;
    let title = topInfo.topTitle;
    let { signList } = this.props;
    let backimg = signList && signList.length > 0 ? signList[0].image : ""
    const iconCls = (index) => (index < 3 ? "icon" + index : 'text')
    const getDesc = (song: Song) => (`${song.singer}·${song.album}`);
    const render_list = (
      signList && signList.map((item, index) => (
        <SongListItem key={item.mid} onClick={e => {
          this.props.play_song(item);
          this.forceUpdate();
        }}>
          <div className={`icon ` + iconCls(index)}>
            {index > 2 ? (index + 1) : ""}
          </div>
          <div className={'content'}>
            <h2 className={'name no-warp'}>{item.name}</h2>
            <p className={'desc no-warp'}>{getDesc(item)}</p>
          </div>
        </SongListItem >
      ))
    )

    return (
      <RankMusicWapper>
        <MusicBanner ref={this.bannerRef} backImg={backimg}>
          <RankMusicFilter />
          <StatuBar onBack={this.onBackHandler} title={title}></StatuBar>
          <IconPlay>
            <i className={'iconfont iconPausezanting'}></i>
            <span>随机播放</span>
          </IconPlay>
        </MusicBanner>
        <Scroll calcOffH={this.scrollOffH}>
          {render_list}
        </Scroll>
      </RankMusicWapper>
    )
  }

  componentDidMount = async () => {
    console.log('componentDidMount ... RankMusic');
    let { topInfo } = this.props;
    await loadTopmusic(topInfo.id);
  }
}

export const loadTopmusic = async (topId?: number) => {
  return initLoadData(dispatch_featch_musiclist, topId)();
}

const mapStateToProps = (state: any) => {
  return {
    topList: state.reducerRank.topList,
    signList: state.reducerPlay.signList,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    play_song(song: Song) {
      dispatch(action_play_Song(song));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RankMusic)