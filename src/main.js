import '@/assets/scss/common.scss'
import Vue from 'vue'
import App from '@/App.vue'
import axios from 'axios'
import router from '@/router'
import store from '@/store'
import {
  Msg
} from '@/msg'
import Btns from '@/components/Btns'
import Modal from '@/components/Modal'
import RoundBox from '@/components/RoundBox'
import Form from '@/components/Form'
import FileUpload from '@/components/FileUpload'
import firebase from "firebase"
//import "firebase/firestore"
import firebaseConfig from '../firebaseConfig'

firebase.initializeApp(firebaseConfig);
firebase.analytics();
let date = (p, c) => {
  let nd = !c ? new Date() : c
  let cd = nd.getDate()
  let y = nd.getFullYear()
  let m = nd.getMonth() + 1
  let d = cd < 10 ? `0cd` : cd
  let h = nd.getHours()
  let min = nd.getMinutes()
  let s = nd.getMilliseconds()
  if (p === 'full') {
    return `${y}${m}${d}${h}${min}${s}`
  } else {
    return `${y}${m}${d}`
  }
}

Vue.config.productionTip = false
Vue.prototype.$firebase = firebase;
Vue.prototype.$firestore = firebase.firestore();
Vue.prototype.$storage = firebase.storage();
Vue.prototype.$current_date = date();
Vue.prototype.$current_date_full = date('full');
Vue.prototype.$current_date_live = (c)=>{
  return date('full' , c)
}




Vue.prototype.$http = axios;
Vue.prototype.$Msg = Msg;
Vue.component('btn', Btns)
Vue.component('modal', Modal)
Vue.component('roundbox', RoundBox)
Vue.component('forminput', Form)
Vue.component('fileupload', FileUpload)
Vue.filter('filter_ellipsis', (s, n) => {
  return s;
})
Vue.filter('date_format', (s, format) => {
  //@params = ex > 20191104
  let regexp = /([0-9]{4})([0-9]{2})([0-9]{2})/i
  let t = typeof s !== 'string' ? String(s) : s;
  console.log(t);

  let f = format
  if (!f) {
    f = `$1-$2-$3`
  }
  return t.replace(regexp, f)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')