import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from '../../common/js/config'
import {shuffle} from '../../common/js/util'

export const playlistMixin={
  computed:{
    ...mapGetters([
      'playlist'
    ])
  },
  mounted(){
    this.handlePlaylist(this.playlist)
  },
  activated(){
    this.handlePlaylist(this.playlist)
  },
  watch:{
    playlist(newValue){
      this.handlePlaylist(newValue)
    }
  },
  methods:{
    handlePlaylist(){
      throw new Error('component must implement handlePlaylist method');
    }
  },
}

export const playerMixin={
  computed: {
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.random ? 'icon-random' : 'icon-loop'
       },
    ...mapGetters([
      'mode',
      'sequenceList',
      'currentSong',
      'playlist',
      'favoriteList'
    ])
    },
    methods:{
      changeMode(){
        const mode = (this.mode+1)%3
        this.setPlayMode(mode)
        let list = null;
        if(mode === playMode.random){
          list=shuffle(this.sequenceList)
        }else{
          list = this.sequenceList
        }
        this.resetCurrentSongIndex(list);
        this.setPlayList(list)
      },
      resetCurrentSongIndex(list){
        let index = list.findIndex((item)=>{
          return this.currentSong.id === item.id
        })
        this.setCurrentIndex(index)
      },
      getFavoriteIcon(song){
          if(this.isFavorite(song)){
            return 'icon-favorite'
          }else{
            return 'icon-not-favorite'
          }
      },
      toggleFavorite(song){
        if(this.isFavorite(song)){
            this.deleteFavoriteList(song)
        }else{
          this.saveFavoriteList(song)
        }
      },
      isFavorite(song){
        const index = this.favoriteList.findIndex((item)=>{
          return item.id === song.id
        })
        return index > -1
      },
      ...mapMutations({
        setPlayMode:'SET_PLAY_MODE',
        setCurrentIndex:'SET_CURRENT_INDEX',
        setPlayingState:'SET_PLAYING_STATE',
        setPlayList:'SET_PLAYLIST',
      }),
        ...mapActions([
          'saveFavoriteList',
          'deleteFavoriteList'
        ])
    }
}

export const   searchMixin={
  computed:{
    ...mapGetters([
      'searchHistory'
    ])
  },
  data(){
    return{
      query:'',
      refreshDelay:100,
    }
  },
  methods:{
    onQueryChange(query){
      this.query=query
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query)
    },
    Inputblur(){
      this.$refs.searchBox.Inputblur();
    },
    selectSearch(){
      this.saveHistory(this.query)
    },
    delSaveSearchOne(item){
      this.deleteSaveSearch(item)
    },
    ...mapActions([
      'saveHistory',
      'deleteSaveSearch'
    ])
  }
}


