import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyDGqvwKCxI1Zw_70ML5BZUSCaj_T7IVwa8",
  authDomain: "pruebavue-e2ad7.firebaseapp.com",
  databaseURL: "https://pruebavue-e2ad7.firebaseio.com",
  projectId: "pruebavue-e2ad7",
  storageBucket: "pruebavue-e2ad7.appspot.com",
  messagingSenderId: "894296338505",
  appId: "1:894296338505:web:27c11e58e2b8ee18310f98",
  measurementId: "G-X5GBCJ2602"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    store.state.conectado=true;
  }else{
    store.state.conectado=false;
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
