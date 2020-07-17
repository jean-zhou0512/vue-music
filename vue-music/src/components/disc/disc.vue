<template>
    <transition name="slide">
      <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
    </transition>
</template>

<script>
  import MusicList from '../music-list/music-list'
  import {getRecomSongs} from '../../api/recommend'
  import {mapGetters} from 'vuex'
  import {ERR_OK} from '../../api/config'
  import {getSongVkey} from '../../api/singers'
  import {createSong} from '../../api/song'

  export default {
    name: 'disc',
    components: {MusicList},
   data(){
      return{
        songs:[],
     }
   },
    mounted() {
      this.getRecomSongs()

    },
    computed:{
      bgImage(){
        return this.disc.imgurl
      },
      title(){
        return this.disc.dissname
      },
    ...mapGetters([
        'disc'
      ])

    },
    methods:{
      getRecomSongs(){
          if(!this.disc){
            return
          }
          const dissid =this.disc.dissid
          getRecomSongs(dissid).then((res)=>{
            if(res.code === ERR_OK){
              this.normalizeSongs(res.cdlist[0].songlist)
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
      normalizeSongs(list){
        list.forEach((item)=>{
            this.getSongVkey(item.mid,item);
        })

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
