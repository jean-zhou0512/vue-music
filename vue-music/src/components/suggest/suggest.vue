<template>
    <Scroll class="suggest"
            :data="result"
            :pullFreshen="pullFreshen"
            :beforeScroll="beforeScroll"
            @scrollToEnd="searchMore"
            @beforeScroll="hideInput"
            ref="suggest">
      <ul class="suggest-list">
        <li @click="goRoute(item)" class="suggest-item" v-for="item in result">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getPlayName(item)"></p>
          </div>
        </li>
        <loading v-show="havePull"></loading>
      </ul>
      <div class="no-result-wrapper"  v-show="!result.length && !havePull">
        <NoResult title="抱歉,暂无搜索结果"></NoResult>
      </div>
    </Scroll>
</template>

<script>
  import {getQueryDetail} from '../../api/search'
  import {ERR_OK} from '../../api/config'
  import {createSearchSong} from '../../api/song'
  import {getSongVkey} from '../../api/singers'
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import {mapMutations,mapActions} from 'vuex'
  import NoResult from '../../base/no-result/no-result'
  // import {Toast} from 'mint-ui'

  const SINGER_TYPE='singer';
  const PAGE_SIZE = 20;
  export default {
    name: 'suggest',
    props:{
      query:{
        type:String,
        default:''
      },
      showSinger:{
        type: Boolean,
        default: true
      }
    },
    components:{
      NoResult,
      Loading,
      Scroll
    },
    data(){
      return{
        page:1,
        result:[],
        pullFreshen:true,
        havePull:true,
        beforeScroll:true,
      }
    },
    methods:{
      getQueryDetail(){
        this.page=1;
        this.havePull=true;
        this.$refs.suggest.scrollTo(0,0)
        getQueryDetail(this.query,this.page,this.showSinger,PAGE_SIZE).then((res)=>{
          if(res.code === ERR_OK){
            this.result=this.resultData(res.data)
            this.haveNexPage(res.data);
          }
        })
      },
      getPlayName(item){
            if(item.type === SINGER_TYPE){
              return item.singername
            }else{
              return `${item.name}-${item.singer}`
            }
      },
      getIconCls(item){
          if(item.type === SINGER_TYPE){
            return 'icon-mine'
          }else{
            return 'icon-music'
        }
      },
      resultData(data){
        let ret=[];
          if(data.zhida.singername && this.page===1){
            ret.push({...data.zhida,...{type:SINGER_TYPE}})
          }
          if(data.song){
            this.normalizeSongs(data.song.list);
          }
        return ret;
      },
      normalizeSongs(list){
        list.forEach((item)=>{
          if(item.albumid && item.songid){
            this.getSongVkey(item.songmid,item)
          }
        })
      },
      getSongVkey(songMid,songInfo){
        if(!songMid){
          return
        }
        let that =this
        getSongVkey(songMid).then(res => {
          if(res.code === ERR_OK){
            if(res.req_0.data.midurlinfo[0]){
              songInfo.mediaUrl =res.req_0.data.midurlinfo[0].purl;
            }else{
              songInfo.mediaUrl =''
            }
            that.result.push(createSearchSong(songInfo))
          }
        })
      },
      searchMore(){
        if(!this.havePull){
          return;
        }
        this.page++;
        getQueryDetail(this.query,this.page,this.showSinger,PAGE_SIZE).then((res)=>{
          if(res.code === ERR_OK){
            this.result=this.result.concat(this.resultData(res.data))
            this.haveNexPage(res.data);
          }
        })
      },
      haveNexPage(data){
        if(!data.song.list.length || data.curpage*data.curnum>=data.totalnum){
          this.havePull = false;
        }
      },

      goRoute(item){
        if(item.type === SINGER_TYPE && item.singermid){
          let singer = {
            id:item.singermid,
            name:item.singername,
            avatar:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${item.singermid}.jpg`
          }
          this.setSinger(singer)
          this.$router.push({
            path:`/search/${item.singermid}`
          })
        }else if(item.type === SINGER_TYPE && item.albummid){

        }else{
          this.insertSong(item)
        }
          this.$emit('select')
      },
      refresh(){
        this.$refs.suggest.refresh();
      },
      hideInput(){
        this.$emit('hideInput')
      },
      ...mapMutations({
        setSinger:'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch:{
      query(newQuery){
        this.getQueryDetail();
      }
    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
