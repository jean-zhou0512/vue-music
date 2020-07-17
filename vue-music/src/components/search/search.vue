<template>
  <div class="search">
    <div class="search-box-wrapper">
      <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
    </div>
    <div ref="shortcutWrapper"  class="shortcut-wrapper" v-show="!query">
      <Scroll :refreshDelay="refreshDelay" class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.query)" class="item" v-for="item in hotKey">
                <span>{{item.query}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="deleteAll">
                <i class="icon-clear"></i>
              </span>
          </h1>
          <SearchList @searchHistory="searchHistoryQuery" :searches="searchHistory" @delete="delSaveSearchOne"></SearchList>
        </div>
        </div>
      </Scroll>
    </div>
    <router-view></router-view>
    <div ref="searchResult" class="search-result" v-show="query">
      <Suggest ref="suggest" @select="selectSearch" @hideInput="Inputblur" :query="query"></Suggest>
    </div>
    <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空"
     @confirm="clearSearchHistory"></confirm>
  </div>
</template>

<script>
  import SearchBox from '../../base/search-box/search-box'
  import {getSearchQuery} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import Suggest from 'components/suggest/suggest'
  import {mapActions,mapGetters} from 'vuex'
  import SearchList from '../../base/search-list/search-list'
  import {playlistMixin,searchMixin} from '../../common/js/mixin'
  import confirm from '../../base/confirm/confirm'
  import Scroll from '../../base/scroll/scroll'
  export default {
    mixins:[playlistMixin,searchMixin],
    name: 'search',
    components:{
      SearchBox,
      Suggest,
      SearchList,
      confirm,
      Scroll
    },
    computed:{
      shortcut(){
        return this.hotKey.concat(this.searchHisotroy)
      },
    },
    data(){
      return{
        hotKey:[],
      }
    },
    mounted () {
      this.getSearchQuery()
    },
    methods:{
      handlePlaylist(playlist){
        const bottom = playlist.length>0?'60px':'';
        this.$refs.shortcutWrapper.style.bottom=bottom
        this.$refs.shortcut.refresh();
        this.$refs.suggest.refresh();
        this.$refs.searchResult.style.bottom=bottom
      },
      getSearchQuery(){
        getSearchQuery().then((res)=>{
          if(res.code==ERR_OK){
            this.hotKey=res.hotkey.data.vec_hotkey.slice(0,10)
          }
        })
      },
      deleteAll(){
        this.$refs.confirm.show()//展示弹窗
      },
      searchHistoryQuery(query){
        this.query =query
        this.$refs.searchBox.searchHistory(query)
      },
      clearSearchHistory(){
        this.deleteAllHistory();
      },
      ...mapActions([
        'deleteAllHistory'
      ])
    },
    watch:{
      query(newQuery){
        if(!newQuery){
          setTimeout(()=>{
            this.$refs.shortcut.refresh()
          },20)
        }
      }
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
