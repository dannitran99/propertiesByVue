<template>
  <div :class="[{ 'filter': !isHome }, { 'filter-home': isHome }]" v-on:click.self="onClickPopup"
    v-click-outside="handleClickOutside">
    <template v-if="isHome">
      <icon-home v-on:click.self="onClickPopup" />
      <p v-if="categoryFilter.length" v-on:click.self="onClickPopup">{{ categoryFilter.join(', ') }}</p>
      <p v-else v-on:click.self="onClickPopup">Loại nhà đất</p>
      <icon-downtriangle v-on:click.self="onClickPopup" />
    </template>
    <template v-else>
      <div class="title-dv" v-on:click.self="onClickPopup">
        <p v-on:click.self="onClickPopup">Loại nhà đất</p>
        <icon-downtriangle v-on:click.self="onClickPopup" />
      </div>
      <p class="result-text" v-on:click.self="onClickPopup" v-if="categoryFilter.length">{{ categoryFilter.join(', ') }}
      </p>
      <p v-else class="result-text" v-on:click.self="onClickPopup">Tất cả</p>
    </template>
    <div v-if="isActive" class="popup-modal">
      <ul>
        <filter-item v-for=" item  in  selectOption " v-bind:key="item.label" v-bind:data="item"
          v-bind:filterLabel="filterLabel" v-bind:filterId="filterId" />
      </ul>
      <div class="filter-footer">
        <button @click="handleReset">
          <icon-cached />
          <span>Đặt lại</span>
        </button>
        <button class="btn-confirm" @click="handleSearch">
          <icon-magnify v-if="!isHome" />
          <span>{{ isHome ? 'Áp dụng' : 'Tìm kiếm' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FilterCategoryItem from './FilterCategoryItem.vue'
import { removeElFromArr, cloneDeep } from '@/helpers/arrayHandler'
import { FILTER_SALE_OPTION, FILTER_RENT_OPTION, FILTER_SALE_ID, FILTER_RENT_ID, FILTER_SALE_LABEL, FILTER_RENT_LABEL } from '@/consts/label.js'
export default {
  props: {
    isHome: {
      type: Boolean,
      default: null
    },
    isSale: {
      type: Boolean,
      default: null
    }
  },
  components: {
    'filter-item': FilterCategoryItem
  },
  data() {
    return {
      isActive: false,
      selectOption: [],
      filterLabel: [],
      filterId: []
    }
  },
  computed: {
    categoryFilter: {
      get() {
        let tmp = cloneDeep(this.$store.getters['properties/categoryFilter'])
        tmp.map(el => {
          el === 'Tất cả nhà đất' ? removeElFromArr(tmp, 'Tất cả nhà đất') : this.selectOption.map(item => {
            item.label === el && item.subItem && item.subItem.map(subEl => removeElFromArr(tmp, subEl.label))
          })
        })
        return tmp
      }
    },
    categoryIdFilter: {
      get() {
        let tmp = cloneDeep(this.$store.getters['properties/categoryIdFilter'])
        return tmp.length === this.filterId.length ? [] : tmp
      }
    }
  },
  watch: {
    '$route'() {
      this.handleLoadData()
    },
    isSale() {
      this.$store.dispatch('properties/filterChange', { data: [], filterId: [] })
      this.handleLoadData()
    }
  },
  created() {
    this.handleLoadData()
  },
  methods: {
    handleClickOutside() {
      if (this.isActive) {
        this.isActive = false
      }
    },
    onClickPopup() {
      this.isActive = !this.isActive
    },
    handleReset() {
      this.$store.dispatch('properties/filterChange', { data: [], filterId: [] })
    },
    handleSearch() {
      !this.isHome && this.$store.dispatch('properties/submitFilter')
      this.isActive = false
    },
    handleLoadData() {
      this.$route.path === '/nha-dat-ban' && this.handleDataSale()
      this.$route.path === '/nha-dat-cho-thue' && this.handleDataRent()
      if (this.isHome) {
        this.isSale ? this.handleDataSale() : this.handleDataRent()
      }
    },
    handleDataSale() {
      this.selectOption = FILTER_SALE_OPTION
      this.filterLabel = FILTER_SALE_LABEL
      this.filterId = FILTER_SALE_ID
    },
    handleDataRent() {
      this.selectOption = FILTER_RENT_OPTION
      this.filterLabel = FILTER_RENT_LABEL
      this.filterId = FILTER_RENT_ID
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

ul {
  margin: 0;
  padding: 8px 0;
  margin-bottom: 0 !important;
  max-height: 315px;
  overflow: auto;
}

.filter {
  position: relative;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.filter-home {
  position: relative;
  background: #fff;
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  width: 172px;
  height: 48px;
  cursor: pointer;
  border-right: 1px solid #F2F2F2;
  font-size: 14px;
  line-height: 20px;
}

.filter-home>svg {
  margin: 14px 10px 14px 14px;
  width: 20px;
  height: 20px;
}

.filter-home>p {
  white-space: nowrap;
  width: calc(100% - 24px - 12px - 8px - 24px - 12px - 7px);
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 14px 0px;
}

.filter:hover {
  background: #F2F2F2;
}

.filter:hover ::-webkit-scrollbar-thumb {
  background: #acacac;
}

.filter p {
  margin: 0;
}

.filter>:first-child {
  font-size: 12px;
  line-height: 16px;
  color: #2C2C2C;
  margin-bottom: 4px;
  flex-shrink: 0
}

.result-text {
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2C;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-dv {
  display: flex;
  gap: 5px;
}

.popup-modal {
  position: absolute;
  top: 65px;
  left: 0px;
  z-index: 9;
  width: 280px;
  background: #fff;
  box-shadow: 0px 8px 20px rgba(182, 182, 182, 0.42);
  border-radius: 8px;
}

.filter-footer {
  border-top: 1px solid #F2F2F2;
  padding: 0.5px 0px;
  display: flex;
  justify-content: space-between;
}

.filter-footer button {
  margin: 7px;
  padding: 5px 11px;
  font-size: 14px;
  font-weight: 550;
  line-height: 20px;
  letter-spacing: -.2px;
  border: solid 1px rgba(0, 0, 0, 0);
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.filter-footer button:hover {
  color: #2C2C2C;
  background: #FAFAFA;
  border: solid 1px #FAFAFA;
}

.btn-confirm {
  color: #fff !important;
  fill: #fff;
  background: #E03C31 !important;
  border: solid 1px #E03C31 !important;
}

.btn-confirm svg {
  filter: invert(99%) sepia(0%) saturate(7500%) hue-rotate(212deg) brightness(101%) contrast(101%);
}

.btn-confirm:hover {
  color: #fff !important;
  background: #FF837A !important;
  border: solid 1px #FF837A !important;
}
</style>
