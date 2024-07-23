<template>
  <p>{{ data.content }}</p>
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
p {
  color: #1c1f22;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 30px;
}
</style>
