<template>
    <div class="content">
      <div class="main-content">
        <p class="content-breadcrumb">{{ isSale }}</p>
        <p class="subtitle">Hiện có {{ properties.length }} bất động sản.</p>
        <properties v-for="item in properties" :key="item.ID" :data="item"/>
      </div>
      <div class="filter">

      </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      isSale: ''
    }
  },
  computed: {
    properties: {
      get () {
        return this.$store.getters['properties/propertiesList']
      }
    }
  },
  watch: {
    '$route' () {
      this.isSale = this.$route.path.includes('nha-dat-ban') ? 'Bán' : 'Cho thuê'
    }
  },
  async created () {
    this.isSale = this.$route.path.includes('nha-dat-ban') ? 'Bán' : 'Cho thuê'
    await this.$store.dispatch('properties/getPropertiesList')
  }
}
</script>

<style scoped>
  .content{
    display: flex;
    margin-top: 24px !important;
    margin: 0 auto;
    max-width: 1140px;
  }
  .main-content{
    width: 848px;
    margin-right: 30px
  }
  .filter{
    width: 262px
  }
  .content-breadcrumb{
    margin: 0 0 8px 0;
    text-align: left;
    font-size: 14px;
    line-height: 20px;
    color: #999;
  }
  .subtitle{
    font-size: 14px;
    line-height: 20px;
    color: #2C2C2C;
    display: inline-block;
    margin: 6px 0 0 0;
  }
</style>
