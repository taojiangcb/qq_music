import React, { Component, Fragment } from "react";
import { iProps, iState } from "../../interfaces/iComponentProps";
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from "redux";
import { RecommentWapper, RecommentTitle, RecommentItem } from "./RecommentPage.styled";
import { getStore, initLoadData } from '../../redux/Store';
import { dispatch_featch_recomment, dispatch_featch_disclist } from './reducer/Actions.Recomment';
import SliderComponent from "../components/slideImage/SliderImage";
import { SliderImageItem } from "../components/slideImage/SliderImage.styled";
import { Model } from "../../modules/DataStruct";
import { ScrollWapper } from "../components/scroll/Scroll.styled";
import { Scroll } from "../components/scroll/Scroll";

interface initProps {
  recomment?: any;
  disc_list?: Model.Disc[];
}

class Recomment extends Component<initProps, iState> {
  constructor(props) {
    super(props);
  }

  private itemClick = (data: Model.Disc) => {
    console.log(data);
  }

  render() {
    let { recomment, disc_list } = this.props;
    let { slider } = recomment;

    const slider_crt = () => {
      let items = slider && slider.map((item: Model.Slider, index: number) => {
        return (
          <SliderImageItem key={item.id + index} className={'swiper-slide'}>
            <img src={item.picUrl} alt={item.id.toString()} className={'swiper-lazy'} />
            {/* <a href={item.linkUrl}>
            </a> */}
          </SliderImageItem>
        )
      })
      return items;
    }

    const renderSlider = (
      <SliderComponent loop={true} autoPlay={true} interval={4000}>
        {
          slider
            ? slider_crt()
            : <Fragment>
              <SliderImageItem>1</SliderImageItem>
              <SliderImageItem>2</SliderImageItem>
              <SliderImageItem>3</SliderImageItem>
            </Fragment>
        }
      </SliderComponent>
    )

    const renderRecommentItems = (
      <Fragment>
        {
          disc_list && disc_list.map((item: Model.Disc) => {
            return (
              <RecommentItem key={item.dissid} onClick={e => (this.itemClick(item))}>
                <img src={item.imgurl}></img>
                <div>
                  <h2>{item.creator.name}</h2>
                  <p>{item.dissname}</p>
                </div>
              </RecommentItem>
            )
          })
        }
      </Fragment>
    )

    return (
      <RecommentWapper>
        <Scroll>
          {renderSlider}
          <RecommentTitle> 热门歌单推荐 </RecommentTitle>
          {renderRecommentItems}
        </Scroll>

      </RecommentWapper >
    )
  }

  componentDidMount = async () => {
    await initRecommendData();
  }
}

export const initRecommendData = async () => {
  let dataFn = initLoadData(dispatch_featch_recomment);
  let discFn = initLoadData(dispatch_featch_disclist);
  return await Promise.all([dataFn(), discFn()]);
}

const propsMap = (state: any) => {
  return {
    recomment: state.reducerRecomment.recomment,
    disc_list: state.reducerRecomment.disc_list,
  };
}

const displayMap = (display: Dispatch) => {
  return {}
}

export default connect(propsMap, displayMap)(Recomment);

