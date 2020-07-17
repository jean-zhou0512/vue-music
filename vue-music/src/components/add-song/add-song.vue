<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <SearchBox ref="searchBox" placeholder="搜索歌曲" @query="onQueryChange"></SearchBox>
      </div>
      <div class="shortcut" v-show="!query">
        <Switches :currentIndex="currentIndex" :switches="switches" @selectSwitch="selSwitch"></Switches>
        <div class="list-wrapper">

          <Scroll ref="songList" class="list-scroll" v-if="currentIndex === 0" :data="playHistory">
            <div class="list-inner">
              <SongList :songs="playHistory"
              @select="selectSong">
              </SongList>
            </div>
          </Scroll>

          <Scroll :refreshDelay="refreshDelay" ref="searchList" class="list-scroll" v-if="currentIndex === 1">
            <div class="list-inner" :data="searchHistory">
              <SearchList :searches="searchHistory" @searchHistory="addQuery" @delete="deleteSaveSearch"></SearchList>
            </div>
          </Scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <Suggest :query="query" :showSinger="showSinger"
                 @select="selectSuggest"
                 @hideInput="Inputblur"></Suggest>
      </div>
      <TopTip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </TopTip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import SearchBox from '../../base/search-box/search-box'
  import {searchMixin} from '../../common/js/mixin'
  import Suggest from '../../components/suggest/suggest'
  import Switches from '../../base/switches/switches'
  import Scroll from '../../base/scroll/scroll'
  import SongList from '../../base/song-list/song-list'
  import {mapGetters,mapActions} from 'vuex'
  import SearchList from '../../base/search-list/search-list'
  import TopTip from '../../base/top-tip/top-tip'
  import Song from '../../api/song'

  export default {
    mixins:[searchMixin],
      components:{
        SearchBox,
        Suggest,
        Switches,
        Scroll,
        SongList,
        SearchList,
        TopTip
      },
    computed:{
      ...mapGetters([
        'playHistory',
        'searchHistory'
      ])
    },
      data(){
        return{
          showFlag:false,
          showSinger:false,
          switches:[
            {name:'最近播放'},
            {name:'搜索历史'}
          ],
          currentIndex:0,
        }
      },
      methods:{
        show(){
          this.showFlag=true;
          setTimeout(()=>{
            if(this.currentIndex===0){
              this.$refs.songList.refresh()
            }else{
              this.$refs.searchList.refresh()
            }
          },20)
        },
        selectSong(song,index){
          if(index!==0){
            //这个song是从缓存取出来的，是一个对象不是song实例
            this.insertSong(new Song(song))
            this.showTip();
          }
        },
        showTip(){
          this.$refs.topTip.show();
        },
        selectSuggest(){
          this.selectSearch();
          this.showTip();
        },
        hide(){
          this.showFlag=false;
        },
        selSwitch(index){
          this.currentIndex=index;
        },
        ...mapActions([
          'insertSong'
        ])

      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>
