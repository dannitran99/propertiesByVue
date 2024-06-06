<template>
  <div class="list-breadcrumb">
    <router-link :to="{ name: 'HomePage' }">
      <icon-home />
    </router-link>
    <div v-for="(item, index) in items" :key="index">
      <icon-righttriangle />
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    }
  }
}
</script>

<style scoped>
.list-breadcrumb {
  display: flex;
  gap: 5px;
}

span {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #999;
}
</style>
