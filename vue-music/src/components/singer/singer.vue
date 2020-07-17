<template>
    <div class="singer" ref="singer">
      <ListView @select="selectSinger"  :data="singerlist" ref="list"/>
      <router-view></router-view>
    </div>
</template>

<script>
  import {getSingersList} from '../../api/singers'
  import {ERR_OK} from '../../api/config';
  import HanziToPinyin from 'common/js/hanziToPinyin.js'
  import ListView from '../../base/listview/listview';
  import {mapMutations} from 'vuex'
  import {playlistMixin} from '../../common/js/mixin'

  const Hot_Name = '热门';
  const Hot_Singer_len=10;
  export default {
    mixins:[playlistMixin],
    name: 'singer',
    data(){
      return{
        singerlist:[],
      }
    },
    mounted () {
      this._getSingersList()
    },
    methods:{
      handlePlaylist(playlist){
        const bottom = playlist.length >0?'60px':'';
        this.$refs.singer.style.bottom = bottom;
        this.$refs.list.refresh();
      },
      _getSingersList(){
        getSingersList().then((res)=>{
          if(res.code === ERR_OK){
            this.singerlist=res.singerList.data.singerlist;
            this.singerlist.forEach((singer,index)=>{
              singer.Findex=HanziToPinyin.instance.initialTreatment(singer.singer_name)
              singer.singer_pic=singer.singer_pic.replace("webp","jpg")
            })
            this.singerlist=this._normalizeSinger(this.singerlist);
          }
        })
      },
      _normalizeSinger(list){
        let map={
          hot:{
            title : Hot_Name,
            items:[]
          }
        }

        list.forEach((item,index)=>{
          if(index<Hot_Singer_len){
            map.hot.items.push({
              id:item.singer_mid,
              name:item.singer_name,
              avatar:item.singer_pic
            })
          }
          let key = item.Findex;

          if(!map[key]){
            map[key]={
              title:item.Findex,
              items:[]
            }
          }
          map[key].items.push({
            id:item.singer_mid,
            name:item.singer_name,
            avatar:item.singer_pic
          })
        })
        //为了得到有序列表
        let hot= [];
        let ret =[];
        for(let key in map){
          let val = map[key];
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val);
          }else if(val.title === Hot_Name){
            hot.push(val);
          }
        }

        ret.sort((a,b)=>{
          return a.title.charCodeAt(0)- b.title.charCodeAt(0)
        })
        return hot.concat(ret);
      },
      selectSinger(singer){
       this.$router.push({
            path:`/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      ...mapMutations({
        setSinger:'SET_SINGER'
      })
    },
    components:{
      ListView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .singer
    position :fixed
    top:88px
    bottom :0
    width :100%

</style>
