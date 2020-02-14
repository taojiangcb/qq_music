import React, { useState, useEffect, Component, Fragment, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { Scroll } from '../components/scroll/Scroll';
import { Model } from '../../modules/DataStruct';
import { initLoadData } from '../../redux/Store';
import { dispatch_featch_toplist } from './reducer/Actions.Rank';
import { RankPageItem, RankPageWapper, RankPageContent } from './RankPage.styled';
import MusicList from '../musicList/MusicList';
import { getMusicList } from '../../api/Rank';
import { createFetch } from '../../react_extends/SuspenseExtends';
import { createSong } from '../../logicFunction/song';
import { PageLoading } from '../components/loading/PageLoading';
import { Song } from '../../logicFunction/Song';
import { ErrorBoundary, prefetch, useFetch } from 'react-hooks-fetch';

interface iPorps {
  topList?: Model.TopInfo[];
}

interface iState {
  topInfo?: Model.TopInfo;
  songList?: Song[];
}

class RankPage extends Component<iPorps, iState> {
  constructor(props: iPorps) {
    super(props);
    this.state = {
      topInfo: null,
      songList: null,
    }
  }

  private itemClick = (data: Model.TopInfo) => {
    this.setState({ topInfo: data, songList: null });
    getMusicList(data.id)
      .then(res => {
        let songList = res.songlist.map(item => {
          if (item.data.songid && item.data.albummid) {
            return createSong(item.data);
          }
        })
        songList = songList.filter(item => (item ? true : false))
        setTimeout(()=> {
          this.setState({ songList });
        },0);
      })
  }

  private musicOnBack = (e) => {
    this.setState({ topInfo: null })
    console.log('backhandler....');
  }

  render() {
    let { topList } = this.props;
    const renderTopList = (
      <Scroll>
        <RankPageWapper>
          {
            topList && topList.map(item => (
              <RankPageItem key={item.id} onClick={e => this.itemClick(item)}>
                <img src={item.picUrl} alt={item.topTitle}></img>
                <ul>
                  <li>
                    {item.songList && item.songList.map((sitem, index) => (
                      <p key={item.id + index}>{index + 1}.{sitem.songname} - {sitem.singername}</p>
                    ))}
                  </li>
                </ul>
              </RankPageItem>
            ))
          }
        </RankPageWapper>
      </Scroll>
    )

    const renderSingList = () => {
      let { topInfo, songList } = this.state;
      let renderLoad = topInfo && !songList;
      let rendNull = !topInfo;

      let res: any = "";
      if (rendNull) res = "";
      else if (renderLoad) res = <PageLoading></PageLoading>
      else {
        res = <MusicList showRank={true} onBack={this.musicOnBack} title={topInfo.topTitle} songList={songList}></MusicList>
      }
      return res;
    }

    return (
      <RankPageContent>
        {renderTopList}
        {renderSingList()}
      </RankPageContent>
    )
  }

  componentDidMount() {
    initRankData();
  }
}

export const initRankData = async () => {
  let initTopFN = initLoadData(dispatch_featch_toplist);
  return Promise.all([initTopFN()]);
}

const mapStateToProps = (state: any) => {
  return {
    topList: state.reducerRank.topList,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RankPage)