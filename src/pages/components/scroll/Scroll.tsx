import React, { useState, useEffect, Component, RefObject } from 'react';
import { ScrollWapper } from './Scroll.styled';
import IScroll from 'iscroll/build/iscroll-probe';

interface iPorps {
  calcOffH?: Function,
}

interface iState { }

const navHeaderH = () => {
  if (document) {
    let o = document.getElementById('navHeader');
    if (o) {
      let rect = o.getBoundingClientRect();
      return rect.bottom - rect.top;
    }
    return 0;
  }
}

const playerBarH = () => {
  if (document) {
    let o = document.getElementById('playerBar');
    if (o) {
      let rect = o.getBoundingClientRect();
      return rect.bottom - rect.top;
    }
    return 0;
  }
}


export class Scroll extends Component<iPorps, iState> {

  private scrollRef: RefObject<HTMLDivElement>;
  private scrollContainer: RefObject<HTMLDivElement>;
  private iScroll: IScroll;

  constructor(props: iPorps) {
    super(props);
    this.state = {}
    this.scrollRef = React.createRef();
    this.scrollContainer = React.createRef();
  }

  render() {
    const renderScrollWapper = (
      <ScrollWapper ref={this.scrollRef}>
        <div ref={this.scrollContainer}>
          {this.props.children}
        </div>
      </ScrollWapper>
    )

    return (<div>
      {renderScrollWapper}
    </div>)
  }

  private initScroll = () => {
    if (!this.iScroll) {
      this.iScroll = new IScroll(this.scrollRef.current, {
        snap: false,
        bounce: true,
        mouseWheel: false,
        zoom: false,
        preventDefault: false,
        scrollbars: false,
        scrollX: false,
        scrollY: true,
        disableMouse: false,
        disablePointer: true,
        disableTouch: false,
        click: true,
        tap: true,
      })

      if (window) {
        this.updateScroll();
        window.addEventListener('resize', () => {
          this.updateScroll();
        });
      }
    }
  }

  private updateScroll() {
    if (this.iScroll) {
      setTimeout(() => { this.iScroll.refresh(); }, 0);
      if (this.scrollRef.current) {
        let cliH = window.innerHeight;
        let offHandler = this.props.calcOffH || navHeaderH;
        let h = cliH - offHandler() - playerBarH();
        this.scrollRef.current.style.height = h + 'px';
      }
    }
  }

  componentDidMount() { this.initScroll(); }
  componentDidUpdate() { this.updateScroll(); }
}