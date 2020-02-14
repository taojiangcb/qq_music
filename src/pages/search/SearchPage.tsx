
import React, { useState, useEffect, Component, ChangeEvent, Fragment } from 'react';
import { SearchWapperInputBar, SearchWapper, FlagWapper, HistoryWapper, SearchSongList, loading_img } from './SearchPage.styled';
import { initLoadData, clientStore } from '../../redux/Store';
import { dispatch_featch_hot_key } from './reducer/Actions.Search';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Song, createSong } from '../../logicFunction/Song';
import { debounce__ } from '../../es/Functional';
import { search } from '../../api/Search';
import { setHistorySearch, getHistorySearch, saveHistoryList } from '../../logicFunction/OS';
import { Scroll } from '../components/scroll/Scroll';
import {
  action_featch_musiclist,
  action_play_Song
} from '../components/player/reducer/Actions.play';



interface iPorps {
  hotKeys?: any[];
  curSong?: Song;
}

interface iState {
  query: string;
  searchSongs?: Song[];
  playSongs: Song[];
  historyKeys: string[];
  isLoading: boolean;
}

class SearchPage extends Component<iPorps, iState> {

  private page: number = 0;
  private hasMore: boolean = false;
  private showSinger: boolean = true;
  private perpage: number = 20;
  private debounce;

  constructor(props: iPorps) {
    super(props);
    this.state = {
      query: '',
      searchSongs: [],
      playSongs: [],
      historyKeys: [],
      isLoading: false
    }
    this.debounce = debounce__(this.searchHandler, 1000);
  }

  private inputChange = (e: ChangeEvent) => {
    let input: HTMLInputElement = e.currentTarget as HTMLInputElement;
    let v = input.value.trim();
    this.setState({ query: v })
  }

  private hotKeyClick = (item: { k, n }) => {
    console.log(item);
    this.setState({ query: item.k }, () => {
      this.clearSongs();
      this.debounce();
    });
  }

  private searchHandler = async () => {
    let { query, historyKeys, searchSongs } = this.state;
    if (!query) {
      this.debounce.undebounce();
      return;
    }

    this.setState({ isLoading: true })
    let res = await search(query, this.page, this.showSinger, this.perpage);
    this.setState({ isLoading: false })
    if (res.data.success) {

      if (setHistorySearch(query)) {
        let newList = [...historyKeys, query];
        this.setState({ historyKeys: newList })
      }

      let songs: any[] = res.data.data.data.song.list;
      if (songs) {
        let newSongList = searchSongs.concat();
        songs.map(item => {
          let song = createSong(item);
          newSongList.push(song);
        })
        this.setState({ searchSongs: newSongList })
      }

      this.checkMore(res);
    }
  }

  private checkMore = (res: any) => {
    let { totalnum } = res.data.data.data.song;
    if ((this.page * this.perpage) < totalnum) {
      this.hasMore = true;
    }
    else {
      this.hasMore = false;
    }
  }

  private clearHistory = () => {
    this.setState({ historyKeys: [] });
    saveHistoryList([])
  }

  private clearHistoryItem = (k: string) => {
    let listData = this.state.historyKeys.concat();
    for (let i = 0; i < listData.length;) {
      if (listData[i] === k) {
        listData.splice(i, 1);
      }
      else {
        i++;
      }
    }
    this.setState({ historyKeys: listData });
    saveHistoryList(listData);
  }

  private initHistoryKeys = () => {
    let historyKyes = getHistorySearch();
    if (historyKyes) {
      this.setState({ historyKeys: historyKyes });
    }
  }

  /**按下回车 */
  private onSearchEnter = (e: React.KeyboardEvent) => {
    if (e.keyCode == 13) {
      this.clearSongs();
      this.debounce();
    }
  }

  private onScrollToBottomHandler = () => {
    console.log('onScrollToBottomHandler');
    let { query } = this.state;
    if (this.hasMore && query) {
      this.page++;
      this.searchHandler();
    }
  }

  private onPlay(song: Song) {
    let { curSong } = this.props;
    if (curSong) {
      if (song.mid === curSong.mid) return;
    }

    let { playSongs, isLoading } = this.state;
    let newPlayList = playSongs.concat();
    let exist: boolean = false;
    newPlayList.forEach(element => {
      if (element.mid === song.mid) {
        exist = true;
      }
    })

    if (!exist) {
      newPlayList.push(song);
      this.setState({ playSongs: newPlayList }, () => {
        setTimeout(() => {
          this.forceUpdate();
        }, 0)
      });
    }

    let store = clientStore();
    if (store) {
      store.dispatch(action_featch_musiclist(newPlayList));
      store.dispatch(action_play_Song(song));
    }
  }

  render() {
    let { hotKeys } = this.props;
    let { query, historyKeys, searchSongs, isLoading } = this.state;
    const renderHotKeys = (
      <div>
        {hotKeys && hotKeys.map((item: { k: string, n: number }, index: number) => {
          if (index <= 15) {
            return <span onClick={e => this.hotKeyClick(item)} key={item.n}>{item.k}</span>
          }
        })}
      </div>
    )

    const renderHistory = (
      <HistoryWapper>
        <p>
          搜索历史
        <i onClick={e => this.clearHistory()} className="iconfont iconRectangleCopy"></i>
        </p>
        <div>
          <ul>
            {historyKeys && historyKeys.map((item, index) => {
              return <li key={item + index + "id"}>
                <span onClick={e => { this.hotKeyClick({ k: item, n: 0 }) }}>{item}</span>
                <i onClick={e => { this.clearHistoryItem(item) }} className="iconfont iconjian"></i>
              </li>
            })}
          </ul>
        </div>
      </HistoryWapper>
    )

    const renderSearchContent = (
      <Fragment>
        <FlagWapper>
          <h2>热门搜索</h2>
          {renderHotKeys}
        </FlagWapper>
        {renderHistory}
      </Fragment>
    )

    const renderSearchList = (
      <SearchSongList>
        {searchSongs && searchSongs.map((item: Song, index: number) => {
          return <li onClick={e => { this.onPlay(item) }} className={'no-warp'} key={item.mid + index}>
            <i className={'iconfont iconMusicyinle'}></i>
            <span>{item.name}</span>
          </li>
        })}
        {isLoading && <li className={'loading'}><img src={loading_img}></img></li>}
      </SearchSongList>
    )

    return (
      <Scroll scrollToBottom={this.onScrollToBottomHandler}>
        <SearchWapper>
          <SearchWapperInputBar>
            <div>
              <i className={'sosuo iconfont iconsousuo'}></i>
              <input onKeyDown={this.onSearchEnter} placeholder="搜索歌手、歌名" type={"text"} value={query} onChange={this.inputChange}></input>
              {
                query && <i onClick={e => {
                  this.setState({ query: '' })
                  this.clearSongs();
                }} className={'iconfont iconRectangleCopy3 clear-sosuo'}></i>
              }
            </div>
          </SearchWapperInputBar>
          {
            query
              ? renderSearchList
              : renderSearchContent
          }
        </SearchWapper>
      </Scroll>
    )
  }

  private clearSongs = () => {
    this.page = 0;
    this.setState({ searchSongs: [] })
  }

  componentDidMount = async () => {
    await initSearchData();
    this.initHistoryKeys();
  }

  componentWillUnmount() {
    this.debounce.undebounce();
  }
}

export const initSearchData = async () => {
  console.log('initSearchData');
  await Promise.all([initLoadData(dispatch_featch_hot_key)()])
}

const propsMap = (state: any) => {
  return {
    hotKeys: state.reducerSearch.hotKeys,
    curSong: state.reducerPlay.curSong
  };
}

const displayMap = (display: ThunkDispatch<any, any, AnyAction>) => {
  return {}
}

export default connect(propsMap, displayMap)(SearchPage);