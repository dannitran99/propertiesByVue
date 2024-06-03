<template>
    <div class="wrapper">
      <div class="content">
        <p class="content-breadcrumb">{{ isSale }}</p>
        <p class="subtitle">Hiện có {{ properties.length }} bất động sản.</p>
        <div class="properties-list">
          <template v-if="isLoading">
            <properties-skeleton/>
            <properties-skeleton/>
            <properties-skeleton/>
            <properties-skeleton/>
          </template>
          <properties v-for="item in properties" :key="item.ID" :data="item" v-else/>
        </div>
      </div>
      <div class="filter">

      </div>

    </div>
</template>

<script>

import PropertiesSkeleton from '../../components/Properties/PropertyCardSkeleton.vue'
export default {
  components: { PropertiesSkeleton },
  data () {
    return {
      isSale: ''
    }
  },
  computed: {
    isLoading: {
      get () {
        return this.$store.getters['properties/isLoading']
      }
    },
    properties: {
      get () {
        return this.$store.getters['properties/propertiesList']
      }
    }
  },
  watch: {
    async '$route' () {
      this.isSale = this.$route.path.includes('nha-dat-ban') ? 'Bán' : 'Cho thuê'
      await this.$store.dispatch('properties/getPropertiesList', {
        type: this.$route.path.includes('nha-dat-ban') ? 'sale' : 'rent',
        query: this.$route.query
      })
    }
  },
  async created () {
    this.isSale = this.$route.path.includes('nha-dat-ban') ? 'Bán' : 'Cho thuê'
    await this.$store.dispatch('properties/getPropertiesList', {
      type: this.$route.path.includes('nha-dat-ban') ? 'sale' : 'rent',
      query: this.$route.query
    })
  }
}
</script>

<style scoped>
  .wrapper{
    display: flex;
    margin-top: 129px !important;
    margin: 0 auto;
    max-width: 1140px;
  }
  .content{
    width: 848px;
    margin-top: 24px
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
  .properties-list >:not(:last-child){
    margin-bottom: 16px;
  }
</style>
