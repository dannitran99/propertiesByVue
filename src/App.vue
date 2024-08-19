<template>
  <v-app id="app">
    <nav-bar class="nav-bar" v-if="defaultLayout" />
    <router-view :class="[{ 'main-content': defaultLayout }]" />
    <scroll-to-top v-if="defaultLayout" />
    <footer-comp v-if="defaultLayout"></footer-comp>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    defaultLayout() {
      return this.$route.path !== '/bao-cao-thi-truong'
    }
  },
  async created() {
    if (localStorage.token && !sessionStorage.getItem('Entry')) {
      await this.$store.dispatch('common/checkVerifyToken')
      sessionStorage.setItem('Entry', true)
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Lexend-Medium';
  src: url('../public/fonts/Lexend-Medium.ttf') format('truetype');
}

@font-face {
  font-family: 'Lexend';
  src: url('../public/fonts/Lexend-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Roboto-Regular';
  src: url('../public/fonts/Roboto-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Montserrat-Medium';
  src: url('../public/fonts/Montserrat-Medium.ttf') format('truetype');
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
  color: #2c3e50;
}

a {
  text-decoration: none;
  -webkit-user-drag: none;
}

iframe {
  border: 0;
}

.nav-bar {
  z-index: 99;
}

.main-content {
  min-height: calc(100vh - 72px - 56px);
  margin-top: 72px;
}
</style>
