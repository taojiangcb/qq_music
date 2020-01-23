
import React from 'react';
import { iProps, iState } from '../../interfaces/iComponentProps';
import { RouteComponentProps, StaticRouterContext, StaticRouterProps } from 'react-router';
import { RouteConfig } from 'react-router-config';


export class NotFund extends React.Component<any, iState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    console.log(this.props);
    this.props.staticContext && (this.props.staticContext.NOT_FUND = true)
    return (
      <div>
        Not Fund page 404
      </div>
    )
  }
}