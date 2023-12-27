<template>
  <v-app id="app">
    <nav-bar class="nav-bar"/>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
a{
  text-decoration: none;
}
.nav-bar{
  z-index: 99;
}
</style>
