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


import firebase from "firebase"
//import "firebase/firestore"
import firebaseConfig from '../firebaseConfig'

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
// firebase.analytics();


Vue.config.productionTip = false
Vue.prototype.$firebase = firebase;





Vue.prototype.$http = axios;
Vue.prototype.$Msg = Msg;
Vue.component('btn', Btns)
Vue.component('modal', Modal)
Vue.component('roundbox', RoundBox)
Vue.component('forminput', Form)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')