<template>
  <div class="wrapper-filter">
    <h4 class="filter-title">{{ title }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>
.wrapper-filter {
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 15px;
}

.filter-title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: -.2px;
  color: #2C2C2C;
  margin-bottom: 16px;
}
</style>
