<template>
  <div>
      <v-row align="center" class="ms-5" v-if="conectado">
        <v-expansion-panels
          :accordion="accordion"
          :popout="popout"
          :inset="inset"
          :multiple="multiple"
          :focusable="focusable"
          :disabled="disabled"
          :readonly="readonly"
          :flat="flat"
          :hover="hover"
          :tile="tile"
        >
          <v-expansion-panel
            v-for="(item,i) in pedidos"
            :key="i"
            >
            <v-expansion-panel-header>
              <v-row>
                <v-col class="col-auto">{{item.codigo}}</v-col>
                <v-col>{{item.direccion}}</v-col>
                <v-col class="col-auto">{{item.cliente}}</v-col>
                <v-col class="col-auto">{{item.telefono}}</v-col>
                <v-col class="col-auto"><b>{{get_estado(item.estado)}}</b></v-col>
              </v-row>
              <template v-slot:actions>
                <v-icon class="ml-3" :color="get_color(item.estado)">{{get_icon(item.estado)}}</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="12">
                    <v-row>
                      <v-col cols="12" md="12" sm="12"><b>Comprobante:</b> {{item.codigo}}</v-col>
                      <v-col cols="12" md="12" sm="12"><b>Cliente:</b> {{item.cliente}}</v-col>
                      <v-col cols="12" md="12" sm="12"><b>Dirección:</b> {{item.direccion}}, {{item.comuna}}</v-col>
                      <v-col cols="12" md="12" sm="12"><b>Teléfono:</b> {{item.telefono}}</v-col>
                      <v-col cols="12" md="12" sm="12"><b>Subtotal</b> ${{item.subtotal}}</v-col>
                      <v-col cols="12" md="12" sm="12"><b>Paga con</b> {{item.pago}}</v-col>
                      <v-col cols="12" md="12" sm="12"><b>Propina</b> ${{item.propina}}</v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-autocomplete
                      :items=repartidores
                      label="Repartidor"
                      :value=item.repartidor
                      v-model="item.repartidor"
                      @change="repartidorCambiado(i)"
                    ></v-autocomplete>
                    <v-text-field 
                      label="Agregar comentario" 
                      hint="Este es un comentario de ejemplo" 
                      v-model="item.comentario"
                      @change="comentarioCambiado(i)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="12">
                    <v-btn class="mx-3" fab dark large color="green"><v-icon>print</v-icon></v-btn><br>
                    <v-btn v-if="item.estado == estado_alarma" class="mx-3 mt-5" fab dark large color="blue" @click="alerta" ><v-icon>add_alert</v-icon></v-btn>
                  </v-col>
                </v-row>
              </v-container>
              <v-data-table
                :headers="headers"
                :items=item.pedidos
                :items-per-page="5"
                class="elevation-1 mt-6"
              ></v-data-table>
              <Estado :indice="i" :estado=item.estado @estadoChange="item.estado=$event" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
  </div>
</template>
<script>
  import Estado from '@/components/Estado';
  import {mapState, mapActions, mapMutations} from 'vuex';
  import {Howl, Howler} from 'howler';
  import dindong from '../assets/audio/dindong.mp3';
  // @ is an alias to /src
  export default {
    components: {
      Estado,
    },
    data () {
      return {
        sound:{},
        estado_alarma:1,//El estado donde si emitir alarma
        largoPedidos:0,
        sonando:false,
        accordion: false,
        popout: true,
        inset: true,
        multiple: true,
        disabled: false,
        readonly: false,
        focusable: true,
        flat: false,
        hover: true,
        tile: false,
        headers: [
          {
            text: 'Detalle',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Total ($)', value: 'total' },
        ]
      }
    },
    watch: {
      conectado:{
        handler:function(a,b){
          if(this.conectado)
            this.obtenerPedidos();
        }
      },
      pedidos: {
        handler: function (val, oldVal) {
          var ObjectLength = function( object ) {
              var length = 0;
              for( var key in object ) {
                  if( object.hasOwnProperty(key) ) {
                      ++length;
                  }
              }
              return length;
          };
          var l = ObjectLength(val);
          if(this.largoPedidos != l){
            this.largoPedidos=l;
            this.alerta(true);
          }
        },
        deep: true
      }
    },
    mounted:function(){
      this.sound = new Howl ({
        src: [dindong],
        autoplay: false,
        loop: true,
        volume: 1,
        onend: function() {
          console.log('Finished!');
        }
      });
    },
    computed:{
      ...mapState(['pedidos','estados','conectado','repartidores'])
    },
    methods:{
      ...mapMutations(['llenarPedidos','estadoTmp','cambiarIndice','comentarioTmp','repartidorTmp']),
      ...mapActions(['obtenerPedidos','cambioComentario','cambioRepartidor']),
      get_estado (estado) {
        return this.estados.estado[estado].name
      },
      get_icon (estado) {
        return this.estados.icon[estado]
      },
      get_color (estado) {
        return this.estados.color[estado]
      },
      comentarioCambiado(ind){
        this.cambiarIndice(ind);
        this.cambioComentario();
      },
      repartidorCambiado(ind){
        this.cambiarIndice(ind);
        this.cambioRepartidor();
      },
      alerta(t){
        if(this.sonando || undefined != t && t == false){
          this.sound.stop();
          this.sonando=false;
        }else{
          for( var key in this.pedidos ) {
            if(this.pedidos[key].estado==this.estado_alarma){
              this.sound.play();
              this.sonando=true;
              break;
            }
          }
        }
      }
    }
  }
</script>
<style scoped>
.v-expansion-panels{z-index: 0}
</style>