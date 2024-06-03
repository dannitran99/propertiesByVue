<template>
  <div class="filter-localtion" @click.self="onClickPopup" v-click-outside="handleClickOutside">
    <div class="title-dv" @click.self="onClickPopup">
      <p @click.self="onClickPopup">Khu vực & dự án</p>
      <icon-downtriangle @click.self="onClickPopup"/>
    </div>
    <p class="result-text" @click.self="onClickPopup">Toàn quốc</p>
    <div v-if="isActive" class="popup-modal">
      <div class="popup-content-wrapper">
        <div class="popup-content">
            <div class="selector" @click="selectProvince(true)">
                <p>Tỉnh/Thành</p>
                <icon-righttriangle />
            </div>
            <div class="selector" @click="selectProvince(false)">
                <p>Quận/Huyện</p>
                <icon-righttriangle />
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
                <input type="text" v-model="keyword" :placeholder="selectorProvince? 'Tìm Tỉnh/Thành phố':'Tìm Quận/Huyện'"/>
            </div>
            <ul v-if="selectorProvince" class="sub-selector-content">
                <li>Tất cả Tỉnh/Thành</li>
                <li v-for="item in cityItem" :key="item.id">
                    {{ item.name }}
                    <icon-righttriangle />
                </li>
            </ul>
        </div>
      </div>
    <div class="filter-footer">
      <button >
        <icon-cached/>
        <span>Đặt lại</span>
      </button>
      <button class="btn-confirm" >
        <icon-magnify/>
        <span>Tìm kiếm</span>
      </button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      isActiveSub: false,
      selectorProvince: false,
      keyword: ''
    }
  },
  computed: {
    cityItem: {
      get () {
        return this.$store.getters['common/city']
      }
    }
  },
  async created () {
    await this.$store.dispatch('common/getCity')
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
      this.isActiveSub = true
      this.selectorProvince = isProvince
    },
    handleCloseSubSelector (e) {
      e.stopPropagation()
      this.isActiveSub = false
    }
  }
}
</script>

<style scoped>
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
.sub-selector{
    position: absolute;
    top: 0;
    left: 0;
    width: 360px;
    background: #fff;
    overflow: auto;
    border-radius: 8px;
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
  .btn-confirm svg{
    filter: invert(99%) sepia(0%) saturate(7500%) hue-rotate(212deg) brightness(101%) contrast(101%);
  }
  .btn-confirm:hover{
    color: #fff !important;
    background: #FF837A !important;
    border: solid 1px #FF837A !important;
  }
</style>
