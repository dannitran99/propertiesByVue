<template>
  <div class="wrapper-filter">
    <div class="search-box">
      <p class="filter-title">TÌM KIẾM MÔI GIỚI</p>
      <div class="search-wrapper">
        <input :value="searchKeyword" type="text" class="search-input" @input="handleSearchChange"
          placeholder="Nhập từ khóa tìm kiếm" />
        <icon-magnify />
      </div>
    </div>
    <div class="search-box">
      <filter-selector :items="itemType" :selected="type" @handleSelect="handleSelectType" />
      <filter-selector :items="itemTypeProperty" :selected="typeProperty" @handleSelect="handleSelectTypeProperty"
        class="sort-con" />
    </div>
  </div>
</template>

<script>
import FilterSelector from './FilterSelector.vue'
import { PROPSSALETYPE, PROPSRENTTYPE } from '@/consts/propstype'
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
      saleItem: [
        {
          id: 1,
          label: PROPSSALETYPE.canho.primaryLabel,
          value: PROPSSALETYPE.canho.code
        },
        {
          id: 2,
          label: PROPSSALETYPE.nharieng.primaryLabel,
          value: PROPSSALETYPE.nharieng.code
        },
        {
          id: 3,
          label: PROPSSALETYPE.bietthu.primaryLabel,
          value: PROPSSALETYPE.bietthu.code
        },
        {
          id: 4,
          label: PROPSSALETYPE.nhamatpho.primaryLabel,
          value: PROPSSALETYPE.nhamatpho.code
        },
        {
          id: 5,
          label: PROPSSALETYPE.shophouse.primaryLabel,
          value: PROPSSALETYPE.shophouse.code
        },
        {
          id: 6,
          label: PROPSSALETYPE.duan.primaryLabel,
          value: PROPSSALETYPE.duan.code
        },
        {
          id: 7,
          label: PROPSSALETYPE.dat.primaryLabel,
          value: PROPSSALETYPE.dat.code
        },
        {
          id: 8,
          label: PROPSSALETYPE.trangtrai.primaryLabel,
          value: PROPSSALETYPE.trangtrai.code
        },
        {
          id: 9,
          label: PROPSSALETYPE.condotel.primaryLabel,
          value: PROPSSALETYPE.condotel.code
        },
        {
          id: 10,
          label: PROPSSALETYPE.kho.primaryLabel,
          value: PROPSSALETYPE.kho.code
        },
        {
          id: 11,
          label: PROPSSALETYPE.khac.primaryLabel,
          value: PROPSSALETYPE.khac.code
        }
      ],
      rentItem: [
        {
          id: 1,
          label: PROPSRENTTYPE.canho.primaryLabel,
          value: PROPSRENTTYPE.canho.code
        },
        {
          id: 2,
          label: PROPSRENTTYPE.nharieng.primaryLabel,
          value: PROPSRENTTYPE.nharieng.code
        },
        {
          id: 3,
          label: PROPSRENTTYPE.bietthu.primaryLabel,
          value: PROPSRENTTYPE.bietthu.code
        },
        {
          id: 4,
          label: PROPSRENTTYPE.nhamatpho.primaryLabel,
          value: PROPSRENTTYPE.nhamatpho.code
        },
        {
          id: 5,
          label: PROPSRENTTYPE.shophouse.primaryLabel,
          value: PROPSRENTTYPE.shophouse.code
        },
        {
          id: 6,
          label: PROPSRENTTYPE.nhatro.primaryLabel,
          value: PROPSRENTTYPE.nhatro.code
        },
        {
          id: 7,
          label: PROPSRENTTYPE.vanphong.primaryLabel,
          value: PROPSRENTTYPE.vanphong.code
        },
        {
          id: 8,
          label: PROPSRENTTYPE.cuahang.primaryLabel,
          value: PROPSRENTTYPE.cuahang.code
        },
        {
          id: 9,
          label: PROPSRENTTYPE.kho.primaryLabel,
          value: PROPSRENTTYPE.kho.code
        },
        {
          id: 10,
          label: PROPSRENTTYPE.khac.primaryLabel,
          value: PROPSRENTTYPE.khac.code
        }
      ]
    }
  },
  computed: {
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
    }
  },
  methods: {
    handleSearchChange: function (e) {
      this.$store.dispatch('contact/searchChange', e.target.value)
    },
    handleSelectType(item) {
      this.$store.dispatch('contact/typeChange', item)
    },
    handleSelectTypeProperty(item) {
      this.$store.dispatch('contact/typePropertyChange', item)
    }
  }
}
</script>

<style scoped>
.wrapper-filter {
  margin: 24px 0;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 16px 20px;
}

.wrapper-filter>:first-child {
  margin-bottom: 8px;
}

.search-box {
  display: flex;
  gap: 9px;
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
</style>
