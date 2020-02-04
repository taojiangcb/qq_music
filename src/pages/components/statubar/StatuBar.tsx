
import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-px2vw';

const StatubarStyled = styled.div`
  width:100%;
  height:80px;
  line-height:80px;
  font-weight:400;
  font-size:20px;
  width:100%;
  position: fixed;

  > i{
    color:${props => (props.theme.$color$theme)};
    display:inline-block;
    position:absolute;
    padding:0 30px;
    line-height:61px;
    top:10px;
  }

  > h2 {
    color:#FFF;
    text-align:center;
    font-size:40px;
  }
`

interface iPorps {
  onBack?: Function;
  title?: string
}

interface iState { }

export class StatuBar extends Component<iPorps, iState> {
  constructor(props: iPorps) {
    super(props);
    this.state = {}
  }

  private backHandler = () => {
    let { onBack: backFn } = this.props;
    backFn && backFn();
  }

  render() {
    let { title } = this.props;
    return (
      <StatubarStyled>
        <i className="iconfont iconziyuan" onClick={e => this.backHandler()}></i>
        <h2>{title}</h2>
      </StatubarStyled>
    )
  }
}