<template>
    <div class="filter" v-on:click="onClickPopup">
        <div class="title-dv">
          <p>Loại nhà đất</p>
          <icon-downtriangle/>
        </div>
        <p class="result-text">Tất cả</p>
        <div v-if="isActive" class="popup-modal">
            <ul>
              <filter-item v-for="item in selectOption" v-bind:key="item.label" v-bind:data="item" />
            </ul>
        </div>
    </div>
</template>

<script>
import FilterItem from './FilterItem.vue'
export default {
  components: {
    'filter-item': FilterItem
  },
  data () {
    return {
      isActive: false,
      selectOption: [
        {label: 'Tất cả nhà đất'},
        {label: 'Căn hộ chung cư'},
        {label: 'Các loại nhà bán',
          subItem: [{
            label: 'Nhà riêng'
          },
          {
            label: 'Nhà biệt thự, liền kề'
          },
          {
            label: 'Nhà mặt phố'
          },
          {
            label: 'Shophouse, nhà phố thương mại'
          }
          ]},
        {label: 'Các loại đất bán',
          subItem: [{
            label: 'Đất nền dự án'
          },
          {
            label: 'Bán đất'
          }
          ]},
        {label: 'Trang trại, khu nghỉ dưỡng',
          subItem: [{
            label: 'Condotel'
          }
          ]},
        {label: 'Kho, nhà xưởng'},
        {label: 'Bất động sản khác'}
      ]
    }
  },
  methods: {
    onClickPopup () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped>
  ul{
    margin: 0;
    padding: 8px 0;
    margin-bottom: 0 !important ;
    max-height: 315px;
    overflow: auto;
  }
  .filter{
    position: relative;
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .filter:hover{
    background: #F2F2F2;
  }
  .filter p{
    margin: 0;
  }
  .filter >:first-child{
    font-size: 12px;
    line-height: 16px;
    color: #2C2C2C;
    margin-bottom: 4px;
    flex-shrink:0
  }
  .result-text{
    font-size: 14px;
    line-height: 20px;
    line-height: 20px;
    color: #2C2C2C;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title-dv{
    display: flex;
    gap: 5px;
  }
  .popup-modal{
    width: 300px;
    position: absolute;
    /* transform: translate(0, 50%); */
    top: 65px;
    left: 0px;
    z-index: 9;
    width: 280px;
    background: #fff;
    box-shadow: 0px 8px 20px rgba(182,182,182,0.42);
    border-radius: 8px;
  }
</style>
