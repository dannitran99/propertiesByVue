<template>
  <div class="menu">
    <ul class="menu-tab">
      <tab-menu-item v-for="item in menu" v-bind:key="item.label" v-bind:data="item" />
    </ul>
    <div class="anchor-button">
      <a href="#">Xem thêm</a>
      <icon-rightarrow />
    </div>
  </div>
</template>

<script>
import TabMenuItem from './TabMenuItem.vue'
export default {
  components: {
    'tab-menu-item': TabMenuItem
  },
  data() {
    return {
      menu: [
        {
          id: 0,
          label: 'Tin nổi bật'
        },
        {
          id: 1,
          label: 'Tin tức'
        },
        {
          id: 2,
          label: 'BĐS TPHCM'
        },
        {
          id: 3,
          label: 'BĐS Hà Nội'
        }
      ]
    }
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}

a {
  font-family: 'Roboto-Regular', sans-serif;
  text-decoration: none;
  color: #E03C31;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  float: left;
  margin-right: 4px;
}

a:hover {
  color: #FF837A;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-tab {
  display: flex;
  flex-wrap: wrap;
}

.anchor-button {
  display: flex;
  align-items: center;
  color: #E03C31;
  cursor: pointer;
}

.anchor-button:hover {
  color: #FF837A;
}

.anchor-button:hover a {
  color: #FF837A;
}
</style>
