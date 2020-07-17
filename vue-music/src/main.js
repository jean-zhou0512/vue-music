import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store/index'
import './common/stylus/index.styl'
import './common/image/logo.png'
import router from './router/index'
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueLazyload,{
  loading:require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
