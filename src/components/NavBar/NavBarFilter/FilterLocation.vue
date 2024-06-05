<template>
  <div class="filter-localtion" @click.self="onClickPopup" v-click-outside="handleClickOutside">
    <div class="title-dv" @click.self="onClickPopup">
      <p @click.self="onClickPopup">Khu vực & dự án</p>
      <icon-downtriangle @click.self="onClickPopup"/>
    </div>
    <p class="result-text" @click.self="onClickPopup">{{citySelected||'Toàn quốc'}}</p>
    <div v-if="isActive" class="popup-modal">
      <div class="popup-content-wrapper">
        <div class="popup-content">
            <div class="selector" :class="[{'selector-selected' : citySelected}]" @click="selectProvince(true)">
                <div class="selector-title">
                  <p :class="[{'selector-selected-title' : citySelected}]">Tỉnh/Thành</p>
                  <p v-if="citySelected" class="selector-selected-detail">{{ citySelected }} </p>
                </div>
                <icon-righttriangle v-if="!citySelected"/>
                <button v-else @click="clearSelectCity">
                  <icon-closewb />
                </button>
            </div>
            <div class="selector" @click="selectProvince(false)" :class="[{'disable-selector' : !citySelected},{'selector-selected' : districtSelected.length}]">
              <div class="selector-title">
                <p :class="[{'selector-selected-title' : districtSelected.length}]">Quận/Huyện</p>
                <p v-if="districtSelected.length" class="selector-selected-detail">{{ districtSelected.join(',') }} </p>
              </div>
              <icon-righttriangle v-if="!districtSelected.length"/>
              <button v-else @click="clearSelectDistrict">
                <icon-closewb />
              </button>
            </div>
        </div>
        <div class="sub-selector" v-if="isActiveSub">
          <div class="sub-selector-header">
            <button @click="handleCloseSubSelector">
              <icon-leftarrow/>
            </button>
            <p>Chọn {{ selectorProvince? 'Tỉnh/Thành':'Quận/Huyện' }}</p>
          </div>
          <div class="sub-selector-search">
            <icon-magnify/>
            <input v-if="selectorProvince" type="text" v-model="keywordCity" placeholder="Tìm Tỉnh/Thành phố"/>
            <input v-else type="text" v-model="keywordWard" placeholder="Tìm Quận/Huyện"/>
          </div>
          <ul v-if="selectorProvince" class="sub-selector-content">
            <li @click="clearSelectCity" :class="[{'selector-active' : citySelected === ''}]">Tất cả Tỉnh/Thành</li>
            <li v-for="item in cityList" :key="item.id" @click="(e)=>handleSelectCity(e, item)" :class="[{'selector-active' : citySelected === item.name}]">
              {{ item.name }}
              <icon-righttriangle />
            </li>
          </ul>
          <template v-else>
            <ul class="sub-selector-content district-selector">
              <li v-for="item in districtList" :key="item.id" @click="(e)=>handleSelectDistrict(e, item)" :class="[{'selector-active' : districtSelected.includes(item.name)}]">
                {{ item.name }}
                <input type="checkbox" v-model="districtSelected" :value="item.name"/>
              </li>
            </ul>
            <div class="filter-footer">
              <button @click="clearSelectDistrict">
                <icon-cached/>
                <span>Đặt lại</span>
              </button>
              <button class="outlined-btn" @click="handleCloseSubSelector">
                <span>Áp dụng {{ districtSelected.length ? ` ・ ${districtSelected.length} lựa chọn` :''}}</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    <div class="filter-footer">
      <button @click="clearSelectCity">
        <icon-cached/>
        <span>Đặt lại</span>
      </button>
      <button class="btn-confirm" @click="submitFilter">
        <icon-magnify/>
        <span>Tìm kiếm</span>
      </button>
    </div>
    </div>
  </div>
</template>

<script>
import { removeElFromArr } from '@/helpers/arrayHandler'
export default {
  data () {
    return {
      isActive: false,
      isActiveSub: false,
      selectorProvince: false,
      keywordCity: '',
      keywordWard: '',
      cityList: [],
      districtList: []
    }
  },
  computed: {
    citySelected: {
      get () {
        return this.$store.getters['properties/citySelected']
      }
    },
    districtSelected: {
      get () {
        return this.$store.getters['properties/districtSelected']
      }
    },
    cityItem: {
      get () {
        return this.$store.getters['common/city']
      }
    },
    districtItem: {
      get () {
        return this.$store.getters['common/district']
      }
    }
  },
  async created () {
    await this.$store.dispatch('common/getCity')
    this.cityList = this.cityItem
  },
  watch: {
    keywordCity () {
      this.cityList = this.cityItem.filter(item => item.name.toUpperCase().indexOf(this.keywordCity.toUpperCase()) > -1)
    },
    keywordWard () {
      this.districtList = this.districtItem.filter(item => item.name.toUpperCase().indexOf(this.keywordWard.toUpperCase()) > -1)
    },
    async citySelected () {
      if (this.citySelected !== '') {
        if (this.cityItem) await this.$store.dispatch('common/getCity')
        const code = await this.cityItem.find(item => item.name === this.citySelected).code
        await this.$store.dispatch('common/getDistrict', code)
        this.districtList = this.districtItem
      } else this.districtList = []
    }
  },
  methods: {
    handleClickOutside () {
      if (this.isActive) {
        this.isActive = false
        this.isActiveSub = false
      }
    },
    onClickPopup () {
      this.isActive = !this.isActive
      if (!this.isActive) {
        this.isActiveSub = false
      }
    },
    selectProvince (isProvince) {
      this.selectorProvince = isProvince
      if (isProvince || this.citySelected) {
        this.isActiveSub = true
      }
    },
    handleCloseSubSelector (e) {
      e.stopPropagation()
      this.isActiveSub = false
    },
    clearSelectCity (e) {
      e.stopPropagation()
      this.isActiveSub = false
      this.$store.dispatch('properties/setFilterCity', '')
      this.$store.dispatch('properties/setFilterDistrict', [])
    },
    clearSelectDistrict (e) {
      e.stopPropagation()
      this.$store.dispatch('properties/setFilterDistrict', [])
    },
    async handleSelectCity (e, item) {
      e.stopPropagation()
      this.isActiveSub = false
      this.$store.dispatch('properties/setFilterCity', item.name)
      this.$store.dispatch('properties/setFilterDistrict', [])
    },
    handleSelectDistrict (e, item) {
      e.stopPropagation()
      let tmp = this.districtSelected
      tmp.some((e) => e === item.name)
        ? removeElFromArr(tmp, item.name)
        : tmp.length < 3 && tmp.push(item.name)
      this.$store.dispatch('properties/setFilterDistrict', tmp)
    },
    submitFilter () {
      this.$store.dispatch('properties/submitFilter')
      this.isActive = false
    }
  }
}
</script>

<style scoped>
input{
  cursor: pointer;
  accent-color: #961b12
}
.filter-localtion{
    position: relative;
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.filter-localtion:hover{
    background: #F2F2F2;
}
.filter-localtion p{
    margin: 0;
}
.filter-localtion >:first-child{
    font-size: 12px;
    line-height: 16px;
    color: #2C2C2C;
    margin-bottom: 4px;
    flex-shrink:0
}
.result-text{
    font-size: 14px;
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
    position: absolute;
    top: 65px;
    left: 0px;
    z-index: 9;
    width: 360px;
    background: #fff;
    box-shadow: 0px 8px 20px rgba(182,182,182,0.42);
    border-radius: 8px;
}
.popup-content-wrapper{
    position: relative;
}
.popup-content{
    padding: 16px;
}
.popup-content >:not(:last-child){
    margin-bottom: 12px;
}
.selector{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important;
    padding: 13px 15px;
    color: #2C2C2C;
}
.selector button{
  widows: 16px;
  height: 16px;
}
.selector-active{
  color: #74150F !important;
}
.selector-selected{
  padding: 0 15px 0 0;
}
.selector-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.selector-selected-title{
  font-size: 12px;
  line-height: 16px;
  color: #999;
  padding: 5px 15px 0px 15px;
}
.selector-selected-detail{
  width: 300px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #2C2C2C;
  padding: 0px 35px 5px 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.disable-selector{
  cursor: url('../../../assets/cursor-block.svg'),auto;
}
.district-selector{
  height: calc(32px* 8) !important;
}
.sub-selector{
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 360px;
    background: #fff;
    overflow: auto;
    border-radius: 8px;
    box-shadow: 0px 8px 20px rgba(182,182,182,0.42);
}
.sub-selector-header{
    display: flex;
    align-items: center;
    text-align: center;
    padding: 16px;
    font-size: 14px;
    line-height: 20px;
}
.sub-selector-header >button{
    width: 24px;
    height: 24px;
}
.sub-selector-header p{
    flex-grow: 1;
}
.sub-selector-search{
    margin: 0px 16px 8px 16px;
    background: #F2F2F2;
    border-radius: 4px;
    display: flex;
    padding: 6px 15px;
    align-items: center;
    gap: 15px;
}
.sub-selector-search input{
    background: #F2F2F2;
    border: none;
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    outline: none;
    width:100%;
}
.sub-selector-content{
    height: calc(32px* 9 + 16px);
    list-style: none;
    overflow: auto;
    padding: 0;
}
.sub-selector-content li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 16px;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal !important;
    color: #2C2C2C;
}
.sub-selector-content li:hover{
    background: #F2F2F2;
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
  .outlined-btn{
    border: solid 1px #E03C31 !important;
    background: #fff !important;
    color: #E03C31 !important;
  }
  .outlined-btn:hover{
    background: #FFECEB !important;
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
