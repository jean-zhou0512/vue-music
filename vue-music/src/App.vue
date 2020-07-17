<template>
  <div id="app">
    <MHeader/>
    <Tab/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
  import MHeader from 'components/m-header/m-header';
  import Tab from 'components/tab/tab';
  import Player from './components/player/player'
export default {
  name: 'App',
  components:{
    Player,
    Tab,
    MHeader,
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  #app
    color: $color-theme;
</style>
