import React from 'react';
import { renderRoutes } from 'react-router-config';

/**
 * @param {*} props 
 */
export const AppRouters = (props) => {
  return (
    <div>
      { renderRoutes(props.route.routes) }
    </div>
  )
}

