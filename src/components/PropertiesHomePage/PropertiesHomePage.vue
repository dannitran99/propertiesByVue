<template>
  <div>
    <div class="title">
        <h2><b>Bất động sản dành cho bạn</b></h2>
        <div class="redirect-title">
            <router-link :to="{name: 'PropertiesForSale'}">
              <p class="clickable-text">Tin nhà đất bán mới nhất</p>
            </router-link>
            <p>|</p>
            <router-link :to="{name: 'PropertiesForRent'}">
              <p class="clickable-text">Tin nhà đất cho thuê mới nhất</p>
            </router-link>
        </div>
    </div>
    <div class="item-list">
        <property-item v-for="item in properties" v-bind:key="item.ID" v-bind:data="item"/>
    </div>
    <div class="foot-btn">
      <button>Mở rộng</button>
    </div>
  </div>
</template>

<script>
import PropertyItem from './PropertyItem.vue'
export default {
  components: {
    'property-item': PropertyItem
  },
  computed: {
    properties: {
      get () {
        return this.$store.getters['properties/propertiesList']
      }
    }
  },
  async created () {
    await this.$store.dispatch('properties/getPropertiesList', {type: 'sale'})
  }
}
</script>

<style scoped>
  h2{
    font-size: 24px;
    line-height: 32px;
    font-weight: normal !important;
    letter-spacing: -.2px;
    color: #2C2C2C;
    display: block;
    margin: 0;
  }
  p{
    color: #2C2C2C;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important;
  }
  .title{
    height: 32px;
    display: flex;
    justify-content: space-between;
    margin: 0 0 24px 0;
  }
  .redirect-title{
    display: flex;
    gap: 10px;
  }
  .clickable-text:hover {
    cursor: pointer;
    color: #999
  }
  .foot-btn{
    height: 48px;
    margin-top: 24px;
    display: flex;
    justify-content: center;
  }
  .item-list{
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
  }
  .foot-btn button{
    width: 160px;
    color: #2C2C2C;
    background: #fff;
    border: solid 1px #ccc;
    padding: 13px 15px;
    border-radius: 8px;
    cursor: pointer;
  }
  .foot-btn button:hover{
    color: #2C2C2C;
    background: #FAFAFA;
    border: solid 1px #ccc;
  }
</style>
