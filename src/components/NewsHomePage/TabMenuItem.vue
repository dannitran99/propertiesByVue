<template>
  <li :class="[{ 'enable-tab': isEnable }]" v-on:click="changeTab">{{ data.label }}</li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    isEnable: {
      get() {
        const current = this.$store.getters['news/currentTab']
        return current === this.data.id
      }
    }
  },
  methods: {
    changeTab() {
      this.$store.dispatch('news/setCurrentMenuTab', { data: this.data.id })
    }
  }
}
</script>

<style scoped lang="scss">
li {
  flex-shrink: 0;
  list-style-type: none;
  padding: 12px 16px;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -.2px;
  color: #999;
  cursor: pointer;

  @include responsive(sm) {
    font-size: 18px;
    line-height: 28px;
  }
}

li:hover {
  color: #2C2C2C;
  border-bottom: 2px solid #E03C31;
}

.enable-tab {
  color: #2C2C2C;
  border-bottom: 2px solid #E03C31;
}
</style>
