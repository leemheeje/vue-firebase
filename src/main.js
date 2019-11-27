import '@/assets/scss/common.scss'
import Vue from 'vue'
import App from '@/App.vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
  Msg
} from '@/msg'
import Btns from '@/components/Btns'
import Modal from '@/components/Modal'
import RoundBox from '@/components/RoundBox'
import Form from '@/components/Form'
import FileUpload from '@/components/FileUpload'
import {
  isMobile
} from 'mobile-device-detect';
import firebase from "firebase"
import firebaseConfig from '../firebaseConfig'
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let date = (p, c) => {
  let nd = !c ? new Date() : c
  let cd = nd.getDate()
  let y = nd.getFullYear()
  let m = nd.getMonth() + 1
  let d = cd < 10 ? `0${cd}` : cd
  let h = nd.getHours() < 10 ? `0${nd.getHours()}` : nd.getHours()
  let min = nd.getMinutes() < 10 ? `0${nd.getMinutes()}` : nd.getMinutes()
  let s = nd.getSeconds() == 0 ? '00' : nd.getSeconds() < 10 ? `0${nd.getSeconds()}` : nd.getSeconds()
  if (p === 'full') {
    return `${y}${m}${d}${h}${min}${s}`
  } else {
    return `${y}${m}${d}`
  }
}
let ui_conf = {
  alert,
  confirm
}
ui_conf = require('@/assets/js/leemheeje')
Vue.config.productionTip = false
Vue.prototype.$firebase = firebase;
Vue.prototype.$isMobile = isMobile;
Vue.prototype.$Ui = ui_conf;
Vue.prototype.$provider = new firebase.auth.GoogleAuthProvider();;
Vue.prototype.$firestore = firebase.firestore();
Vue.prototype.$storage = firebase.storage();
Vue.prototype.$current_date = date();
Vue.prototype.$current_date_full = date('full');
Vue.prototype.$current_date_live = (c) => {
  return date('full', c)
}
Vue.prototype.$http = axios;
Vue.prototype.$Msg = Msg;
Vue.prototype.$extend = (p, n) => {
  let org_o = p
  let ext_o = n
  let new_o = {}
  if (org_o && typeof org_o === 'object' && !Array.isArray(org_o) && ext_o && typeof ext_o === 'object' && !Array.isArray(ext_o)) {
    for (let k in ext_o) {
      new_o[k] = ext_o[k]
    }
    for (let c in org_o) {
      if (typeof new_o[c] == 'undefined') {
        new_o[c] = org_o[c]
      }
    }

  }
  return new_o
};



Vue.component('btn', Btns)
Vue.component('modal', Modal)
Vue.component('roundbox', RoundBox)
Vue.component('forminput', Form)
Vue.component('fileupload', FileUpload)
Vue.filter('filter_ellipsis', (s, n) => {
  return s;
})
// Vue.prototype.$firebase.auth().setPersistence(Vue.prototype.$firebase.auth.Auth.Persistence.LOCAL).then(()=>{
//   console.log(Vue.prototype.$firebase.auth().currentUser);

//   //store.dispatch('fnSignInCallBack')
// })

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
Vue.filter('date_after_day', s => {
  let n = String(s)
  let gt = String(date('full'))
  let st = ''
  if (isNaN(n) || isNaN(gt)) {
    //console.log(`-filters 'date_after_day' NaN error`);
    return
  }
  let mi = String(gt - n)
  let t = '';
  let smi = mi.split('')
  if (mi.length == 1 || mi.length == 2) {
    t = `1`
  } else if (mi.length % 2 == 0) {
    t = `${smi[0] + smi[1]}`
  } else {
    t = `${smi[0]}`
  }
  switch (mi.length) {
    case 1:
    case 2:
      st = `분전`
      break
    case 3:
    case 4:
      // if (Math.floor(t / 60)) {
      //   st = `${Math.round(t / 60)}시간전`
      //   t = ''
      // } else {
      //   st = `분전`
      // }
      st = `분전`
      break
    case 5:
    case 6:
      // if (Math.floor(t / 24)) {
      //   st = `${Math.round(t / 24)}일전`
      //   t = ''
      // } else {
      //   st = `시간전`
      // }
      st = `시간전`
      break
    case 7:
    case 8:
      st = `일전`
      break
    case 9:
    case 10:
      st = `달전`
      break
    case 11:
    case 12:
      st = `년전`
      break
  }
  return `${t}${st}`;
})

Vue.prototype.$firebase.auth().onAuthStateChanged(async res => {
  if (res) {
    await store.dispatch('fnSignInCallBack')
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})