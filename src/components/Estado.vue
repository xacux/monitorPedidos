<template>
  <v-row>
    <v-col class="pa-12">
      <v-slider
        :tick-labels="estados.estado"
        min="0"
        :max="4"
        tick-size="5"
        :value=estado
        @change="estadoCambiado($event)"
        >
        <template v-slot:thumb-label="props">
          <v-icon dark>
            {{ season(props.value) }}
          </v-icon>
        </template>
      </v-slider>
    </v-col>
  </v-row>
</template>
<script>
  import {mapState,mapMutations, mapActions} from 'vuex';
  export default {
    data: () => ({
      icons: [
        'room_service',
        'fastfood',
        'two_wheeler',
        'home'
      ],
    }),
    props:['estado','indice'],
    computed:{
      ...mapState(['estados'])
    },
    methods: {
      ...mapMutations(['estadoTmp','cambiarIndice']),
      ...mapActions(['cambioEstado']),
      estadoCambiado(ev){
        this.$emit('estadoChange',ev);
        this.cambiarIndice(this.indice);
        this.cambioEstado();
      },
      season (val) {
        return this.estados.icon[val]
      }
    }
  }
</script>