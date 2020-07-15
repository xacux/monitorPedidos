<template>
  <v-app id="app">
    <v-container class="overflow-hidden">
      <Menu />
      <router-view/>
    </v-container>
  </v-app>
</template>
<script>
  import Menu from '@/components/Menu';
  // @ is an alias to /src
  export default {
    components: {
      Menu,
    }
  }
</script>
<style scoped>
  .v-navigation-drawer--absolute {
      z-index: 2;
  }
</style>