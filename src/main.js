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
