import React, { Fragment, useEffect } from 'react'
import { Store, Dispatch } from 'redux'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { iProps } from '../../interfaces/iComponentProps';
import { Header } from '../components/head/Header';
import ContainerComponent from '../container/Container';
import styled from 'styled-components';
import PlayerBar from '../components/player/PlayerBar';
import { connect } from 'react-redux';
import { Song } from '../../logicFunction/Song';
import { isPC, isMobile } from '../../es/Browser';

const HomeWapper = styled.div`
  position:relative;
`
const PCHomeWapper = styled.div`
  position:relative;
`

interface iHomeProp { curSong?: Song; }

const AppFrame = (props) => (
  isMobile()
    ? <HomeWapper id="homeWapper">{props.children}</HomeWapper>
    : <PCHomeWapper id="homeWapper">{props.children}</PCHomeWapper>
)


const Home = (props: iHomeProp & RouteConfigComponentProps) => {
  let { curSong } = props;
  const render_play_bar = (<PlayerBar></PlayerBar>)


  return (
    <AppFrame>
      <Header />
      <ContainerComponent>
        {renderRoutes(props.route.routes)}
      </ContainerComponent>
      {render_play_bar}
    </AppFrame>
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