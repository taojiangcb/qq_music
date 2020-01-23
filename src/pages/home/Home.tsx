import React from 'react'
import { Store } from 'redux'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { iProps } from '../../interfaces/iComponentProps';

const Home = (props: iProps & RouteConfigComponentProps) => {
  return (
    <div>
      Home
      {renderRoutes(props.route.routes)}
    </div>
  )
}

Home.InitPropsData = (store: Store) => {
}

export { Home }