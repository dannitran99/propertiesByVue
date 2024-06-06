<template>
  <div class="filter-price" v-on:click.self="onClickPopup" v-click-outside="handleClickOutside">
    <div class="title-dv" v-on:click.self="onClickPopup">
      <p v-on:click.self="onClickPopup">Mức giá</p>
      <icon-downtriangle v-on:click.self="onClickPopup" />
    </div>
    <p v-on:click.self="onClickPopup" class="text-result">{{ priceLabel }}</p>
    <div v-if="isActive" class="popup-modal">
      <div class="modal-header">
        <div class="header-info">
          <input class="input-info" autocomplete="off" placeholder="Từ" min="0" :max="maxRangeInput" :value="priceMin"
            @input="handleMinChange" ref="minInput" type="number" />
          <icon-rightarrowsc class="ico" />
          <input class="input-info" autocomplete="off" placeholder="Đến" min="0" :max="maxRangeInput" :value="priceMax"
            @input="handleMaxChange" ref="maxInput" type="number" />
        </div>
        <v-range-slider v-model="range" :max="sliderMax" :min="0" :step="sliderStep" class="align-center" hide-details
          color="#009ba1" track-color="#F2F2F2" @end="handleEnd">
        </v-range-slider>
      </div>
      <ul class="select-list">
        <li v-for="item in selectList" :key="item.label" @click="() => handleSelectRange(item)"
          :class="[{ 'selector-active': item.min === priceMin && item.max === priceMax }]">
          {{ item.label }}
        </li>
      </ul>
      <div class="filter-footer">
        <button @click="clearSelectPrice">
          <icon-cached />
          <span>Đặt lại</span>
        </button>
        <button class="btn-confirm" @click="submitFilter">
          <icon-magnify />
          <span>Tìm kiếm</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { FILTER_SALE_PRICE, FILTER_RENT_PRICE } from '@/consts/priceFilter.js'
import { formatCurrency } from '@/helpers/formater'
export default {
  data() {
    return {
      isActive: false,
      maxRangeInput: 999999,
      range: [0, this.sliderMax],
      timeoutMinId: null,
      timeoutMaxId: null,
      priceLabel: 'Tất cả',
      sliderMax: 0,
      sliderStep: 0,
      selectList: []
    }
  },
  computed: {
    priceMin: {
      get() {
        return this.$store.getters['properties/priceMin']
      }
    },
    priceMax: {
      get() {
        return this.$store.getters['properties/priceMax']
      }
    }
  },
  watch: {
    '$route'() {
      if (this.$route.path === '/nha-dat-ban') {
        this.sliderMax = 60000
        this.sliderStep = 100
        this.range = [0, 60000]
        this.selectList = FILTER_SALE_PRICE
      }
      if (this.$route.path === '/nha-dat-cho-thue') {
        this.sliderMax = 100
        this.sliderStep = 0.5
        this.range = [0, 100]
        this.selectList = FILTER_RENT_PRICE
      }
    },
    priceMin() {
      if (this.priceMin !== null) this.range = [this.priceMin, this.priceMax]
      this.handleFormatRange()
    },
    priceMax() {
      if (this.priceMax !== null) this.range = [this.priceMin, this.priceMax]
      this.handleFormatRange()
    }
  },
  created() {
    if (this.$route.path === '/nha-dat-ban') {
      this.sliderMax = 60000
      this.sliderStep = 100
      this.range = [0, 60000]
      this.selectList = FILTER_SALE_PRICE
    }
    if (this.$route.path === '/nha-dat-cho-thue') {
      this.sliderMax = 100
      this.sliderStep = 0.5
      this.range = [0, 100]
      this.selectList = FILTER_RENT_PRICE
    }
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
    handleMinChange: function (e) {
      clearTimeout(this.timeoutMinId)
      this.timeoutMinId = setTimeout(() => {
        let val = e.target.value
        if (val < 0) val = 0
        if (val > this.maxRangeInput) val = this.maxRangeInput
        if (Number(this.priceMax) && val > Number(this.priceMax)) {
          let tmp = this.priceMax
          this.$store.dispatch('properties/maxPriceChange', val)
          val = tmp
        }
        this.$refs.minInput.value = val
        this.$store.dispatch('properties/minPriceChange', val)
        this.timeoutMinId = null
      }, 300)
    },
    handleMaxChange: function (e) {
      clearTimeout(this.timeoutMinId)
      this.timeoutMinId = setTimeout(() => {
        let val = e.target.value
        if (val < 0) val = 0
        if (val > this.maxRangeInput) val = this.maxRangeInput
        if (Number(this.priceMin) && val < Number(this.priceMin)) {
          let tmp = this.priceMin
          this.$store.dispatch('properties/minPriceChange', val)
          val = tmp
        }
        this.$refs.maxInput.value = val
        this.$store.dispatch('properties/maxPriceChange', val)
        this.timeoutMinId = null
      }, 300)
    },
    handleEnd: function (e) {
      this.$store.dispatch('properties/minPriceChange', e[0])
      this.$store.dispatch('properties/maxPriceChange', e[1])
    },
    handleFormatRange: function () {
      if (this.priceMin || this.priceMax) {
        if (this.priceMin && this.priceMax) {
          this.priceLabel = `${formatCurrency(this.priceMin * 1000000)} - ${formatCurrency(this.priceMax * 1000000)}`
        } else if (!this.priceMin) {
          this.priceLabel = `≤ ${formatCurrency(this.priceMax * 1000000)}`
        } else if (!this.priceMax) {
          this.priceLabel = `≥ ${formatCurrency(this.priceMin * 1000000)}`
        }
      } else this.priceLabel = 'Tất cả'
    },
    handleSelectRange: function (item) {
      this.$store.dispatch('properties/minPriceChange', item.min)
      this.$store.dispatch('properties/maxPriceChange', item.max)
      this.$store.dispatch('properties/submitFilter')
    },
    clearSelectPrice() {
      this.$store.dispatch('properties/minPriceChange', null)
      this.$store.dispatch('properties/maxPriceChange', null)
    },
    submitFilter() {
      this.$store.dispatch('properties/submitFilter')
      this.isActive = false
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.filter-price {
  position: relative;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.filter-price:hover {
  background: #F2F2F2;
}

.filter-price p {
  margin: 0;
}

.filter-price>:first-child {
  font-size: 12px;
  line-height: 16px;
  color: #2C2C2C;
  margin-bottom: 4px;
  flex-shrink: 0
}

.text-result {
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

.modal-header {
  padding: 16px 16px 12px 16px;
  border-bottom: 1px solid #f2f2f2;
}

.header-info {
  display: flex;
}

.input-info {
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2C;
  padding: 6px 16px;
  text-align: center;
  width: calc(50% - 16px);
  margin-bottom: 16px;
}

.ico {
  margin: 8px;
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

.select-list {
  padding: 8px 0px;
  max-height: calc(32px* 8 + 8px* 2);
  list-style: none;
  overflow: auto;
}

.select-list li {
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2C;
  padding: 6px 16px;
}

.select-list li:hover {
  background: #F2F2F2;
}

.selector-active {
  color: #74150F !important;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
