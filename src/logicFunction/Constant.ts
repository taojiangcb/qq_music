export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback'
}

export enum PLAY_MODE {
  LOOP_LIST = 1,    //列表循环
  LOOP_ONCE,        //单曲循环
  RANDOM            //随机播放
}

export const ERR_OK = 0