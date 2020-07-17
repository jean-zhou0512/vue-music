<template>
  <transition name="slide">
    <MusicList :title="title" :bgImage="bgImage" :songs="songs"/>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail,getSongVkey} from '../../api/singers'
  import {ERR_OK} from '../../api/config'
  import {createSong} from '../../api/song'
  import MusicList from '../music-list/music-list'
  export default {
    name: 'singer-detail',
    components:{
      MusicList
    },
    computed:{
      title(){
        return this.singer.name;
      },
      bgImage(){
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ]),
    },
    data(){
      return{
        songs :[],
        songInfoList:[],
        mediaUrl:[],
      }
    },
    created(){
      this.getSingerDetail();
    },
    methods:{
      getSingerDetail(){
        if(!this.singer.id){
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then(res => {
          if(res.code === ERR_OK){
            // this.songInfoList = this.normalizeSongs(res.singerSongList.data.songList);

              this.normalizeSongs(res.singerSongList.data.songList)
          }
        })
      },


      getSongVkey(songMid,songInfo){
        if(!songMid){
          return
        }
        var that =this
        getSongVkey(songMid).then(res => {
          if(res.code === ERR_OK){
            songInfo.mediaUrl =res.req_0.data.midurlinfo[0].purl;
            that.songs.push(createSong(songInfo))
          }
        })
      },


      normalizeSongs(list){
        list.forEach((item=>{
          let {songInfo} =item;
            this.getSongVkey(songInfo.mid,songInfo)
        }))
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

</style>
