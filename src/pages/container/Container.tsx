import React, { Component } from "react";
import { iProps, iState } from "../../interfaces/iComponentProps";
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { ContainnerWapper } from "./ContainerWapper";

class Container extends Component<iProps, iState> {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <ContainnerWapper>
        {this.props.children}
      </ContainnerWapper>
    )
  }
}

const propsMap = (state: any) => {
  return state;
}

const displayMap = (display: ThunkDispatch<any, any, AnyAction>) => {
  return {}
}

const ContainerComponent = connect(propsMap, displayMap)(Container);
export default ContainerComponent;
