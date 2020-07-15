import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import estados from './estados.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    desde:'2020-07-01',
    hasta:'2020-07-31',
    conectado:false,
    pedidos:[],
    estados:estados,
    repartidores:[],
    estado_tmp:0,
    repartidor_tmp:0,
    comentario_tmp:'',
    indice:'',
  },
  mutations: {
    llenarPedidos(state, pedidosAccion){
      state.pedidos = pedidosAccion;
    },
    llenarRepartidores(state,repartidoresAccion){
      state.repartidores = repartidoresAccion;
    },
    cambiarIndice(state,indice){
      if(indice != state.indice)
        state.indice = indice;
    },
    /*
    estadoTmp(state,estado_tmp){
      if(state.estado_tmp != estado_tmp)
        state.estado_tmp = estado_tmp;
    },
    repartidorTmp(state,repartidor_tmp){
      if(state.repartidor_tmp != repartidor_tmp)
        state.repartidor_tmp = repartidor_tmp;
    },
    comentarioTmp(state,comentario_tmp){
      if(state.comentario_tmp != comentario_tmp)
        state.comentario_tmp = comentario_tmp;
    }
    */
  },
  actions: {
    obtenerPedidos : function({commit}) {
      var database = firebase.database();
      var userId = firebase.auth().currentUser.uid;
      //var ref = database.ref(userId);
      var ref = database.ref(userId);//.orderByChild("fecha").startAt(this.desde).endAt(this.hasta)
      ref.on("value", function(snapshot, prevChildKey) {
        const pedidos = snapshot.val();
        commit('llenarPedidos',pedidos);
      });
    },
    obtenerRepartidores : async function({commit}){
      /*
      const data = await fetch('https://');
      const trabajadores = await data.json();
      */
      const repartidores = ['Camila','Ernesto','Maria'];
      commit('llenarRepartidores',repartidores);
    },
    cambioComentario: function () {//Nuevo comentario, indice array
      var postDato = this.state.pedidos[this.state.indice];
      console.log(postDato);
      console.log(postDato.comentario);
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref(userId+'/'+this.state.indice+'/comentario').set(postDato.comentario);
    },
    cambioEstado: function () {//Nuevo estado, indice array
      var postDato = this.state.pedidos[this.state.indice];
      console.log(postDato);
      console.log(postDato.estado);
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref(userId+'/'+this.state.indice+'/estado').set(postDato.estado);
    },
    cambioRepartidor: function () {//Nuevo repartidor, indice array
      var postDato = this.state.pedidos[this.state.indice];
      console.log(postDato);
      console.log(postDato.repartidor);
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref(userId+'/'+this.state.indice+'/repartidor').set(postDato.repartidor);
    }
  },
  modules: {
    
  }
})