<template>
  <div v-click-outside="handleClickOutside">
    <div :class="[{ 'filter-price': !isHome }, { 'filter-home-price': isHome }]" v-on:click.self="onClickPopup">
      <template v-if="isHome">
        <p class="home-text-result" @click.self="onClickPopup">{{ squareLabel }}</p>
        <icon-downtriangle @click.self="onClickPopup" />
      </template>
      <template v-else>
        <div class="title-dv" v-on:click.self="onClickPopup">
          <p v-on:click.self="onClickPopup">Diện tích</p>
          <icon-downtriangle v-on:click.self="onClickPopup" />
        </div>
        <p v-on:click.self="onClickPopup" class="text-result">{{ squareLabel }}</p>
      </template>
    </div>
    <div class="popup-wrapper">
      <div v-if="isActive" class="popup-modal">
        <div class="modal-header">
          <div class="header-info">
            <input class="input-info" autocomplete="off" placeholder="Từ" min="0" :max="maxRangeInput"
              :value="squareMin" @input="handleMinChange" ref="minInputS" type="number" />
            <icon-rightarrowsc class="ico" />
            <input class="input-info" autocomplete="off" placeholder="Đến" min="0" :max="maxRangeInput"
              :value="squareMax" @input="handleMaxChange" ref="maxInputS" type="number" />
          </div>
          <v-range-slider v-model="range" :max="500" :min="0" :step="5" class="align-center" hide-details
            color="#009ba1" track-color="#F2F2F2" @end="handleEnd">
          </v-range-slider>
        </div>
        <ul class="select-list">
          <li v-for="item in listFilter" :key="item.label" @click="() => handleSelectRange(item)"
            :class="[{ 'selector-active': item.min === squareMin && item.max === squareMax }]">
            {{ item.label }}
          </li>
        </ul>
        <div class="filter-footer">
          <button @click="clearSelectSquare">
            <icon-cached />
            <span>Đặt lại</span>
          </button>
          <button class="btn-confirm" @click="submitFilter">
            <icon-magnify v-if="!isHome" />
            <span>{{ isHome ? 'Áp dụng' : 'Tìm kiếm' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FILTER_SQUARE } from '@/consts/squareFilter.js'
export default {
  props: {
    isHome: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      isActive: false,
      maxRangeInput: 999999,
      range: [0, 500],
      timeoutMinId: null,
      timeoutMaxId: null,
      squareLabel: this.isHome ? 'Diện tích' : 'Tất cả',
      listFilter: FILTER_SQUARE
    }
  },
  computed: {
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
    squareMin() {
      if (this.squareMin !== null) this.range = [this.squareMin, this.squareMax]
      this.handleFormatRange()
    },
    squareMax() {
      if (this.squareMax !== null) this.range = [this.squareMin, this.squareMax]
      this.handleFormatRange()
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
        if (Number(this.squareMax) && val > Number(this.squareMax)) {
          let tmp = this.squareMax
          this.$store.dispatch('properties/maxSquareChange', val)
          val = tmp
        }
        this.$refs.minInputS.value = val
        this.$store.dispatch('properties/minSquareChange', val)
        this.timeoutMinId = null
      }, 300)
    },
    handleMaxChange: function (e) {
      clearTimeout(this.timeoutMinId)
      this.timeoutMinId = setTimeout(() => {
        let val = e.target.value
        if (val < 0) val = 0
        if (val > this.maxRangeInput) val = this.maxRangeInput
        if (Number(this.squareMin) && val < Number(this.squareMin)) {
          let tmp = this.squareMin
          this.$store.dispatch('properties/minSquareChange', val)
          val = tmp
        }
        this.$refs.maxInputS.value = val
        this.$store.dispatch('properties/maxSquareChange', val)
        this.timeoutMinId = null
      }, 300)
    },
    handleEnd: function (e) {
      this.$store.dispatch('properties/minSquareChange', e[0])
      this.$store.dispatch('properties/maxSquareChange', e[1])
    },
    handleFormatRange: function () {
      if (this.squareMin || this.squareMax) {
        if (this.squareMin && this.squareMax) {
          this.squareLabel = `${this.squareMin} - ${this.squareMax} m²`
        } else if (!this.squareMin) {
          this.squareLabel = `≤ ${this.squareMax} m²`
        } else if (!this.squareMax) {
          this.squareLabel = `≥ ${this.squareMin} m²`
        }
      } else this.squareLabel = this.isHome ? 'Diện tích' : 'Tất cả'
    },
    handleSelectRange: function (item) {
      this.$store.dispatch('properties/minSquareChange', item.min)
      this.$store.dispatch('properties/maxSquareChange', item.max)
      !this.isHome && this.$store.dispatch('properties/submitFilter')
    },
    clearSelectSquare() {
      this.$store.dispatch('properties/minSquareChange', null)
      this.$store.dispatch('properties/maxSquareChange', null)
    },
    submitFilter() {
      !this.isHome && this.$store.dispatch('properties/submitFilter')
      this.isActive = false
    }
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.popup-wrapper {
  cursor: pointer;
  position: relative;
}

.filter-price {
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

  p {
    flex-shrink: 0;
  }
}

.filter-home-price {
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

.filter-home-price p {
  margin: 0;
}

.filter-home-price>svg {
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

.popup-modal {
  position: absolute;
  top: 8px;
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
