
import { commonParams, options } from './../logicFunction/Constant';
import axios, { AxiosResponse } from 'axios';
import jsonp from '../logicFunction/JsonP';
import { apiInstance } from './ApiInstance';

export function getRecommend(): Promise<any> {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  });
  return jsonp(url, data, options);
}

export function getDiscList(): Promise<AxiosResponse> {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  
  return apiInstance.get(url, { params: data });
}