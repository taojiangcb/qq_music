import React, { Component, RefObject } from 'react';
import { StatuBar } from '../components/statubar/StatuBar';
import { IconPlay, RankMusicWapper, MusicBanner, RankMusicFilter, SongListItem } from './MusicList.styled';
import { initLoadData } from '../../redux/Store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Song } from '../../logicFunction/Song';
import { action_play_Song, action_featch_musiclist } from '../components/player/reducer/Actions.play';
import { Scroll } from '../components/scroll/Scroll';

interface iPorps {

  showRank?: boolean;
  title?: string;
  songList?: Song[];
  onBack?: Function;
  play_song?: (song: Song) => void;
  set_list?: (songs: Song[]) => void;
}

interface iState { }
class MusicList extends Component<iPorps, iState> {

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
    // let { topInfo } = this.props;
    // let title = topInfo.topTitle;
    let { title, showRank } = this.props;
    let { songList } = this.props;
    let backimg = songList && songList.length > 0 ? songList[0].image : ""
    const iconCls = (index) => (index < 3 ? "icon" + index : 'text')
    const getDesc = (song: Song) => (`${song.singer}·${song.album}`);
    const render_list = (
      songList && songList.map((item:Song, index) => (
        <SongListItem key={item.mid || item.url} onClick={e => {
          this.props.play_song(item);
          this.forceUpdate();
        }}>
          {
            showRank
              ? <div className={`icon ` + iconCls(index)}>
                {index > 2 ? (index + 1) : ""}
              </div>
              : <div className={`icon text`}> {index + 1} </div>

          }
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
    let { set_list, songList } = this.props;
    if (set_list && songList) set_list(songList);
    // let { topInfo } = this.props;
    // await loadTopmusic(topInfo.id);
  }
}

// export const loadTopmusic = async (topId?: number) => {
//   return initLoadData(dispatch_featch_musiclist, topId)();
// }

const mapStateToProps = (state: any) => {
  return {
    // topList: state.reducerRank.topList,
    // songList: state.reducerPlay.songList,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    play_song(song: Song) {
      dispatch(action_play_Song(song));
    },
    set_list(songs: Song[]) {
      dispatch(action_featch_musiclist(songs))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
// const MusicListConnect = connect(mapStateToProps, mapDispatchToProps)(MusicList);
//export default MusicListConnect;


// const SuspenseMusicList = (requestFn: Function, title?: string) => {
//   let songList = requestFn();
// }
//export default connect(mapStateToProps, mapDispatchToProps)(MusicList)