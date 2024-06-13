<template>
  <div class="content">
    <side-bar />
    <div class="main-area" :class="[{ 'hide': !drawer }]">

    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
export default {
  components: { SideBar },
  computed: {
    drawer: {
      get() {
        return this.$store.getters['user/drawer']
      }
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
}

.main-area {
  background-color: rgb(249, 249, 249);
  width: calc(100vw - 256px);
  transition: all .2s ease;
  overflow: auto;
  height: calc(100vh - 72px);
}

.hide {
  width: 100vw;
}
</style>
