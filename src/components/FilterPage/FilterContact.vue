<template>
  <div class="wrapper-filter">
    <div class="search-box">
      <p class="filter-title">TÌM KIẾM MÔI GIỚI</p>
      <div class="search-wrapper">
        <input :value="searchKeyword" type="text" class="search-input" @input="handleSearchChange"
          placeholder="Nhập từ khóa tìm kiếm" @keyup.enter="handleSubmitFilter" />
        <icon-magnify />
      </div>
    </div>
    <div class="search-box">
      <filter-selector :items="itemType" :selected="type" @handleSelect="handleSelectType" />
      <filter-selector :items="itemTypeProperty" :selected="typeProperty" @handleSelect="handleSelectTypeProperty"
        class="sort-con" />
      <filter-selector :items="itemCity" :selected="city" @handleSelect="handleSelectCity" class="sort-con" />
      <filter-selector :items="itemDistrict" :selected="district" @handleSelect="handleSelectDistrict"
        class="sort-con" />
      <filter-selector :items="itemProject" :selected="project" @handleSelect="handleSelectProject" class="sort-con" />
      <button class="btn-submit" @click="handleSubmitFilter">Tìm kiếm</button>
    </div>
  </div>
</template>

<script>
import FilterSelector from './FilterSelector.vue'
import { SALE_ITEM, RENT_ITEM } from '@/consts/label'
export default {
  components: {
    FilterSelector
  },
  data() {
    return {
      itemType: [
        { id: 0, label: 'Loại giao dịch', value: '' },
        { id: 1, label: 'Nhà đất bán', value: 'sale' },
        { id: 2, label: 'Nhà đất cho thuê', value: 'rent' }
      ],
      itemTypeProperty: [
        { id: 0, label: 'Loại nhà đất', value: '' }
      ],
      itemCity: [
        { id: 0, label: 'Tỉnh/Thành phố', value: '' }
      ],
      itemDistrict: [
        { id: 0, label: 'Quận/Huyện', value: '' }
      ],
      itemProject: [
        { id: 0, label: 'Dự án', value: '' }
      ],
      saleItem: SALE_ITEM,
      rentItem: RENT_ITEM
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
        return this.$store.getters['contact/searchKeyword']
      }
    },
    type: {
      get() {
        return this.$store.getters['contact/type']
      }
    },
    typeProperty: {
      get() {
        return this.$store.getters['contact/typeProperty']
      }
    },
    city: {
      get() {
        return this.$store.getters['contact/city']
      }
    },
    district: {
      get() {
        return this.$store.getters['contact/district']
      }
    },
    project: {
      get() {
        return this.$store.getters['contact/project']
      }
    }
  },
  watch: {
    async '$route'() {
      this.handleGetRoute()
    },
    type() {
      switch (this.type.id) {
        case 0:
          this.itemTypeProperty = [
            { id: 0, label: 'Loại nhà đất', value: '' }
          ]
          break
        case 1:
          this.itemTypeProperty = [
            { id: 0, label: 'Loại nhà đất', value: '' },
            ...this.saleItem
          ]
          break
        case 2:
          this.itemTypeProperty = [
            { id: 0, label: 'Loại nhà đất', value: '' },
            ...this.rentItem
          ]
          break
        default: break
      }
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
      await this.$route.query.district ? this.$store.dispatch('contact/districtChange', this.itemDistrict.find(item => item.label === this.$route.query.district) || { id: 0, label: 'Quận/Huyện', value: '' })
        : this.$store.dispatch('contact/districtChange', { id: 0, label: 'Quận/Huyện', value: '' })
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
      await this.$route.query.k ? this.$store.dispatch('contact/searchChange', this.$route.query.k) : this.$store.dispatch('contact/searchChange', '')
      await this.$route.query.type ? this.$store.dispatch('contact/typeChange', this.itemType.find(item => item.value === this.$route.query.type))
        : this.$store.dispatch('contact/typeChange', { id: 0, label: 'Loại giao dịch', value: '' })
      await this.$route.query.typeProperty ? this.$store.dispatch('contact/typePropertyChange',
        this.$route.query.type === 'sale' ? this.saleItem.find(item => item.value === this.$route.query.typeProperty)
          : this.rentItem.find(item => item.value === this.$route.query.typeProperty))
        : this.$store.dispatch('contact/typePropertyChange', { id: 0, label: 'Loại nhà đất', value: '' })
      await this.$route.query.city ? this.$store.dispatch('contact/cityChange', this.itemCity.find(item => item.label === this.$route.query.city) || { id: 0, label: 'Tỉnh/Thành phố', value: '' })
        : this.$store.dispatch('contact/cityChange', { id: 0, label: 'Tỉnh/Thành phố', value: '' })
      await this.$route.query.district ? this.$store.dispatch('contact/districtChange', this.itemDistrict.find(item => item.label === this.$route.query.district) || { id: 0, label: 'Quận/Huyện', value: '' })
        : this.$store.dispatch('contact/districtChange', { id: 0, label: 'Quận/Huyện', value: '' })
    },
    handleSearchChange: function (e) {
      this.$store.dispatch('contact/searchChange', e.target.value)
    },
    handleSelectType(item) {
      this.$store.dispatch('contact/typeChange', item)
      this.$store.dispatch('contact/typePropertyChange',
        { id: 0, label: 'Loại nhà đất', value: '' })
    },
    handleSelectTypeProperty(item) {
      this.$store.dispatch('contact/typePropertyChange', item)
    },
    async handleSelectCity(item) {
      this.$store.dispatch('contact/cityChange', item)
      this.$store.dispatch('contact/districtChange',
        { id: 0, label: 'Quận/Huyện', value: '' })
    },
    handleSelectDistrict(item) {
      this.$store.dispatch('contact/districtChange', item)
    },
    handleSelectProject() {
      //
    },
    handleSubmitFilter() {
      this.$store.dispatch('contact/submitFilter', this.$route.query)
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
  width: fit-content;
}

.wrapper-filter>:first-child {
  margin-bottom: 8px;
}

.search-box {
  display: flex;
  gap: 9px;

  >:nth-child(n) {
    flex-shrink: 0;
  }
}

.filter-title {
  width: 144px;
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
  width: 632px;
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
  width: 152px !important;
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
