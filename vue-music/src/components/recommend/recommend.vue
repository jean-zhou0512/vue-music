<template>
  <div class="recommend" ref="recommend">
    <Scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <Slider>
              <div v-for="item in recommends">
                <a href="javascript:void(0)" >
                  <img class="needsclick" @load="loadImage" :src="item.picUrl">
                </a>
              </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门推荐歌单</h1>
          <ul>
            <li v-for="item in discList" class="item" @click="goRoute(item)">
              <div class="icon">
                <img  width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading/>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Slider from '../../base/slider/slider';
  import {getDiscList} from '../../api/recommend';
  import {ERR_OK,commonParams} from '../../api/config';
  import Scroll from '../../base/scroll/scroll';
  import Loading from '../../base/loading/loading';
  import {playlistMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    mixins:[playlistMixin],
    name: 'recommend',
    data(){
      return {
        recommends:[],
        discList:[],
        checkLoad:false,
      }
    },
    components:{
      Slider,
      Scroll,
      Loading
    },

    mounted () {
      this._getData();
      this._getDicList();
    },

    methods:{
      handlePlaylist(playlist){
        const bottom = playlist.length >0?'60px':'';
        this.$refs.recommend.style.bottom = bottom;
        this.$refs.scroll.refresh();
      },
      _getData(){
        //模拟从后台获取数据
        setTimeout(()=>{
          var recommends =[{linkUrl:'http://www.baidu.com',picUrl:'https://y.gtimg.cn/music/photo_new/T003R720x288M000002JI0Ij212Seh.jpg'},
            {linkUrl:'http://www.baidu.com',picUrl:'https://y.gtimg.cn/music/photo_new/T003R720x288M000003TN3qi3MK7pj.jpg'},
            {linkUrl:'http://www.baidu.com',picUrl:'https://y.gtimg.cn/music/photo_new/T003R720x288M000003EppMl2AdtKn.jpg'},
            {linkUrl:'http://www.baidu.com',picUrl:'https://y.gtimg.cn/music/photo_new/T003R720x288M000001PeJps37WoGW.jpg'},];
          this.recommends=recommends;
        },20)
      },
      _getDicList(){
        setTimeout(()=>{
          getDiscList().then((res)=>{
            if(res.code === ERR_OK){
              this.discList=res.data.list;
            }
          });
        },1000)
      },
      loadImage(){
        if(!this.checkLoad){
          this.$refs.scroll.refresh();
          this.checkLoad = true;
        }
      },
      goRoute(item){
        this.$router.push({
          path:`/recommend/${item.dissid}`
        })
        this.setDisc(item);
      },
      ...mapMutations({
        setDisc:'SET_DISC'
      })
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
