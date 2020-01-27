import React, { Component, RefObject, } from "react";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { iState } from "../../../interfaces/iComponentProps";
import BScroll, { BsOption } from 'better-scroll';
import { SliderGroup } from "./SliderImage.styled";

interface iInitProps extends React.Props<any> {
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

class SliderImage extends Component<iInitProps, iState> {

  private sliderWapperRef: RefObject<HTMLDivElement>;
  private sliderGroupRef: RefObject<HTMLDivElement>;

  private slider: BScroll;

  private dots = [];
  private currentPageIndex: number = 1;
  private timer: any;

  constructor(props) {
    super(props)
    this.sliderWapperRef = React.createRef();
    this.sliderGroupRef = React.createRef();
  }

  private initSlider = () => {
    let { loop, autoPlay } = this.props;
    if (!this.slider) {
      this.slider = new BScroll(this.sliderWapperRef.current, {
        scrollX: true,
        snap: {
          loop: loop,       // 开启循环播放
          threshold: 0.3,   // 滚动距离超过宽度/高度的 30% 时切换图片
          speed: 400        // 切换动画时长 400ms
        }
      });

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        console.log(`endScrollEnd ` + pageIndex);
        this.currentPageIndex = pageIndex;
        if (autoPlay) {
          this.play();
        }
      })

      this.slider.on('beforeScrollStart', () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        console.log(`beforeScrollStart` + pageIndex);
        if (autoPlay) {
          clearTimeout(this.timer);
        }
      })
    }
  }

  private initDots = () => {
    let sliderGroup = this.sliderGroupRef.current;
    let childs = sliderGroup ? sliderGroup.children || [] : [];
    this.dots = new Array(childs.length);
  }

  private setSliderWidth = (isResize = false) => {
    let { loop } = this.props;
    let sliderWidth = this.sliderWapperRef.current.clientWidth;
    let childrenItems = this.sliderGroupRef.current.children || [];
    let width = childrenItems.length * sliderWidth;
    for (let i = 0; i < childrenItems.length; i++) {
      let child: HTMLElement = childrenItems[i];
      if (child) {
        child.style.width = sliderWidth + 'px';
      }
    }

    if (loop && !isResize) {
      width += 2 * sliderWidth;
    }
    this.sliderGroupRef.current.style.width = width + 1 + 'px';
  }

  private play = () => {
    let intervalT: number = this.props.interval;
    let loop = this.props.loop;
    let pageIndex = this.currentPageIndex;
    if (loop) {
      pageIndex += 1;
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.slider.goToPage(pageIndex, 0, 400)
    }, intervalT)
  }

  render() {
    return (
      <div ref={this.sliderWapperRef}>
        <SliderGroup ref={this.sliderGroupRef}>
          {this.props.children}
        </SliderGroup>
      </div>
    )
  }

  private resizeHandler = () => {
    let { autoPlay } = this.props;
    if (!this.slider) { return; }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.setSliderWidth(true);
    
    this.slider.refresh();
    if (autoPlay) {
      this.play();
    }
  }

  componentDidMount() {
    let { autoPlay } = this.props;
    this.initSlider();
    this.setSliderWidth();
    this.initDots();
    if (autoPlay) {
      this.play();
    }
    window.addEventListener('resize', this.resizeHandler);
  }

  componentDidUpdate() {
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
  }
}


const propsMap = (state: any) => {
  return state;
}

const displayMap = (display: Dispatch) => {
  return {}
}

export default connect(propsMap, displayMap)(SliderImage);
// export default SliderComponent;
