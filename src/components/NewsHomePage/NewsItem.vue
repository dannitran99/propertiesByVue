<template>
  <li v-on:mouseenter="hoverPreviewNews">{{ data.name }}</li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    hoverPreviewNews () {
      this.$store.dispatch('news/setPreviewNews', {data: this.data})
    }
  }
}
</script>

<style scoped>
  li{
    list-style-type: none;
    text-align: left;
    padding-top: 14px;
    padding-bottom: 14px;
    border-top: 1px solid #F2F2F2;
    font-size: 16px;
    line-height: 26px;
    font-weight: normal !important;
    color: #2C2C2C;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  li:hover{
    color: #999;
  }
</style>
