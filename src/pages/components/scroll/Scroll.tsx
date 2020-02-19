import React, { useState, useEffect, Component, RefObject } from 'react';
import { ScrollWapper } from './Scroll.styled';
import IScroll from 'iscroll/build/iscroll-probe';

interface iPorps {
  calcOffH?: Function,
  scrollToBottom?: Function;
  scrollToTop?: Function;
  outsiteHeight?: string;     //外部传入的高度
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
    let { outsiteHeight } = this.props;
    const renderScrollWapper = (
      <ScrollWapper outsiteHeight={outsiteHeight} ref={this.scrollRef}>
        <div ref={this.scrollContainer}>
          {this.props.children}
        </div>
      </ScrollWapper>
    )

    return (
      <div>
        {renderScrollWapper}
      </div>
    )
  }

  private initScroll = () => {
    let { scrollToTop, scrollToBottom } = this.props;
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


      this.updateScroll();
      window.addEventListener('resize', () => {
        this.updateScroll();
      });

      if (scrollToBottom || scrollToTop) {
        this.iScroll.on('scrollEnd', this.scrollEndHandler);
      }
    }
  }

  private scrollEndHandler = () => {
    let { scrollToTop, scrollToBottom } = this.props;
    if (this.iScroll.y - this.iScroll.maxScrollY === 0) {
      //滚到底部触发
      scrollToBottom && scrollToBottom();
    }
    else if (this.iScroll.y > 0) {
      //滚到顶部
      scrollToTop && scrollToTop();
    }
  }

  private updateScroll() {
    let { outsiteHeight } = this.props;
    if (this.iScroll) {
      setTimeout(() => { this.iScroll.refresh(); }, 0);
      if (this.scrollRef.current) {
        if (outsiteHeight) {
          this.scrollRef.current.style.height = outsiteHeight;
        }
        else {
          let cliH = window.innerHeight;
          let offHandler = this.props.calcOffH || navHeaderH;
          let h = cliH - offHandler() - playerBarH();
          this.scrollRef.current.style.height = h + 'px';
        }
      }
    }
  }

  componentWillUnmount = () => {
    if (this.iScroll) {
      let { scrollToTop, scrollToBottom } = this.props;
      if (scrollToBottom || scrollToTop) {
        this.iScroll.off('scrollEnd', this.scrollEndHandler);
      }
    }
    // if (window) {
    //   window.removeEventListener('resize', this.updateScroll);
    // }
  }

  componentDidMount() { this.initScroll(); }
  componentDidUpdate() { this.updateScroll(); }
}