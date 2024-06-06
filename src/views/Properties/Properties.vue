<template>
  <div class="wrapper">
    <div class="content">
      <bread-crumb-property class="content-breadcrumb" :city="city" :district="district.length === 1 ? district[0] : ''"
        :current="`${type} ${at}`" />
      <h3 class="title-property">{{ `${typeTitle} ${at}` }}</h3>
      <p class="subtitle">Hiện có {{ properties.length }} bất động sản.</p>
      <div class="properties-list">
        <template v-if="isLoading">
          <properties-skeleton />
          <properties-skeleton />
          <properties-skeleton />
          <properties-skeleton />
        </template>
        <properties v-for="item in properties" :key="item.ID" :data="item" v-else />
      </div>
    </div>
    <div class="filter">
      <properties-filter :title="'Lọc theo khoảng giá'" />
    </div>

  </div>
</template>

<script>
import { checkArrHasElArr } from '@/helpers/arrayHandler'
import BreadCrumbProperty from '../../components/BreadCrumbProperty/BreadCrumbProperty.vue'
import { PROPSSALETYPE, PROPSRENTTYPE } from '../../consts/propstype'
import PropertiesSkeleton from '../../components/Properties/PropertyCardSkeleton.vue'
import PropertiesFilter from '../../components/Properties/PropertyFilter.vue'
import { FILTER_RENT_OPTION, FILTER_SALE_OPTION } from '../../consts/label'
export default {
  components: { PropertiesSkeleton, BreadCrumbProperty, PropertiesFilter },
  data() {
    return {
      city: '',
      district: [],
      type: '',
      typeTitle: '',
      at: ''
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['properties/isLoading']
      }
    },
    properties: {
      get() {
        return this.$store.getters['properties/propertiesList']
      }
    }
  },
  watch: {
    async '$route'() {
      this.handleGetRouterQuery()
    }
  },
  async created() {
    if (this.$route.query.category) {
      const category = await this.handleCategory()
      await this.$store.dispatch('properties/filterChange', { data: category, filterId: this.$route.query.category.split(',') })
    }
    await this.$route.query.k && this.$store.dispatch('properties/searchChange', this.$route.query.k)
    await this.$route.query.city && this.$store.dispatch('properties/setFilterCity', this.$route.query.city)
    await this.$route.query.district && this.$store.dispatch('properties/setFilterDistrict', this.$route.query.district.split(','))
    await this.$route.query.minPrice && this.$store.dispatch('properties/minPriceChange', parseInt(this.$route.query.minPrice) || null)
    await this.$route.query.maxPrice && this.$store.dispatch('properties/maxPriceChange', parseInt(this.$route.query.maxPrice) || null)
    await this.$route.query.minSquare && this.$store.dispatch('properties/minSquareChange', parseInt(this.$route.query.minSquare) || null)
    await this.$route.query.maxSquare && this.$store.dispatch('properties/maxSquareChange', parseInt(this.$route.query.maxSquare) || null)
    this.handleGetRouterQuery()
  },
  methods: {
    handleGetRouterQuery: async function () {
      this.city = this.$route.query.city || ''
      this.district = this.$route.query.district ? this.$route.query.district.split(',') : []
      this.at = 'trên toàn quốc'
      if (this.city) {
        this.at = `tại ${this.city}`
      }
      if (this.district.length === 1) {
        this.at = `tại ${this.district[0]}`
      }
      const category = await this.handleCategory()
      const label = []
      if (category.length) {
        const optionLabel = this.$route.path.includes('nha-dat-ban') ? FILTER_SALE_OPTION : FILTER_RENT_OPTION
        optionLabel.map(item => {
          if (category.includes(item.label)) {
            label.push(label.length === 0 ? item.label : item.label.toLowerCase())
          } else if (item.subItem) {
            item.subItem.map(subItem => {
              category.includes(subItem.label) && label.push(label.length === 0 ? subItem.label : subItem.label.toLowerCase())
            })
          }
        })
      }
      if (label.length > 3 || label.length === 0) {
        this.type = 'Tất cả BĐS'
        this.typeTitle = this.$route.path.includes('nha-dat-ban') ? 'Mua bán nhà đất' : 'Cho thuê nhà đất'
      } else {
        this.type = label.join(', ')
        this.typeTitle = this.$route.path.includes('nha-dat-ban') ? `Mua bán ${label.join(', ')}` : `Cho thuê ${label.join(', ')}`
      }
      await this.$store.dispatch('properties/getPropertiesList', {
        type: this.$route.path.includes('nha-dat-ban') ? 'sale' : 'rent',
        query: this.$route.query
      })
    },
    handleCategory: async function () {
      const listLabel = this.$route.path.includes('nha-dat-ban') ? PROPSSALETYPE : PROPSRENTTYPE
      const optionLabel = this.$route.path.includes('nha-dat-ban') ? FILTER_SALE_OPTION : FILTER_RENT_OPTION
      const entries = Object.entries(listLabel)
      const tmp = []
      await entries.forEach(([key, value]) => {
        this.$route.query.category && this.$route.query.category.split(',').includes(value.code) && tmp.push(value.secondaryLabel)
      })
      optionLabel.map(item => {
        if (checkArrHasElArr(item.subItem && item.subItem.map(el => el.label), tmp)) {
          tmp.push(item.label)
        }
      })
      return tmp
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  margin-top: 129px !important;
  margin: 0 auto;
  max-width: 1140px;
}

.title-property {
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
  letter-spacing: -0.2px;
  color: #2C2C2C;
}

.content {
  width: 848px;
  margin-top: 24px;
  margin-right: 30px;
}

.filter {
  margin-top: 24px;
  width: 262px
}

.filter>:not(:last-child) {
  margin-bottom: 16px;
}

.content-breadcrumb {
  margin: 0 0 8px 0;
}

.subtitle {
  font-family: 'Roboto-Regular', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2C;
  display: inline-block;
  margin: 6px 0 0 0;
}

.properties-list>:not(:last-child) {
  margin-bottom: 16px;
}
</style>
