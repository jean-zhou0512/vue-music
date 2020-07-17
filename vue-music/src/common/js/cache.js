import storage from 'good-storage'
const SEARCH_KEY="__search__"
const SEARCH_MAX_LENGTH=15
const SINGER_TYPE='singer';

const PLAY_KEY='__play__'
const PLAY_MAX_LENGTH=200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH=200

function inserSearch(arr,compare,maxLength,query){
  let findIndex =arr.findIndex(compare);
  //插入数据标准:保存15条历史记录，插入的记录总是放在第一位，当localStorage已经存在的时候则删去原有的，把新的插入
  if(findIndex ===0){
    return
  }
  if(findIndex>0){
    arr.splice(findIndex,1)
  }
  arr.unshift(query)
  if(maxLength && arr.length > maxLength){
    arr.pop();
  }
}

export function saveSearch(query){
  let searchs = storage.get(SEARCH_KEY,[]);
  inserSearch(searchs,(item)=>{
    return item === query
  },SEARCH_MAX_LENGTH,query)
  storage.set(SEARCH_KEY,searchs);
  return searchs;
}

export function getSearch(){
  return storage.get(SEARCH_KEY,[]);
}


export function deleteSearch(query){
  let searchs = storage.get(SEARCH_KEY,[]);
  let findIndex = searchs.findIndex((item)=>{
    return item === query
  })
  if(findIndex>-1){
    searchs.splice(findIndex,1)
  }
  storage.set(SEARCH_KEY,searchs);
  return searchs
}

export function deleteAllSearch(){
  return storage.set(SEARCH_KEY,[]);
}

export function saveHistorySong(song){
  let plays = storage.get(PLAY_KEY,[]);
  inserSearch(plays,(item)=>{
    return item.id === song.id
  },PLAY_MAX_LENGTH,song)
  storage.set(PLAY_KEY,plays)
  return plays;
}

export function loadPlay(){
  return storage.get(PLAY_KEY,[])
}

export function saveFavorite(song){
  let songs = storage.get(FAVORITE_KEY,[]);
  inserSearch(songs,(item)=>{
    return item.id=== song.id
  },FAVORITE_MAX_LENGTH,song)

  storage.set(FAVORITE_KEY,songs);
  return songs;
}

export function deleteFavorite(song){
  let songs = storage.get(FAVORITE_KEY,[]);
  let findIndex = songs.findIndex((item)=>{
    return song.id === item.id
  })
  if(findIndex>-1){
    songs.splice(findIndex,1)
  }
  storage.set(FAVORITE_KEY,songs);
  return songs;
}

export function loadFavorite(){
  return storage.get(FAVORITE_KEY,[])
}

