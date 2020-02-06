import React, { Fragment } from 'react'
import { Store, Dispatch } from 'redux'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { iProps } from '../../interfaces/iComponentProps';
import { Header } from '../components/head/Header';
import ContainerComponent from '../container/Container';
import styled from 'styled-components';
import PlayerBar from '../components/player/PlayerBar';
import { connect } from 'react-redux';
import { Song } from '../../logicFunction/Song';

const HomeWapper = styled.div`
  position:relative;
`

interface iHomeProp { curSong?: Song; }

const Home = (props: iHomeProp & RouteConfigComponentProps) => {
  let { curSong } = props;
  const render_play_bar = (<PlayerBar></PlayerBar>)
  return (
    <HomeWapper id="homeWapper">
      <Header />
      <ContainerComponent>
        {renderRoutes(props.route.routes)}
      </ContainerComponent>
      {render_play_bar}
    </HomeWapper>
  )
}

Home.InitPropsData = (store: Store) => { }
const mapStateToProps = (state: any) => {
  return { curSong: state.reducerPlay.curSong }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);