<template>
  <li>
    {{ data.label }}
    <ul v-if="data.subItem">
        <li v-for="item in data.subItem" v-bind:key="item.label">{{ item.label }}</li>
    </ul>
  </li>
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
    li{
        padding: 6px 0;
        list-style-type: none;
        border-bottom: 1px solid #F2F2F2;
        margin-bottom: 4px;
        font-size: 14px;
        line-height: 20px;
        color: #2C2C2C;
    }
</style>
