import React, { Component, RefObject, } from "react";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { iState } from "../../../interfaces/iComponentProps";
import { SliderGroup, SliderWapper, Pagination } from "./SliderImage.styled";
import Swiper from "swiper";

interface iInitProps extends React.Props<any> {
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

class SliderImage extends Component<iInitProps, iState> {

  private sliderWapperRef: RefObject<HTMLDivElement>;
  private sliderGroupRef: RefObject<HTMLDivElement>;
  private pagination: RefObject<HTMLDivElement>;

  private slider: Swiper;

  private currentPageIndex: number = 0;
  private timer: any;

  constructor(props) {
    super(props)
    this.sliderWapperRef = React.createRef();
    this.sliderGroupRef = React.createRef();
    this.pagination = React.createRef();
  }

  private initSlider = () => {
    let { loop, autoPlay } = this.props;
    if (!this.slider) {

      this.slider = new Swiper(this.sliderWapperRef.current, {
        lazy: true,
        direction: "horizontal",
        speed: 400,
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
      })

      // this.slider = new IScroll(this.sliderWapperRef.current, {
      //   snap:true,
      //   bounce: true,
      //   mouseWheel: false,
      //   zoom: false,
      //   preventDefault: true,
      //   scrollbars: false,
      //   scrollX:true,
      //   disableMouse: false,
      //   disablePointer: true,
      //   disableTouch:false
      // });

      // this.slider = new IScroll(this.sliderWapperRef.current, {
      //   scrollX: true,
      //   startX:0,
      //   snap: {
      //     loop: loop,       // 开启循环播放
      //     threshold: 0.3,   // 滚动距离超过宽度/高度的 30% 时切换图片
      //     speed: 400        // 切换动画时长 400ms
      //   }
      // });

      this.slider.on('transitionEnd', () => {
        let pageIndex = this.slider.realIndex;
        this.currentPageIndex = pageIndex;
        if (autoPlay) {
          this.play();
        }
      })

      this.slider.on('transitionStart', () => {
        let pageIndex = this.slider.realIndex
        if (autoPlay) {
          clearTimeout(this.timer);
        }
      })
    }
  }

  private setSliderWidth = (isResize = false) => {
    let { loop } = this.props;
    let sliderWidth = this.sliderWapperRef.current.clientWidth;
    let childrenItems = this.sliderGroupRef.current.children || [];
    for (let i = 0; i < childrenItems.length; i++) {
      let child: HTMLElement = childrenItems[i];
      if (child) {
        child.style.width = sliderWidth + 'px';
      }
    }

    let width = Math.max(0, childrenItems.length) * sliderWidth;
    this.sliderGroupRef.current.style.width = width + 'px';
  }

  private play = () => {
    let intervalT: number = this.props.interval;
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.slider.slideNext();
    }, intervalT)
  }

  render() {
    return (
      <div>
        <SliderWapper ref={this.sliderWapperRef} className={'swiper-container'}>
          <SliderGroup ref={this.sliderGroupRef} className={'swiper-wrapper'}>
            {this.props.children}
          </SliderGroup>
          <Pagination ref={this.pagination} className={`swiper-pagination`}></Pagination>
        </SliderWapper>
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
    this.slider.update();
    if (autoPlay) { this.play(); }
  }

  componentDidMount() {
    setTimeout(() => {
      let { autoPlay } = this.props;
      this.initSlider();
      this.setSliderWidth();
      if (autoPlay) {
        this.play();
      }
      window.addEventListener('resize', this.resizeHandler);
    }, 1000)
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
      this.slider.destroy(true, true);
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
