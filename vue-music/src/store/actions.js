import * as types from './mutation-types'
import {shuffle} from '../common/js/util'
import {playMode} from '../common/js/config'
import {saveSearch,deleteSearch,deleteAllSearch,saveHistorySong,saveFavorite,deleteFavorite} from '../common/js/cache'

function findIndex(songs,song){
   return songs.findIndex((item)=>{
     return song.id === item.id
  })
}

export const selectPlay =function({commit,state},{songs,index}){
  commit(types.SET_SEQUENCE_LIST,songs)
  if(state.mode === playMode.random){
    let randomList = shuffle(songs);
    commit(types.SET_PLAYLIST,randomList)
    index = findIndex(randomList,songs[index])
  }else{
    commit(types.SET_PLAYLIST,songs)
  }
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_CURRENT_INDEX,index)
  commit(types.SET_PLAYING_STATE,true)
}

export const randomPlay = function({commit,state},{songs}){
  commit(types.SET_SEQUENCE_LIST,songs)
  let randomList = shuffle(songs)
  commit(types.SET_PLAYLIST,randomList)
  commit(types.SET_PLAY_MODE,playMode.random)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)
  commit(types.SET_CURRENT_INDEX,0)
}

export const insertSong =function({commit,state},song){
  let playlist =state.playlist.slice();
  let sequenceList =state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  //记录当前歌曲
  let currentSong = playlist[currentIndex]
  //查找是否已经存在要插入的歌曲
  let isExitIndex = findIndex(playlist,song);
  //插入歌曲
  currentIndex++
  playlist.splice(currentIndex,0,song)
  if(isExitIndex>-1){
    if(currentIndex > isExitIndex){
      playlist.splice(isExitIndex,1);
      currentIndex--;
    }else{
      playlist.splice(isExitIndex+1,1)
    }
  }

  let currentSIndex = findIndex(sequenceList,currentSong)+1;
  let isExitSIndex = findIndex(sequenceList,song)
  sequenceList.splice(currentSIndex,0,song)
  if(isExitSIndex > -1){
    if(currentSIndex > isExitSIndex){
      sequenceList.splice(isExitSIndex,1)
    }else{
      sequenceList.splice(isExitSIndex+1,1)
    }
  }

  commit(types.SET_PLAYLIST,playlist)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_FULL_SCREEN,true)
  commit(types.SET_PLAYING_STATE,true)


}


export  const  saveHistory = function({commit,state},query){
  commit(types.SET_SEARCH_HISTORY,saveSearch(query));
}

export const deleteSaveSearch = function ({commit,state},query){
  commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const deleteAllHistory =function ({commit}){
  commit(types.SET_SEARCH_HISTORY,deleteAllSearch())
}

export const deleteSongOne = function({commit,state},song){
  let playlist =state.playlist.slice();
  let sequenceList =state.sequenceList.slice();
  let currentIndex = state.currentIndex;

  let pIndex =findIndex(playlist,song);
  let sIndex = findIndex(sequenceList,song);

  playlist.splice(pIndex,1);
  sequenceList.splice(sIndex,1);

  if(currentIndex > pIndex || currentIndex === playlist.length){
    currentIndex--;
  }

  commit(types.SET_PLAYLIST,playlist)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)

  const playingState =playlist.length>0
    commit(types.SET_PLAYING_STATE,playingState);

}

export const deleteAllSongs = function({commit,state}){
  commit(types.SET_PLAYLIST,[])
  commit(types.SET_SEQUENCE_LIST,[])
  commit(types.SET_CURRENT_INDEX,-1)
  commit(types.SET_PLAYING_STATE,false);
}

export const savePlayHistory = function({commit},song){
  commit(types.SET_PLAY_HISTORY,saveHistorySong(song))
}


export const saveFavoriteList = function({commit},song){
  commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}

export const deleteFavoriteList = function({commit},song){
  commit(types.SET_FAVORITE_LIST,deleteFavorite(song))
}
