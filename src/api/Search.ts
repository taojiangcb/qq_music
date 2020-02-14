import { commonParams, options } from "../logicFunction/Constant"
import jsonp from "../logicFunction/JsonP"
import { apiInstance } from './ApiInstance';

export function getHotKey(): Promise<any> {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  const url = '/api/search';
  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    format: "json"
  });
  return apiInstance.get(url, { params: data });
  //return jsonp(url, data, options);
}
