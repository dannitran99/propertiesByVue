<template>
  <li>{{ label }}</li>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  li{
    padding: 6px 16px;
    list-style-type: none;
    white-space: nowrap;
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
  }
</style>
