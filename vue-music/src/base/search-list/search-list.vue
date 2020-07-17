<template>
    <div  class="search-list" v-show="searches.length">
      <transition-group name="list" tag="ul">
        <li :key="item" class="search-item" v-for="item in searches">
          <span class="text" @click="searchHistory(item)">{{item}}</span>
          <span class="icon" @click.stop.prevent="deleteQuery(item)">
            <i class="icon-delete" ></i>
          </span>
        </li>
      </transition-group>
    </div>
</template>

<script>
  import Scroll from '../../base/scroll/scroll'
  import {mapActions} from 'vuex'
  export default {
    name: '',
    components:{
      Scroll
    },
    props:{
      searches:{
        type:Array,
        default:[]
      }
    },
    methods:{
      deleteQuery(item){
          // this.deleteSaveSearch(item);
          this.$emit('delete',item)
      },
      searchHistory(item){
          this.$emit('searchHistory',item)
      },
      ...mapActions([
          'deleteSaveSearch'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"


  .search-list
    .search-item
      display: flex
      aling-item: center
      height: 40px
      .text
        flex: 1
        color: $color-text-l
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
</style>
