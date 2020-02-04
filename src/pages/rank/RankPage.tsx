import React, { useState, useEffect, Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { Scroll } from '../components/scroll/Scroll';
import { Model } from '../../modules/DataStruct';
import { initLoadData } from '../../redux/Store';
import { dispatch_featch_toplist } from './reducer/Actions.Rank';
import { RankPageItem, RankPageWapper, RankPageContent } from './RankPage.styled';
import { RankMusicWapper } from './RankMusic.styled';
import RankMusic from './RankMusic';
import { GlobalStyle } from '../../assets/Reset';

interface iPorps {
  topList?: Model.TopInfo[];
}

interface iState {
  topInfo?: Model.TopInfo;
}

class RankPage extends Component<iPorps, iState> {
  constructor(props: iPorps) {
    super(props);
    this.state = {
      topInfo: null,
    }
  }

  private itemClick = (data: Model.TopInfo) => {
    this.setState({ topInfo: data });
    console.log(data);
  }

  private musicOnBack = () => {
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
      let { topInfo } = this.state;
      return (
        topInfo
          ? <RankMusic topInfo={topInfo} onBack={this.musicOnBack}></RankMusic>
          : ""
      )
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