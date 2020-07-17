import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state,singer){
    state.singer = singer;
  },
  [types.SET_PLAYING_STATE](state,flag){
state.playing = flag;
},
[types.SET_FULL_SCREEN](state,flag){
  state.fullScreen = flag;
},
[types.SET_PLAYLIST](state,list){
  // state.playlist = JSON.parse(JSON.stringify(list))
  state.playlist  =Object.assign([],list)
  // state.playlist=list
},
[types.SET_SEQUENCE_LIST](state,list){
  // state.sequenceList = JSON.parse(JSON.stringify(list))
  state.sequenceList  =Object.assign([],list)
  // state.sequenceList=list
},
[types.SET_PLAY_MODE](state,mode){
  state.mode=mode
},
[types.SET_CURRENT_INDEX](state,index){
  state.currentIndex=index
},
[types.SET_DISC](state,lsit){
  state.disc = lsit
},
[types.SET_TOP_LIST](state,list){
  state.topList = list
},
[types.SET_SEARCH_HISTORY](state,history){
  state.searchHisotroy = history;
},
[types.SET_PLAY_HISTORY](state,history){
  state.playHistory = history
},
[types.SET_FAVORITE_LIST](state,list){
  state.favoriteList = list
}
}

export default  mutations
