<template>
  <div class="filter-wrapper">
    <ul class="tab-button">
      <li :class="[{ 'active-tab': isSale }]" @click="isSale = true">
        Nhà đất bán
      </li>
      <li :class="[{ 'active-tab': !isSale }]" @click="isSale = false">
        Nhà đất cho thuê
      </li>
    </ul>
    <div class="filter-menu">
      <div class="filter-search">
        <filter-category :isHome="true" :isSale="isSale" />
        <input :value="searchKeyword" type="text" class="search-input" @input="handleSearchChange"
          @keyup.enter="handleSubmitFilter" />
        <button class="btn-filter-main" @click="handleSubmitFilter">
          <icon-magnify />
          <span>Tìm kiếm</span>
        </button>
      </div>
      <div class="filter-more">
        <filter-location :isHome="true" class="filter-option" />
        <filter-price :isHome="true" :isSale="isSale" class="filter-option" />
        <filter-square :isHome="true" class="filter-option" />
        <div class="filter-tmp filter-option">
          <p class="home-text-result">Lọc thêm</p>
          <icon-downtriangle />
        </div>
        <button class="btn-reset" @click="clearFilter">
          <icon-cached />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FilterLocation from '../NavBar/NavBarFilter/FilterLocation.vue'
import FilterCategory from '../NavBar/NavBarFilter/FilterCategory.vue'
import FilterPrice from '../NavBar/NavBarFilter/FilterPrice.vue'
import FilterSquare from '../NavBar/NavBarFilter/FilterSquare.vue'
export default {
  data() {
    return {
      isSale: true
    }
  },
  components: {
    'filter-category': FilterCategory,
    'filter-location': FilterLocation,
    'filter-price': FilterPrice,
    'filter-square': FilterSquare
  },
  computed: {
    searchKeyword: {
      get() {
        return this.$store.getters['properties/searchKeyword']
      }
    }
  },
  methods: {
    handleSearchChange: function (e) {
      this.$store.dispatch('properties/searchChange', e.target.value)
    },
    handleSubmitFilter() {
      this.$store.dispatch('properties/submitFilter', this.isSale ? '/nha-dat-ban' : '/nha-dat-cho-thue')
    },
    clearFilter: function () {
      this.$store.dispatch('properties/clearFilter')
    }
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.filter-wrapper {
  width: 945px;
  margin: 32px 0 100px 0;

  @include responsive(sm1) {
    width: calc(100% - 64px);
  }
}

.filter-option {
  @include responsive(sm1) {
    width: calc((100% - 70px) / 4) !important;

    >:first-child {
      width: 100%;
    }
  }
}

.tab-button {
  padding: 0;
  list-style: none;
  display: flex;
  gap: 8px;
}

.tab-button li {
  background: rgba(255, 255, 255, 0.8);
  padding: 6px 32px;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
  flex-shrink: 0;
}

.tab-button li:hover {
  color: white !important;
  background-color: rgba(0, 0, 0, 0.6) !important;
}

.active-tab {
  color: white !important;
  background-color: rgba(0, 0, 0, 0.6) !important;
}

.filter-menu {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0 4px 4px 4px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
}

.filter-search {
  position: relative;
  display: flex;
}

.filter-more {
  position: relative;
  margin-top: 8px;
  display: flex;

  @include responsive(sm1) {
    gap: 8px;
  }
}

.search-input {
  background: #fff;
  font-size: 14px;
  line-height: 20px;
  width: calc(100% - 172px);
  padding: 14px 128px 14px 12px;
  box-sizing: border-box;
  border: 0;
  outline: unset;
  border-radius: 0 8px 8px 0;
}

.btn-filter-main {
  position: absolute;
  right: 8px;
  top: 8px;
  color: #fff !important;
  fill: #fff;
  background: #E03C31 !important;
  border: solid 1px #E03C31 !important;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -.2px;
  padding: 5px 11px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-filter-main svg {
  margin-bottom: 3px;
  filter: invert(99%) sepia(0%) saturate(7500%) hue-rotate(212deg) brightness(101%) contrast(101%);
}

.btn-filter-main:hover {
  color: #fff !important;
  background: #FF837A !important;
  border: solid 1px #FF837A !important;
}

.filter-tmp {
  position: relative;
  height: 32px;
  margin-top: 8px;
  margin-right: 8px;
  width: 210px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 4px;
  background: 0;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.filter-tmp p {
  margin: 0;
}

.filter-tmp>svg {
  width: 20px;
  height: 20px;
  filter: invert(99%) sepia(0%) saturate(7500%) hue-rotate(212deg) brightness(101%) contrast(101%);
}

.home-text-result {
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.btn-reset {
  position: absolute;
  bottom: 0;
  right: 5px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 4px;
}

.btn-reset:hover {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.btn-reset svg {
  width: 20px;
  height: 20px;
  filter: invert(99%) sepia(0%) saturate(7500%) hue-rotate(212deg) brightness(101%) contrast(101%);
}
</style>
