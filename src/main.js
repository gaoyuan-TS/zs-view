import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/interceptors.js'
import common from './assets/js/http.js'
import './plugins/element.js'

import i18n from './i18n/i18n'

import moment from 'moment'
import parameterStore from './assets/js/parameterStore'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')



import localStore from 'store'
Vue.prototype.$common = common
Vue.prototype.$moment = moment
Vue.prototype.$paramData = parameterStore
Vue.prototype.$localStore = localStore
Vue.config.productionTip = false

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    inline: false,
    button: true,
    navbar: false,
    title: false,
    toolbar: true,
    tooltip: false,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: false,
    transition: true,
    fullscreen: false,
    keyboard: false
  }
})
Vue.use(VideoPlayer)

Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
