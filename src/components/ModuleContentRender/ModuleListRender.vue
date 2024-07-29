<template>
  <ul class="list-module-content">
    <li v-for="(item, idx) in data.list" :key="idx">{{ item }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style scoped>
.list-module-content {
  padding-left: 32px;
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 26px;
  color: #1c1f22;
}
</style>
