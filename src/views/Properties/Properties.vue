<template>
    <div class="wrapper">
      <div class="content">
        <bread-crumb-property class="content-breadcrumb" :city="city" :district="district.length === 1 ? district[0] : ''" :current="`${type} ${at}`"/>
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
import BreadCrumbProperty from '../../components/BreadCrumbProperty/BreadCrumbProperty.vue'
import {PROPSSALETYPE, PROPSRENTTYPE} from '../../consts/propstype'
import PropertiesSkeleton from '../../components/Properties/PropertyCardSkeleton.vue'
export default {
  components: { PropertiesSkeleton, BreadCrumbProperty },
  data () {
    return {
      city: '',
      district: [],
      type: 'Tất cả BĐS',
      at: ''
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
      this.handleGetRouterQuery()
    }
  },
  async created () {
    await this.$route.query.k && this.$store.dispatch('properties/searchChange', this.$route.query.k)
    await this.$route.query.city && this.$store.dispatch('properties/setFilterCity', this.$route.query.city)
    await this.$route.query.district && this.$store.dispatch('properties/setFilterDistrict', this.$route.query.district.split(','))
    this.handleGetRouterQuery()
  },
  methods: {
    handleGetRouterQuery: async function () {
      if (this.$route.query.category) {
        const listLabel = this.$route.path.includes('nha-dat-ban') ? PROPSSALETYPE : PROPSRENTTYPE
        const entries = Object.entries(listLabel)
        const tmp = []
        entries.forEach(([key, value]) => {
          this.$route.query.category.split(',').includes(value.code) && tmp.push(value.secondaryLabel)
        })
        await this.$store.dispatch('properties/filterChange', {data: tmp, filterId: this.$route.query.category.split(',')})
      }
      this.city = this.$route.query.city || ''
      this.district = this.$route.query.district ? this.$route.query.district.split(',') : []
      this.at = 'trên toàn quốc'
      if (this.city) {
        this.at = `tại ${this.city}`
      }
      if (this.district.length === 1) {
        this.at = `tại ${this.district[0]}`
      }
      await this.$store.dispatch('properties/getPropertiesList', {
        type: this.$route.path.includes('nha-dat-ban') ? 'sale' : 'rent',
        query: this.$route.query
      })
    }
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
