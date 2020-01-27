import React, { Component, Fragment } from "react";
import { iProps, iState } from "../../interfaces/iComponentProps";
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction, Dispatch } from "redux";
import { RecommentWapper } from "./RecommentComponent.styled";
import { getStore, initLoadData } from '../../redux/Store';
import { dispatch_featch_recomment } from "./reducer/Actions.Recomment";
import SliderComponent from "../components/slideImage/SliderImage";
import { Model } from "../../modules/Slider";
import { SliderImageItem } from "../components/slideImage/SliderImage.styled";

interface initProps {
  recomment?: any;
}

class Recomment extends Component<initProps, iState> {
  constructor(props) {
    super(props);
  }

  render() {
    let { recomment } = this.props;
    let { slider } = recomment;
    const renderSlider = (
      <SliderComponent loop={true} autoPlay={true} interval={4000}>
        {
          slider
            ? slider.map((item: Model.Slider) => (
              <SliderImageItem key={item.id}>
                <a href={item.linkUrl}>
                  <img src={item.picUrl} alt={item.id.toString()} />
                </a>
              </SliderImageItem>
            ))
            : <Fragment>
              <SliderImageItem>1</SliderImageItem>
              <SliderImageItem>2</SliderImageItem>
              <SliderImageItem>3</SliderImageItem>
            </Fragment>
        }
      </SliderComponent>
    )

    return (
      <RecommentWapper>
        {renderSlider}
      </RecommentWapper>
    )
  }

  componentDidMount = async () => {
    await initRecommendData();
  }
}

export const initRecommendData = async () => {
  let dataFn = initLoadData(dispatch_featch_recomment)
  return await dataFn();
}

const propsMap = (state: any) => {
  return {
    recomment: state.reducerRecomment.recomment
  };
}

const displayMap = (display: Dispatch) => {
  return {}
}

export default connect(propsMap, displayMap)(Recomment);

