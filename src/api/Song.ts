import axios from 'axios'
import { commonParams } from '../logicFunction/Constant'

export function getLyric(mid): Promise<any> {
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })
  return axios.get(url, { params: data })
}