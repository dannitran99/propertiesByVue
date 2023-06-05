<template>
  <div>
    <div class="title">
        <h2><b>Bất động sản dành cho bạn</b></h2>
        <div class="redirect-title">
            <p class="clickable-text">Tin nhà đất bán mới nhất</p>
            <p>|</p>
            <p class="clickable-text">Tin nhà đất cho thuê mới nhất</p>
        </div>
    </div>
    {{ properties }}
  </div>
</template>

<script>
export default {
  computed: {
    properties: {
      get () {
        return this.$store.getters['properties/propertiesList']
      }
    }
  },
  async created () {
    await this.$store.dispatch('properties/getPropertiesList')
  }
}
</script>

<style scoped>
  h2{
    font-size: 24px;
    line-height: 32px;
    font-weight: normal !important;
    letter-spacing: -.2px;
    color: #2C2C2C;
    display: block;
    margin: 0;
  }
  p{
    color: #2C2C2C;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important;
  }
  .title{
    display: flex;
    justify-content: space-between;
    margin: 0 0 24px 0;
  }
  .redirect-title{
    display: flex;
    gap: 10px;
  }
  .clickable-text:hover {
    cursor: pointer;
    color: #999
  }
</style>
