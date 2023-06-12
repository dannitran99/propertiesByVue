<template>
    <div class="filter" v-on:click.self="onClickPopup">
        <div class="title-dv" v-on:click.self="onClickPopup">
          <p v-on:click.self="onClickPopup">Loại nhà đất</p>
          <icon-downtriangle v-on:click.self="onClickPopup"/>
        </div>
        <p class="result-text" v-on:click.self="onClickPopup">Tất cả</p>
        <div v-if="isActive" class="popup-modal" >
          <ul>
            <filter-item v-for="item in selectOption" v-bind:key="item.label" v-bind:data="item" />
          </ul>
          <div class="filter-footer">
            <button>
              <icon-cached/>
              <span>Đặt lại</span>
            </button>
            <button class="btn-confirm">
              <icon-magnify/>
              <span>Tìm kiếm</span>
            </button>
          </div>
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
        { label: 'Tất cả nhà đất', icon: 'icon-house', value: false },
        { label: 'Căn hộ chung cư', icon: 'icon-building', value: false },
        {
          label: 'Các loại nhà bán',
          icon: 'icon-homeaccount',
          value: false,
          subItem: [
            {
              label: 'Nhà riêng', value: false
            },
            {
              label: 'Nhà biệt thự, liền kề', value: false
            },
            {
              label: 'Nhà mặt phố', value: false
            },
            {
              label: 'Shophouse, nhà phố thương mại', value: false
            }
          ]
        },
        {
          label: 'Các loại đất bán',
          icon: 'icon-pinmap',
          value: false,
          subItem: [
            {
              label: 'Đất nền dự án', value: false
            },
            {
              label: 'Bán đất', value: false
            }
          ]
        },
        {
          label: 'Trang trại, khu nghỉ dưỡng',
          icon: 'icon-condotel',
          value: false,
          subItem: [
            {
              label: 'Condotel', value: false
            }
          ]
        },
        { label: 'Kho, nhà xưởng', icon: 'icon-warehouse', value: false },
        { label: 'Bất động sản khác', icon: 'icon-housegroup', value: false }
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
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
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
  .filter:hover ::-webkit-scrollbar-thumb{
    background: #acacac;
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
  .filter-footer{
    border-top: 1px solid #F2F2F2;
    padding: 0.5px 0px;
    display: flex;
    justify-content: space-between;
  }
  .filter-footer button{
    margin: 7px;
    padding: 5px 11px;
    font-size: 14px;
    font-weight: 550;
    line-height: 20px;
    letter-spacing: -.2px;
    border: solid 1px rgba(0,0,0,0);
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .filter-footer button:hover{
    color: #2C2C2C;
    background: #FAFAFA;
    border: solid 1px #FAFAFA;
  }
  .btn-confirm{
    color: #fff !important;
    fill: #fff;
    background: #E03C31 !important;
    border: solid 1px #E03C31 !important;
  }
  .btn-confirm svg{
    filter: invert(99%) sepia(0%) saturate(7500%) hue-rotate(212deg) brightness(101%) contrast(101%);
  }
  .btn-confirm:hover{
    color: #fff !important;
    background: #FF837A !important;
    border: solid 1px #FF837A !important;
  }
</style>
