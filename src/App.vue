<template>
  <v-app id="app">
    <nav-bar class="nav-bar" />
    <router-view class="main-content" />
    <scroll-to-top />
    <footer-comp></footer-comp>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'Lexend-Medium';
  src: url('../public/fonts/Lexend-Medium.ttf') format('truetype');
}

@font-face {
  font-family: 'Roboto-Regular';
  src: url('../public/fonts/Roboto-Regular.ttf') format('truetype');
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
}

#app {
  font-family: 'Lexend-Medium', 'Roboto-Regular', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

a {
  text-decoration: none;
}

.nav-bar {
  z-index: 99;
}

.main-content {
  min-height: calc(100vh - 72px - 56px);
  margin-top: 72px;
}
</style>
