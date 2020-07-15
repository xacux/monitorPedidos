<template>
  <div>
    <form v-if="!conectado">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="pass"
        label="Contraseña"
        required
        type="password"
      ></v-text-field>
      <v-btn block dark @click="submit">Entrar</v-btn>
    </form>
    <v-btn v-if="conectado" block color="red" dark @click="cerrar">Salir</v-btn>
    
  </div>
</template>
<script>
  import { validationMixin } from 'vuelidate';
  import { required, maxLength, email } from 'vuelidate/lib/validators';
  import firebase from 'firebase';
  import {mapState} from 'vuex';

  export default {
    mixins: [validationMixin],

    validations: {
      email: { required, email }
    },

    data: () => ({
      pass:'',
      email: ''
    }),
    computed: {
      ...mapState(['conectado']),
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Email inválido')
        !this.$v.email.required && errors.push('Email requerido')
        return errors
      }
    },

    methods: {
      submit () {
        firebase.auth().signInWithEmailAndPassword(this.email,this.pass)
        .then(function(){
          
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
      },
      cerrar (){
          firebase.auth().signOut()
          .then(function(){
              console.log('saliendo');
          })
          .catch(function(error){
              console.log(error);
          })
      }
    },
  }
</script>