import {playMode} from '../common/js/config'
import {getSearch,loadPlay,loadFavorite} from '../common/js/cache'

const state={
  singer:{},
  fullScreen:false,//是否全屏
  playing:false,//是否播放
  playlist:[],//播放列表
  sequenceList:[],//排序列表
  mode:playMode.sequence,//播放模式
  currentIndex:-1,//当前播放歌曲
  disc:{},//推荐列表对象
  topList:{},//排行榜列表
  searchHisotroy:getSearch(),//搜索历史记录
  playHistory:loadPlay(),//最近播放,
  favoriteList:loadFavorite(),//收藏列表
}

export default state
