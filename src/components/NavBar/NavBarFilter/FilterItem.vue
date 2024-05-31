<template>
  <li class="li-parent">
    <div class="li-item">
      <div class="label-icon" >
        <component :is="data.icon" />
        <span>{{ data.label }}</span>
      </div>
      <input type="checkbox" v-model="categoryFilter" :value="data.label" @change="handleChange"/>
    </div>
    <ul v-if="data.subItem">
        <li v-for="item in data.subItem" v-bind:key="item.label">
          <div class="li-item align-left">
            <span>{{ item.label }}</span>
            <input type="checkbox" v-model="categoryFilter" :value="item.label"  @change="() => handleChangeSub(item)" />
          </div>
        </li>
    </ul>
  </li>
</template>

<script>
import { removeElFromArr, checkArrHasElArr, cloneDeep } from '@/helpers/arrayHandler'
import {FILTER_LABEL, FILTER_ID} from '@/consts/label.js'
export default {
  props: {
    data: {
      type: Object
    },
    checkedNames: {
      type: Array
    }
  },
  computed: {
    categoryFilter: {
      get () {
        return this.$store.getters['properties/categoryFilter']
      },
      set () {
      }
    },
    categoryIdFilter: {
      get () {
        return this.$store.getters['properties/categoryIdFilter']
      }
    }
  },
  methods: {
    handleChange: function ($event) {
      let tmp = this.categoryFilter
      let tmpId = this.categoryIdFilter
      if (this.data.label === 'Tất cả nhà đất') {
        if (tmp.some((e) => e === 'Tất cả nhà đất')) {
          tmpId = []
          tmp = []
        } else {
          tmp = cloneDeep(FILTER_LABEL)
          tmpId = cloneDeep(FILTER_ID)
        }
      } else {
        if (tmp.some((e) => e === $event.target.value)) {
          removeElFromArr(tmp, $event.target.value)
          this.data.value && removeElFromArr(tmpId, this.data.value)
          this.data.subItem && this.data.subItem.map(el => {
            if (tmp.some((item) => item === el.label)) {
              removeElFromArr(tmp, el.label)
              removeElFromArr(tmpId, el.value)
            }
          })
        } else {
          tmp.push($event.target.value)
          this.data.value && tmpId.push(this.data.value)
          this.data.subItem && this.data.subItem.map(el => {
            if (!tmp.some((item) => item === el.label)) {
              tmp.push(el.label)
              tmpId.push(el.value)
            }
          })
        }
        tmp.length === FILTER_LABEL.length - 1 && !tmp.some((e) => e === 'Tất cả nhà đất') ? tmp.push('Tất cả nhà đất') : removeElFromArr(tmp, 'Tất cả nhà đất')
      }
      this.$store.dispatch('properties/filterChange', {data: tmp, filterId: tmpId})
    },
    handleChangeSub: function (item) {
      const tmp = this.categoryFilter
      const tmpId = this.categoryIdFilter
      tmp.some((e) => e === item.label) ? removeElFromArr(tmp, item.label) : tmp.push(item.label)
      tmpId.some((e) => e === item.value) ? removeElFromArr(tmpId, item.value) : tmpId.push(item.value)
      checkArrHasElArr(this.data.subItem && this.data.subItem.map(el => el.label), this.categoryFilter) ? tmp.push(this.data.label) : removeElFromArr(tmp, this.data.label)
      tmp.length === FILTER_LABEL.length - 1 && !tmp.some((e) => e === 'Tất cả nhà đất') ? tmp.push('Tất cả nhà đất') : removeElFromArr(tmp, 'Tất cả nhà đất')
      this.$store.dispatch('properties/filterChange', {data: tmp, filterId: tmpId})
    }
  }
}
</script>

<style scoped>
    li{
        padding: 6px 0;
        list-style-type: none;
        margin-bottom: 4px;
        font-size: 13px;
        line-height: 20px;
        color: #2C2C2C;
    }
    li:last-of-type{
      border-bottom: 0
    }
    ul{
      padding: 8px 0 0 0;
    }
    input{
      cursor: pointer;
      accent-color: #961b12
    }
    .li-item{
      height: 100%;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .li-item:hover {
      background: #F2F2F2;
    }
    .li-parent{
      border-bottom: 1px solid #F2F2F2;
    }
    .label-icon{
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .align-left{
      padding-left: 45px;
    }
</style>
