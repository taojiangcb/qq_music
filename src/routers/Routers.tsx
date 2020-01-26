import React from 'react';

import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { RouteConfig } from 'react-router-config';
import { AppRouters } from './RouteApp';
import { NotFund } from '../pages/notFund/NotFund';

export const Routers: RouteConfig[] = [
  {
    path: "/",
    key: "home",
    component: AppRouters,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        key: "home"
      },
      {
        path: "/login",
        exact: true,
        component: Login,
        key: "login"
      },
      {
        component: NotFund
      }
    ]
  }
]

