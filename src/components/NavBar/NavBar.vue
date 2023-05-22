<template>
  <ul class="menu-list">
    <nav-bar-button v-for="item in menu" v-bind:key="item.label" v-bind:label="item.label"/>
  </ul>
</template>

<script>
import NavBarButton from './NavBarButton/NavBarButton'
export default {
  name: 'NavBar',
  components: {
    'nav-bar-button': NavBarButton
  },
  data () {
    return {
      menu: [{label: 'Nhà đất bán'}, {label: 'Nhà đất cho thuê'}, {label: 'Dự án'}, {label: 'Tin tức'}, {label: 'Wiki BĐS'}, {label: 'Phân tích đánh giá'}, {label: 'Danh bạ'}]
    }
  }
}
</script>

<style scoped>
  .menu-list{
    display: flex
  }
</style>
