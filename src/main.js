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


Vue.config.productionTip = false
Vue.prototype.$firebase = firebase;
Vue.prototype.$firestore = firebase.firestore();
Vue.prototype.$storage = firebase.storage();





Vue.prototype.$http = axios;
Vue.prototype.$Msg = Msg;
Vue.component('btn', Btns)
Vue.component('modal', Modal)
Vue.component('roundbox', RoundBox)
Vue.component('forminput', Form)
Vue.component('fileupload', FileUpload)
Vue.filter('filter_ellipsis', (s,n)=>{
  return s;
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')