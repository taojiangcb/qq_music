import styled from 'styled-px2vw';
import React, { Component } from 'react';
import { iProps, iState } from '../../../interfaces/iComponentProps';
import { AppStyled, NormalTheme } from '../../../assets/AppCss';
import { HeaderWapper, NavTopWapper, NavItem, HeaderContianer } from './HeaderStyled';
import { RouterKeys } from '../../../routers/Routers';
import { withRouter, RouteComponentProps } from 'react-router';

interface initState {
  curKey?: string;
}

class Header extends Component<iProps & RouteComponentProps, iState & initState> {
  constructor(props) {
    super(props);
    this.state = {
      curKey: ""
    }
  }

  private navClick = (val) => {
    this.setState({ curKey: val });
    this.props.history.push(val);
    console.log('navClick...' + val);
  }

  render() {

    let { curKey } = this.state;

    const chrooseItem = (k: string) => {
      return curKey === k ? 'selected' : '';
    }

    return (
      <HeaderContianer id={`navHeader`}>
        <HeaderWapper theme={NormalTheme}>
          <span className='img'></span><span>TAO MUSIC</span>
        </HeaderWapper>
        <NavTopWapper>
          <NavItem className={chrooseItem(RouterKeys.recommend)} onClick={e => { this.navClick(RouterKeys.recommend) }}><span>推荐</span></NavItem>
          <NavItem className={chrooseItem(RouterKeys.rank)} onClick={e => { this.navClick(RouterKeys.rank) }} ><span>排行</span></NavItem>
          <NavItem className={chrooseItem(RouterKeys.singer)} onClick={e => { this.navClick(RouterKeys.singer) }}><span>歌手</span></NavItem>
        </NavTopWapper>
      </HeaderContianer>
    )
  }
}

const withRotersHead = withRouter(Header)
export { withRotersHead as Header }