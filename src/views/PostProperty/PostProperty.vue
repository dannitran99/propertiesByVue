<template>
  <div class="content">
    <side-bar/>
    <div class="main-area">
      <div class="paper">
        <h2>Thông tin cơ bản</h2>
        <div class="btn-tab">
          <div :class="{'active' : type === 'sale'}" @click="onChangeType('sale')" >
            Bán
          </div>
          <div :class="{'active' :  type === 'rent'}" @click="onChangeType('rent')" >
            Cho thuê
          </div>
        </div>
        <p class="txt-label">Loại bất động sản <span>*</span></p>
        <v-select
          placeholder="VD: Nhà riêng"
          dense
          outlined
          :items="saleItem"
          v-model="propertyType"
        ></v-select>
        <v-row >
          <v-col
            class="col-form"
            cols="12"
            sm="6"
          >
            <p class="txt-label">Tỉnh, thành phố <span>*</span></p>
            <v-combobox
              placeholder="Chọn"
              dense
              outlined
              v-model="city"
            ></v-combobox>
          </v-col>
          <v-col
            class="col-form"
            cols="12"
            sm="6"
          >
            <p class="txt-label">Quận, huyện <span>*</span></p>
            <v-combobox
              placeholder="Chọn"
              dense
              outlined
              v-model="district"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row >
          <v-col
            class="col-form"
            cols="12"
            sm="6"
          >
            <p class="txt-label">Phường, xã <span>*</span></p>
            <v-combobox
              placeholder="Chọn"
              dense
              outlined
              v-model="ward"
            ></v-combobox>
          </v-col>
          <v-col
            class="col-form"
            cols="12"
            sm="6"
          >
            <p class="txt-label">Đường, phố</p>
            <v-combobox
              placeholder="Chọn"
              dense
              outlined
              v-model="street"
            ></v-combobox>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../../components/SideBar'
export default {
  components: { SideBar },
  data () {
    return {
      type: 'sale',
      propertyType: '',
      city: '',
      district: '',
      ward: '',
      street: '',
      saleItem: [
        'Bán căn hộ chung cư',
        'Bán nhà riêng',
        'Bán nhà biệt thự, liền kề',
        'Bán nhà mặt phố',
        'Bán shophouse, nhà phố thương mại',
        'Bán đất nền dự án',
        'Bán đất',
        'Bán trang trại, khu nghỉ dưỡng',
        'Bán condotel',
        'Bán kho, nhà xưởng',
        'Bán loại bất động sản khác'
      ]
    }
  },
  methods: {
    onChangeType (typechange) {
      this.type = typechange
    }
  }
}
</script>

<style scoped>
.content{
  display: flex;
}
.main-area{
  background-color: rgb(249, 249, 249);
  width: 100%;
  padding-top: 24px;
  display: flex;
  justify-content: center;
}
.paper{
  width: 696px;
  padding: 24px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px;
  border-radius: 4px;
}
.btn-tab{
    margin-top: 16px;
    margin-bottom: 24px;
    width: 100%;
    display: flex;
  }
  .btn-tab div{
    height: 32px;
    width: 50%;
    color: #999;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn-tab :first-child{
    margin-right: -1px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .btn-tab :last-child{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .active{
    color: #fff !important;
    background: #505050 !important;
    border-color: #505050 !important;
  }

  .txt-label{
    margin-bottom: 8px;
    color: rgb(44, 44, 44);
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
  }
  .txt-label span{
    color: red;
  }
  .col-form{
    padding: 0 12px;
  }
</style>
