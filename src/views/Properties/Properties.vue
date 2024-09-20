<template>
  <div class="wrapper">
    <div class="content" ref="property-item">
      <bread-crumb-property class="content-breadcrumb" :city="city" :district="district.length === 1 ? district[0] : ''"
        :current="`${type} ${at}`" />
      <h3 class="title-property">{{ `${typeTitle} ${at}` }}</h3>
      <p class="subtitle">Hiện có {{ totalItem }} bất động sản.</p>
      <div class="sort-filter">
        <sort-box />
      </div>
      <div class="properties-list">
        <template v-if="isLoading">
          <properties-skeleton :heightImage="heightImage" :isMobile="isMobile" />
          <properties-skeleton :heightImage="heightImage" :isMobile="isMobile" />
          <properties-skeleton :heightImage="heightImage" :isMobile="isMobile" />
          <properties-skeleton :heightImage="heightImage" :isMobile="isMobile" />
        </template>
        <properties v-for="item in properties" :key="item.ID" :data="item" v-else-if="properties"
          :heightImage="heightImage" :isMobile="isMobile" />
        <div class="empty-list" v-else>
          <div class="background"></div>
          <p>Không có kết quả nào phù hợp</p>
        </div>
        <pagination :total="totalItem" />
      </div>
    </div>
    <div class="filter" :style="{ 'min-height': `${minHeight}px` }">
      <div class="filter-container" ref="filter" :class="[{ 'positionBot': bottom }]">
        <properties-filter :title="'Lọc theo khoảng giá'" :list="selectPriceList" :min="minp" :max="maxp"
          @handleSelect="handleSelectPriceFilter" />
        <properties-filter :title="'Lọc theo diện tích'" :list="selectSquareList" :min="mins" :max="maxs"
          @handleSelect="handleSelectSquareFilter" />
      </div>
    </div>

  </div>
</template>

<script>
import { FILTER_SQUARE } from '@/consts/squareFilter.js'
import { FILTER_SALE_PRICE, FILTER_RENT_PRICE } from '@/consts/priceFilter.js'
import { checkArrHasElArr } from '@/helpers/arrayHandler'
import BreadCrumbProperty from '../../components/BreadCrumbProperty/BreadCrumbProperty.vue'
import { PROPSSALETYPE, PROPSRENTTYPE } from '../../consts/propstype'
import PropertiesSkeleton from '../../components/Properties/PropertyCardSkeleton.vue'
import PropertiesFilter from '../../components/Properties/PropertyFilter.vue'
import { FILTER_RENT_OPTION, FILTER_SALE_OPTION } from '../../consts/label'
import { useBreakpoints } from '@vueuse/core'
import { breakpoints } from '@/consts/breakpoints.js'

const definedBreakpoint = useBreakpoints(breakpoints)
export default {
  components: { PropertiesSkeleton, BreadCrumbProperty, PropertiesFilter },
  data() {
    return {
      city: '',
      district: [],
      type: '',
      typeTitle: '',
      at: '',
      minp: null,
      maxp: null,
      mins: null,
      maxs: null,
      selectPriceList: [],
      selectSquareList: FILTER_SQUARE,
      minHeight: 0,
      bottom: false,
      heightImage: undefined,
      isMobile: definedBreakpoint.smaller('sm2')
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
    },
    totalItem: {
      get() {
        return this.$store.getters['properties/totalItem']
      }
    },
    priceMin: {
      get() {
        return this.$store.getters['properties/priceMin']
      }
    },
    priceMax: {
      get() {
        return this.$store.getters['properties/priceMax']
      }
    },
    squareMin: {
      get() {
        return this.$store.getters['properties/squareMin']
      }
    },
    squareMax: {
      get() {
        return this.$store.getters['properties/squareMax']
      }
    }
  },
  watch: {
    async '$route'() {
      this.handleGetRouterQuery()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleResizeWindow()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  async created() {
    window.addEventListener('resize', this.handleResizeWindow)
    this.handleGetRouterQuery()
  },
  methods: {
    handleResizeWindow() {
      if (this.$refs['property-item'] && this.isMobile) {
        this.heightImage = this.$refs['property-item'].offsetWidth / 3
      }
    },
    handleGetRouterQuery: async function () {
      if (this.$route.query.category) {
        const category = await this.handleCategory()
        await this.$store.dispatch('properties/filterChange', { data: category, filterId: this.$route.query.category.split(',') })
      } else {
        this.$store.dispatch('properties/filterChange', { data: [], filterId: [] })
      }
      await this.$route.query.k ? this.$store.dispatch('properties/searchChange', this.$route.query.k) : this.$store.dispatch('properties/searchChange', '')
      await this.$route.query.city ? this.$store.dispatch('properties/setFilterCity', this.$route.query.city) : this.$store.dispatch('properties/setFilterCity', '')
      await this.$route.query.district ? this.$store.dispatch('properties/setFilterDistrict', this.$route.query.district.split(',')) : this.$store.dispatch('properties/setFilterDistrict', [])
      await this.$route.query.minPrice ? this.$store.dispatch('properties/minPriceChange', parseInt(this.$route.query.minPrice) || null) : this.$store.dispatch('properties/minPriceChange', null)
      await this.$route.query.maxPrice ? this.$store.dispatch('properties/maxPriceChange', parseInt(this.$route.query.maxPrice) || null) : this.$store.dispatch('properties/maxPriceChange', null)
      await this.$route.query.minSquare ? this.$store.dispatch('properties/minSquareChange', parseInt(this.$route.query.minSquare) || null) : this.$store.dispatch('properties/minSquareChange', null)
      await this.$route.query.maxSquare ? this.$store.dispatch('properties/maxSquareChange', parseInt(this.$route.query.maxSquare) || null) : this.$store.dispatch('properties/maxSquareChange', null)
      this.handleScroll()
      this.selectPriceList = this.$route.path === '/nha-dat-ban' ? FILTER_SALE_PRICE : FILTER_RENT_PRICE
      this.minp = Number(this.$route.query.minPrice) || null
      this.maxp = Number(this.$route.query.maxPrice) || null
      this.mins = Number(this.$route.query.minSquare) || null
      this.maxs = Number(this.$route.query.maxSquare) || null
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
      this.minHeight = this.$refs['filter'].offsetHeight + 24
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
    },
    handleSelectPriceFilter: function (item) {
      this.$store.dispatch('properties/minPriceChange', item.min)
      this.$store.dispatch('properties/maxPriceChange', item.max)
      this.$store.dispatch('properties/submitFilter')
    },
    handleSelectSquareFilter: function (item) {
      this.$store.dispatch('properties/minSquareChange', item.min)
      this.$store.dispatch('properties/maxSquareChange', item.max)
      this.$store.dispatch('properties/submitFilter')
    },
    handleScroll: function () {
      const headerheight = 72 + 56
      const footerheight = 56
      const filterpadding = 48
      this.bottom = (window.scrollY > document.documentElement.scrollHeight - this.$refs['filter'].offsetHeight - headerheight - footerheight - filterpadding)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  margin-top: 129px !important;
  margin: 0 auto;
  width: 1140px;
  min-height: calc(100vh - 72px - 56px - 57px);

  @include responsive(xl) {
    width: 936px;
  }

  @include responsive(md) {
    margin-top: 174px !important;
    min-height: calc(100vh - 72px - 56px - 102px);
  }

  @include responsive(sm2) {
    padding: 0 32px;
    width: 100%;
  }
}

.title-property {
  font-size: 24px;
  line-height: 32px;
  font-weight: 400;
  letter-spacing: -0.2px;
  color: #2C2C2C;
}

.empty-list {
  font-family: 'Roboto-Regular', sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #999;
  text-align: center;
  margin-bottom: 4px;
}

.background {
  width: 130px;
  height: 130px;
  background-image: url('../../assets/listing-empty.svg');
  background-size: contain;
  margin: 24px auto 24px auto;
}

.content {
  width: 848px;
  margin-top: 24px;
  margin-right: 30px;

  @include responsive(xl) {
    width: 696px;
  }

  @include responsive(sm2) {
    width: 100%;
    margin-right: 0;
  }
}

.sort-filter {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.filter {
  position: relative;
  margin-top: 24px;
  width: 262px;

  @include responsive(xl) {
    width: 210px;
  }

  @include responsive(sm2) {
    display: none;
  }
}

.filter-container {
  width: inherit;
  position: fixed;
}

.filter :not(:last-child) {
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
  margin: 6px 0 16px 0;
}

.properties-list {
  margin-bottom: 24px;
}

.properties-list>:not(:last-child) {
  margin-bottom: 16px;
}

.positionBot {
  position: absolute;
  bottom: 24px;
}
</style>
