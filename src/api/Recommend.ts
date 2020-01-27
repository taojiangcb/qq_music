
import { commonParams, options } from './../logicFunction/Constant';
import axios from 'axios';
import jsonp from '../logicFunction/JsonP';

export function getRecommend(): Promise<any> {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  });
  return jsonp(url, data, options);
}