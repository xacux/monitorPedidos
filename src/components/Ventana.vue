<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          dark x-large
          v-bind="attrs"
          v-on="on"
        >
          Control
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Cambio de estado</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items=repartidores
                  label="Repartidor"
                  @change="repartidorCambiado($event)"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                  label="Agregar comentario" 
                  hint="Este es un comentario de ejemplo" 
                  v-model="comentario"
                  @change="comentarioCambiado($event)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  import {mapState,mapActions,mapMutations} from 'vuex';
  export default {
    data: () => ({
      dialog: false,
    }),
    computed:{
      ...mapState(['repartidores'])
    },
    props:['indice','comentario'],
    methods:{
      ...mapMutations(['llenarRepartidores']),
      ...mapActions(['obtenerRepartidores']),
      repartidorCambiado(ev){
        this.$emit('repartidorChange',ev);
      },
      comentarioCambiado(ev){
        this.$emit('comentarioChange',ev);
      },
    },
  }
</script>