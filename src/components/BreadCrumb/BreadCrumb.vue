<template>
  <div class="wrapper">
    <div class="bread-crumb-content">
        <bread-crumb-item v-bind:items="items"/>
        <div class="search-menu">
            <icon-search/>
            <span>
                Hướng dẫn tìm kiếm
            </span>
        </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbItem from './BreadCrumbItem.vue'
export default {
  components: {
    'bread-crumb-item': BreadCrumbItem
  },
  props: {
    items: {
      type: Array
    }
  }
}
</script>

<style scoped>
  span{
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    color: #505050;
  }
  .wrapper{
    height: 46px;
    border-bottom: 1px solid #ccc;
  }
  .bread-crumb-content{
    margin: 0 auto;
    padding: 0 12px;
    max-width: 1140px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between ;
  }
  .search-menu{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
</style>
