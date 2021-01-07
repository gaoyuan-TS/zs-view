import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
import locale from 'element-ui/lib/locale'

import { getStorage, getBrowserLang } from '@/util'
Vue.use(VueI18n)
const lang = getStorage('lang') || getBrowserLang()
console.log(lang)
const i18n = new VueI18n({
    locale: lang || 'cn',
    messages   
})

locale.i18n((key, value) => i18n.t(key, value))


export default i18n