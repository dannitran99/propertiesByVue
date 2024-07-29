<template>
  <p>
    <b v-if="data.isBold">
      <i v-if="data.isItalic">{{ data.content }}</i>
      <template v-else>{{ data.content }}</template>
    </b>
    <i v-else-if="data.isItalic">{{ data.content }}</i>
    <template v-else>{{ data.content }}</template>
  </p>
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
  white-space: pre-line;
}
</style>
