<template>
  <div class="card-wrapper">{{ data.name }}</div>
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
.card-wrapper {
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 16px;
}
</style>
