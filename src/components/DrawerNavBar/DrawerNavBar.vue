<template>
  <v-navigation-drawer absolute right :value="isShow" class="drawer" width="312" v-click-outside="{
    handler: toggleDrawer,
  }">
    <!-- <v-list :items="items"></v-list> -->asdasdasd
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    toggleDrawer() {
      typeof this.isShow === 'boolean' && !this.isShow && this.$emit('toggle')
    }
  }
}
</script>

<style scoped lang="scss">
.drawer {
  z-index: 999;
}
</style>
