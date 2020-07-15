<template>
    <v-navigation-drawer
        v-model="drawer"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :permanent="permanent"
        absolute
        dark
    >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
                <v-icon>{{ icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Consola control</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <Auth/>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to=item.url
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
  import Auth from '@/components/Auth';
  export default {
    components: {
      Auth,
    },
    data () {
      return {
        icon:'dashboard',
        drawer: false,
        items: [
          { title: 'Control', icon: 'dashboard', url:'/' },
          { title: 'Soporte', icon: 'call', url:'/soporte' },
          //{ title: 'Calendario', icon: 'call', url:'/calendario' },
        ],
        right: false,
        permanent: true,
        miniVariant: false,
        expandOnHover: true,
        background: false,
      }
    }
  }
</script>