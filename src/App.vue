<template>
  <v-app id="app">
    <drawer-nav-bar v-if="isMobile" :isShow="navbarDrawer" @toggle="toggleDrawer" />
    <nav-bar class="nav-bar" v-if="defaultLayout" :isMobile="isMobile" @toggle="toggleDrawer" />
    <router-view :class="[{ 'main-content': defaultLayout }]" />
    <scroll-to-top v-if="defaultLayout" />
    <footer-comp v-if="defaultLayout"></footer-comp>
  </v-app>
</template>

<script>
import { useBreakpoints } from '@vueuse/core'
import { breakpoints } from '@/consts/breakpoints.js'
import DrawerNavBar from './components/DrawerNavBar/DrawerNavBar.vue'

const definedBreakpoint = useBreakpoints(breakpoints)
export default {
  components: { DrawerNavBar },
  name: 'App',
  data() {
    return {
      navbarDrawer: null,
      isMobile: definedBreakpoint.smaller('md')
    }
  },
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
  },
  methods: {
    toggleDrawer() {
      this.navbarDrawer = !this.navbarDrawer
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
  min-width: 666px;
}
</style>
