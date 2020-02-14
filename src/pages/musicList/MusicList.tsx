import React, { Component, RefObject } from 'react';
import { StatuBar } from '../components/statubar/StatuBar';
import { IconPlay, MusicListWapper, MusicBanner, RankMusicFilter, SongListItem } from './MusicList.styled';
import { initLoadData } from '../../redux/Store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Song } from '../../logicFunction/Song';
import {
  action_play_Song,
  action_featch_musiclist,
  action_play_model,
  action_play_showPage
} from '../components/player/reducer/Actions.play';
import { Scroll } from '../components/scroll/Scroll';
import { animateCSS } from '../animateCSS/Animatecss';
import { PLAY_MODE } from '../../logicFunction/Constant';

interface iPorps {

  showRank?: boolean;
  title?: string;
  songList?: Song[];
  onBack?: Function;
  play_song?: (song: Song) => void;
  set_list?: (songs: Song[]) => void;
  change_mode?: (mode: PLAY_MODE) => void;
  show_page?: (show: boolean) => void;
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
    this.fadeOut(onBack);
  }

  private onScroll(e) {
    let topY = window.scrollY;
    console.log(topY);
  }

  private scrollOffH = () => {
    let rect: DOMRect = this.bannerRef.current.getBoundingClientRect();
    return rect.bottom - rect.top;
  }

  private itemClick = (item) => {
    this.props.play_song(item);
    this.props.show_page(true);
    this.forceUpdate();
  }

  private randomClick = () => {
    this.props.change_mode(PLAY_MODE.RANDOM);
    let index = Math.round(Math.random() * this.props.songList.length);
    let song = this.props.songList[index];
    this.props.play_song(song);
    this.props.show_page(true);
  }

  render() {

    let { title, showRank } = this.props;
    let { songList } = this.props;
    let backimg = songList && songList.length > 0 ? songList[0].image : ""
    const iconCls = (index) => (index < 3 ? "icon" + index : 'text')
    const getDesc = (song: Song) => (`${song.singer}·${song.album}`);
    const render_list = (
      songList && songList.map((item: Song, index) => (
        <SongListItem key={item.mid || item.url} onClick={e => {
          this.itemClick(item);
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
      <MusicListWapper className={'music-list-wapper animation-element'}>
        <MusicBanner ref={this.bannerRef} backImg={backimg}>
          <RankMusicFilter />
          <StatuBar onBack={this.onBackHandler} title={title}></StatuBar>
          <IconPlay>
            <i className={'iconfont iconPausezanting'}></i>
            <span onClick={e => {
              this.randomClick();
            }} >随机播放</span>
          </IconPlay>
        </MusicBanner>
        <Scroll calcOffH={this.scrollOffH}>
          {render_list}
        </Scroll>
      </MusicListWapper>
    )
  }

  private fadeIn = () => {
    animateCSS('.music-list-wapper', "slideInRight");
  }

  private fadeOut = (cb) => {
    animateCSS('.music-list-wapper', "slideOutRight", cb)
  }

  componentDidMount = async () => {
    let { set_list, songList } = this.props;
    this.fadeIn();
    setTimeout(() => {
      if (set_list && songList) set_list(songList);
    }, 0)
  }
}


const mapStateToProps = (state: any) => {
  return {
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    play_song(song: Song) {
      dispatch(action_play_Song(song));
    },
    set_list(songs: Song[]) {
      dispatch(action_featch_musiclist(songs))
    },
    change_mode(mode: PLAY_MODE) {
      dispatch(action_play_model(mode));
    },
    show_page(show: boolean) {
      dispatch(action_play_showPage(show));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);