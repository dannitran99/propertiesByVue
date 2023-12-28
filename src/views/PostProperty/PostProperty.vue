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
              :items="cityItem.map(item => item.name)"
              v-model="city"
              @change="onChangeCity"
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
              :items="districtItem.map(item => item.name)"
              v-model="district"
              @change="onChangeDistrict"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row class="row-pos">
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
              :items="wardItem.map(item => item.name)"
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
        <p class="txt-label">Dự án</p>
        <v-combobox
          placeholder="Chọn"
          dense
          outlined
          v-model="project"
        ></v-combobox>
        <p class="txt-label">Địa chỉ hiển thị trên tin đăng <span>*</span></p>
        <v-text-field
          placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ..."
          dense
          outlined
          v-model="moreInfo"
        ></v-text-field>
      </div>
      <div class="paper">
        <h2>Thông tin bài viết</h2>
        <p class="txt-label mt-4">Tiêu đề <span>*</span></p>
        <v-textarea
          placeholder="VD: Bán nhà riêng 50m2 chính chủ tại Cầu Giấy"
          dense
          outlined
          rows="2"
          no-resize
          v-model="title"
        ></v-textarea>
        <p class="txt-description">Tối thiểu 30 ký tự, tối đa 99 ký tự</p>
        <p class="txt-label">Mô tả <span>*</span></p>
        <v-textarea
          placeholder="Nhập mô tả chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học ... "
          dense
          outlined
          rows="6"
          no-resize
          v-model="description"
        ></v-textarea>
        <p class="txt-description">Tối thiểu 30 ký tự, tối đa 3.000 ký tự</p>
      </div>
      <div class="paper">
        <h2>Thông tin bất động sản</h2>
        <p class="txt-label mt-4">Diện tích <span>*</span></p>
        <v-text-field
          placeholder="Nhập diện tích, VD 80"
          dense
          outlined
          type="number"
          v-model="area"
          hide-spin-buttons
        ></v-text-field>
        <v-row class="row-pos">
          <v-col
            class="col-form"
            cols="12"
            sm="8"
          >
            <p class="txt-label">Mức giá <span>*</span></p>
            <v-text-field
              placeholder="Nhập giá, VD 12000000"
              dense
              outlined
              type="number"
              v-model="price"
              hide-spin-buttons
            ></v-text-field>
          </v-col>
          <v-col
            class="col-form"
            cols="12"
            sm="4"
          >
            <p class="txt-label">Đơn vị</p>
            <v-select
              dense
              outlined
              :items="priceTypeItem"
              v-model="priceType"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <div class="paper">
        <h2>Hình ảnh & Video</h2>
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
      project: '',
      moreInfo: '',
      title: '',
      description: '',
      area: '',
      price: '',
      priceType: 'VND',
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
      ],
      priceTypeItem: [
        'VND',
        'Giá / m²',
        'Thỏa thuận'
      ]
    }
  },
  computed: {
    cityItem: {
      get () {
        return this.$store.getters['common/city']
      }
    },
    districtItem: {
      get () {
        return this.$store.getters['common/district']
      }
    },
    wardItem: {
      get () {
        return this.$store.getters['common/ward']
      }
    }
  },
  async created () {
    await this.$store.dispatch('common/getCity')
  },
  methods: {
    onChangeType (typechange) {
      this.type = typechange
    },
    async onChangeCity (input) {
      this.district = ''
      this.ward = ''
      this.street = ''
      const code = this.cityItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getDistrict', code)
    },
    async onChangeDistrict (input) {
      this.ward = ''
      this.street = ''
      const code = this.districtItem.find(item => item.name === input).code
      await this.$store.dispatch('common/getWard', code)
    }
  }
}
</script>

<style scoped>
.content{
  display: flex;
}
.main-area{
  overflow: auto;
  height: calc(100vh - 72px) ;
  background-color: rgb(249, 249, 249);
  width: 100%;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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
  .txt-description{
    margin-top: -10px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: rgb(80, 80, 80);
  }
  .txt-label span{
    color: red;
  }
  .col-form{
    padding: 0 12px;
  }
  .row-pos{
    margin-top: 0;
  }
</style>
