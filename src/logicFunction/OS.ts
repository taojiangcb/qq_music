


interface iOSItem { [key: string]: string; }

const OSKyes = { SEARCH_HISTORY: 'search_history' }

const setHistorySearch = (k: string) => {
  let listData: string[] = getHistorySearch();
  if (listData) {
    if (!listData.includes(k)) {
      console.log('includes' + k);
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
    if (listData[i] === k) {
      listData.splice(i, 1);
    }
    else {
      i++;
    }
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


export {
  setHistorySearch, getHistorySearch, saveHistoryList
}
