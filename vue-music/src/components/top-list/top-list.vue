<template>
    <transition name="slide">
      <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
  import MusicList from '../music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getRankSongDetails} from '../../api/rank'
  import {ERR_OK} from '../../api/config'
  import {getSongVkey} from '../../api/singers'
  import {createSong} from '../../api/song'

  export default {
    name: 'top-list',
    components: {MusicList},
    computed:{
      title(){
        return this.topList.title;
      },
      bgImage(){
        return this.topList.headPicUrl;
      },
      ...mapGetters([
        'topList'
      ])
    },
    data(){
      return {
        songs:[],
        rank:true,
      }
    },
    mounted(){
      this.getRankSong()
    },
    methods:{
      getRankSong(){
        getRankSongDetails(this.topList.topId,this.topList.period).then((res)=>{
          if(ERR_OK === res.code){
            console.log()
              this.normalRankSongs(res.detail.data.songInfoList)
          }
        })
      },
      getSongVkey(songMid,item){
        if(!songMid){
          return
        }
        let that=this;
        getSongVkey(songMid).then((res)=>{
          if(res.code===ERR_OK){
            item.mediaUrl =res.req_0.data.midurlinfo[0].purl;
            that.songs.push(createSong(item))
          }
        })
      },
      normalRankSongs(list){
        list.forEach((item)=>{
          this.getSongVkey(item.mid,item)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active,.slide-leave-active
    transition :all 0.3s ease
  .slider-enter,.slide-leave-to
    transform :translate3d(100%,0,0)
</style>
