<template>
  <div class="wrapper-filter">
    <div class="search-box">
      <p class="filter-title">TÌM KIẾM DOANH NGHIỆP</p>
      <div class="search-wrapper">
        <input :value="searchKeyword" type="text" class="search-input" @input="handleSearchChange"
          placeholder="Nhập từ khóa tìm kiếm" @keyup.enter="handleSubmitFilter" />
        <icon-magnify />
      </div>
    </div>
    <div class="search-box ">
      <filter-selector :items="typeItem" :selected="type" @handleSelect="handleSelectType" class="sort-con" />
      <filter-selector :items="itemCity" :selected="city" @handleSelect="handleSelectCity" class="sort-con" />
      <filter-selector :items="itemDistrict" :selected="district" @handleSelect="handleSelectDistrict"
        class="sort-con" />
      <button class="btn-submit" @click="handleSubmitFilter">Tìm kiếm</button>
    </div>
  </div>
</template>

<script>
import FilterSelector from './FilterSelector.vue'
import { ENTERPRISE_SELECTOR } from '@/consts/label'
export default {
  components: {
    FilterSelector
  },
  data() {
    return {
      typeItem: [
        { id: 0, label: 'Lĩnh vực' },
        ...ENTERPRISE_SELECTOR
      ],
      itemCity: [
        { id: 0, label: 'Tỉnh/Thành phố', value: '' }
      ],
      itemDistrict: [
        { id: 0, label: 'Quận/Huyện', value: '' }
      ]
    }
  },
  computed: {
    cityItem: {
      get() {
        return this.$store.getters['common/city']
      }
    },
    districtItem: {
      get() {
        return this.$store.getters['common/district']
      }
    },
    searchKeyword: {
      get() {
        return this.$store.getters['enterprises/searchKeyword']
      }
    },
    type: {
      get() {
        return this.$store.getters['enterprises/type']
      }
    },
    city: {
      get() {
        return this.$store.getters['enterprises/city']
      }
    },
    district: {
      get() {
        return this.$store.getters['enterprises/district']
      }
    }
  },
  watch: {
    async '$route'() {
      this.handleGetRoute()
    },
    cityItem() {
      this.itemCity = [
        { id: 0, label: 'Tỉnh/Thành phố', value: '' },
        ...this.cityItem.map((item, idx) => ({ id: idx + 1, label: item.name, value: item.code }))
      ]
    },
    async districtItem() {
      this.itemDistrict = [
        { id: 0, label: 'Quận/Huyện', value: '' },
        ...this.districtItem.map((item, idx) => ({ id: idx + 1, label: item.name, value: item.code }))
      ]
      await this.$route.query.district ? this.$store.dispatch('enterprises/districtChange', this.itemDistrict.find(item => item.label === this.$route.query.district) || { id: 0, label: 'Quận/Huyện', value: '' })
        : this.$store.dispatch('enterprises/districtChange', { id: 0, label: 'Quận/Huyện', value: '' })
    },
    async city() {
      if (this.city.value) {
        await this.$store.dispatch('common/getDistrict', this.city.value)
      } else {
        this.itemDistrict = [
          { id: 0, label: 'Quận/Huyện', value: '' }
        ]
      }
    }
  },
  async created() {
    await this.$store.dispatch('common/getCity')
    this.handleGetRoute()
  },
  methods: {
    async handleGetRoute() {
      await this.$route.query.k ? this.$store.dispatch('enterprises/searchChange', this.$route.query.k) : this.$store.dispatch('enterprises/searchChange', '')
      await this.$route.query.type ? this.$store.dispatch('enterprises/typeChange', this.typeItem.find(item => item.label === this.$route.query.type))
        : this.$store.dispatch('enterprises/typeChange', { id: 0, label: 'Lĩnh vực' })
      await this.$route.query.city ? this.$store.dispatch('enterprises/cityChange', this.itemCity.find(item => item.label === this.$route.query.city) || { id: 0, label: 'Tỉnh/Thành phố', value: '' })
        : this.$store.dispatch('enterprises/cityChange', { id: 0, label: 'Tỉnh/Thành phố', value: '' })
      await this.$route.query.district ? this.$store.dispatch('enterprises/districtChange', this.itemDistrict.find(item => item.label === this.$route.query.district) || { id: 0, label: 'Quận/Huyện', value: '' })
        : this.$store.dispatch('enterprises/districtChange', { id: 0, label: 'Quận/Huyện', value: '' })
    },
    handleSearchChange: function (e) {
      this.$store.dispatch('enterprises/searchChange', e.target.value)
    },
    handleSubmitFilter() {
      this.$store.dispatch('enterprises/submitFilter', this.$route.query)
    },
    handleSelectType(item) {
      this.$store.dispatch('enterprises/typeChange', item)
    },
    async handleSelectCity(item) {
      this.$store.dispatch('enterprises/cityChange', item)
      this.$store.dispatch('enterprises/districtChange',
        { id: 0, label: 'Quận/Huyện', value: '' })
    },
    handleSelectDistrict(item) {
      this.$store.dispatch('enterprises/districtChange', item)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper-filter {
  margin: 24px 0;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 16px 20px;
  width: 100%;

  >:first-child {
    margin-bottom: 8px;
  }

  >:last-child {
    margin-left: 186px;
  }
}

.search-box {
  display: flex;
  gap: 9px;

  >:nth-child(n) {
    flex-shrink: 0;
  }
}

.filter-title {
  width: 177px;
  margin: 0;
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 14px;
  font-weight: normal !important;
  color: #E03C31;
  line-height: 32px;
  letter-spacing: -0.6px;
  flex-shrink: 0;
}

.search-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 596px;
  padding-right: 15px;
}

.search-wrapper svg {
  opacity: .5;
}

.search-input {
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  padding: 5px 15px;
  color: #2C2C2C;
  background: #fff;
  width: 100%;
  border: none;
  outline: none
}

.sort-con {
  width: 193px !important;
}

.btn-submit {
  margin-left: 10px;
  color: #fff;
  background: #E03C31;
  border: solid 1px #E03C31;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -.2px;
  padding: 5px 11px;
  border-radius: 4px;
  opacity: 1;
  transition: all .3s ease;
}

.btn-submit:hover {
  opacity: .7;
}
</style>
