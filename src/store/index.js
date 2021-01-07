import Vue from 'vue'
import Vuex from 'vuex'
import language from './language'
 
Vue.use(Vuex) 
 
export default new Vuex.Store({
    modules: {
        language
    }
})