<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar/NavBar.vue'
</script>

<template>
  <NavBar />
  <div>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
<!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->