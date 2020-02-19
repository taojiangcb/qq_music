import { Song, createSong } from "./song";

/*** 最近的播放列表 */
let history_list: Song[];

const OSKyes = {
  SEARCH_HISTORY: 'search_history',           //搜索历史
  MY_FAVORITE: 'my_favorite',                 //最爱
  HISTORY_PLAYS: 'history_plays'              //播放历史
}

/**
 * 
 * @param k 保存历史查询
 */
const setHistorySearch = (k: string) => {
  let listData: string[] = getHistorySearch();
  if (listData) {
    if (!listData.includes(k)) {
      listData.push(k);
      saveHistoryList(listData);
      return true;
    }
  }
  return false;
}

const delHistorySearch = (k: string) => {
  let listData: string[] = getHistorySearch();
  for (let i = 0; i < listData.length;) {
    if (listData[i] === k) { listData.splice(i, 1); }
    else { i++; }
  }
  saveHistoryList(listData);
}

const saveHistoryList = (list: string[]) => {
  let save_str = JSON.stringify(list);
  localStorage.setItem(OSKyes.SEARCH_HISTORY, save_str);
}

const getHistorySearch = () => {
  let os_str = localStorage.getItem(OSKyes.SEARCH_HISTORY) || '[]';
  let listData: string[] = JSON.parse(os_str);
  return listData;
}

/**保存历史播放记录 */
const saveHistorySong = (song: Song) => {
  if (!history_list) { getHistorySongList(); }
  let exist = false;
  let len = history_list.length;
  while (--len > -1) {
    if (history_list[len].mid === song.mid) {
      exist = true;
      break;
    }
  }
  if (!exist) {
    history_list.push(song);
    let json_str = JSON.stringify(history_list);
    localStorage.setItem(OSKyes.HISTORY_PLAYS, json_str);
  }
}

/**获取列表*/
const getHistorySongList = () => {
  if (history_list) return history_list;
  let strData = localStorage.getItem(OSKyes.HISTORY_PLAYS);
  try {
    if (strData) {
      let json_list: any[] = JSON.parse(strData);
      json_list.map(item => { return new Song(item); });
      history_list = json_list;
    }
    else { history_list = []; }
    return history_list;
  }
  catch (e) {
    console.warn(e.stack || e.message);
  }
}

export {
  setHistorySearch, getHistorySearch, saveHistoryList, saveHistorySong, getHistorySongList
}
