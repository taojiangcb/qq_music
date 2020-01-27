import React from 'react'
import { Store } from 'redux'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { iProps } from '../../interfaces/iComponentProps';
import { Header } from '../components/head/Header';
import ContainerComponent from '../container/Container';

const Home = (props: iProps & RouteConfigComponentProps) => {
  return (
    <div>
      <Header />
     <ContainerComponent>
        {renderRoutes(props.route.routes)}
     </ContainerComponent>
    </div>
  )
}

Home.InitPropsData = (store: Store) => {
}

export { Home }