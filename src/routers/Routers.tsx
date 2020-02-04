import React from 'react';

import  Home  from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { RouteConfig } from 'react-router-config';
import { AppRouters } from './RouteApp';
import { NotFund } from '../pages/notFund/NotFund';
import RecommendComponent, { initRecommendData } from '../pages/recommon/RecommentPage';
import RankPage, { initRankData } from '../pages/rank/RankPage';

export const RouterKeys = {
  home: "home",
  recommend: 'recommend',
  rank: 'rank',
  singer: 'singer',
  login: 'login'
}

export const RouterComponets: { [key: string]: any } = {
  home: Home,
  recommend: {},
  rank: {},
  singer: {},
  login: {}
}


export const Routers: RouteConfig[] = [
  {
    path: "/",
    key: "home",
    component: Home,
    routes: [
      {
        path: '/',
        component: RecommendComponent,
        exact: true,
        key: RouterKeys.recommend,
        loadData: initRecommendData
      },
      {
        path: '/' + RouterKeys.recommend,
        component: RecommendComponent,
        exact: true,
        key: RouterKeys.recommend,
      },
      {
        path: '/' + RouterKeys.rank,
        component: RankPage,
        exact: true,
        loadData: initRankData,
        key: RouterKeys.rank
      },
      // {
      //   path: '/recommend',
      //   component: Home,
      //   exact: true,
      //   key: "recommend"
      // },
      // {
      //   path: '/rank',
      //   component: Home,
      //   exact: true,
      //   key: "rank"
      // },
      // {
      //   path: '/singer',
      //   component: Home,
      //   exact: true,
      //   key: "singer"
      // },
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

