<template>
  <div class="nav-wrapper">
    <ul class="menu-list">
      <nav-bar-button v-for="item in menu" v-bind:key="item.label" v-bind:label="item.label" v-bind:href="item.href" v-bind:submenu="item.sub" v-bind:path="item.path"/>
    </ul>
    <div v-if="isSale || isRent" class="search-nav">
      <div class="btn-tab">
        <router-link :to="{name: 'PropertiesForSale'}" :class="[{'active' : isSale}]">
          Bán
        </router-link>
        <router-link :to="{name: 'PropertiesForRent'}" :class="[{'active' : isRent}]">
          Cho thuê
        </router-link>
      </div>
      <div class="input-search">
        <icon-magnify/>
        <input/>
      </div>
      <div class="divider"></div>
      <div class="filter wide">
        <div class="title-dv">
          <p>Loại nhà đất</p>
          <icon-downtriangle/>
        </div>
        <p>Tất cả</p>
      </div>
      <div class="divider"></div>
      <div class="filter wide">
        <div class="title-dv">
          <p>Khu vực & dự án</p>
          <icon-downtriangle/>
        </div>
        <p>Toàn quốc</p>
      </div>
      <div class="divider"></div>
      <div class="filter normal">
        <div class="title-dv">
          <p>Khu vực & dự án</p>
          <icon-downtriangle/>
        </div>
        <p>Toàn quốc</p>
      </div>
      <div class="divider"></div>
      <div class="filter normal">
        <div class="title-dv">
          <p>Khu vực & dự án</p>
          <icon-downtriangle/>
        </div>
        <p>Toàn quốc</p>
      </div>
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
import NavBarButton from './NavBarButton'
export default {
  name: 'NavBar',
  components: {
    'nav-bar-button': NavBarButton
  },
  data () {
    return {
      isSale: false,
      isRent: false,
      menu: [
        {
          label: 'Nhà đất bán',
          href: 'PropertiesForSale',
          path: 'nha-dat-ban',
          sub: [
            { label: 'Bán căn hộ chung cư' },
            { label: 'Bán nhà riêng' },
            { label: 'Bán nhà biệt thự, liền kề' },
            { label: 'Bán nhà mặt phố' },
            { label: 'Bán shophouse, nhà phố thương mại' },
            { label: 'Bán đất nền dự án' },
            { label: 'Bán đất' },
            { label: 'Bán trang trại, khu nghỉ dưỡng' },
            { label: 'Bán condotel' },
            { label: 'Bán kho, nhà xưởng' },
            { label: 'Bán loại bất động sản khác' }
          ]
        },
        {
          label: 'Nhà đất cho thuê',
          href: 'PropertiesForRent',
          path: 'nha-dat-cho-thue',
          sub: [
            { label: 'Cho thuê căn hộ chung cư' },
            { label: 'Cho thuê nhà riêng' },
            { label: 'Cho thuê nhà biệt thự, liền kề' },
            { label: 'Cho thuê nhà mặt phố' },
            { label: 'Cho thuê shophouse, nhà phố thương mại' },
            { label: 'Cho thuê nhà trọ, phòng trọ' },
            { label: 'Cho thuê văn phòng' },
            { label: 'Cho thuê, sang nhượng cửa hàng, ki ốt' },
            { label: 'Cho thuê kho, nhà xưởng, đất' },
            { label: 'Cho thuê loại bất động sản khác' }
          ]
        },
        {
          label: 'Dự án',
          sub: [
            { label: 'Căn hộ chung cư' },
            { label: 'Cao ốc văn phòng' },
            { label: 'Trung tâm thương mại' },
            { label: 'Khu đô thị mới' },
            { label: 'Khu phức hợp' },
            { label: 'Nhà ở xã hội' },
            { label: 'Khu nghỉ dưỡng, Sinh thái' },
            { label: 'Khu công nghiệp' },
            { label: 'Biệt thự, liền kề' },
            { label: 'Shophouse' },
            { label: 'Nhà mặt phố' },
            { label: 'Dự án khác' }
          ]
        },
        { label: 'Tin tức',
          href: 'News',
          path: 'tin-tuc'
        },
        {
          label: 'Wiki BĐS',
          sub: [
            { label: 'Mua BĐS' },
            { label: 'Bán BĐS' },
            { label: 'Thuê BĐS' },
            { label: 'Tài chính BĐS' },
            { label: 'Quy hoạch - Pháp lý' },
            { label: 'Nội - Ngoại thất' },
            { label: 'Phong thuỷ' }
          ]
        },
        {
          label: 'Phân tích đánh giá',
          sub: [
            { label: 'Biểu đồ giá' },
            { label: 'Video đánh giá' },
            { label: 'Báo cáo thị trường' },
            { label: 'Góc nhìn chuyên gia' },
            { label: 'Interaktive Story' }
          ]
        },
        {
          label: 'Danh bạ',
          sub: [{ label: 'Nhà môi giới' }, { label: 'Doanh nghiệp' }]
        }
      ]
    }
  },
  watch: {
    '$route' () {
      this.isSale = this.$route.path.includes('nha-dat-ban')
      this.isRent = this.$route.path.includes('nha-dat-cho-thue')
    }
  }
}
</script>

<style scoped>
  .menu-list{
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 62px;
    padding: 17px 15px;

    background-color: #fff;
    margin: 0 auto;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .nav-wrapper{
    box-shadow: 0 4px 10px hsla(0,0%,71%,.18);
  }
  .search-nav{
    border-top: 1px solid #F2F2F2;
    height: 57px;
    display: flex;
  }
  .btn-tab{
    margin: 12px 16px;
    width: 160px;
    display: flex;
  }
  .btn-tab a{
    height: 32px;
    width: 80px;
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
  .input-search{
    width: calc((100% - 108px - 108px - 16px - 159px - 16px - 16px - 16px) * 0.3) !important;
    margin: 12px 16px 12px 0;
    background: #F2F2F2;
    border-radius: 4px;
    display: flex;
    padding: 0 15px;
    align-items: center;
    gap: 15px;
  }
  .input-search input{
    background: #F2F2F2;
    border: none;
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    outline: none;
    width:100%;
  }
  .divider{
    background: #f2f2f2;
    width: 1px;
    height: 32px;
    margin: 12px 0px;
  }
  .filter{
    padding: 8px 16px;
    cursor: pointer;
  }
  .wide{
    width: calc((100% - 108px - 108px - 16px - 159px - 16px - 16px - 16px) * 0.2) !important;
  }
  .normal{
     width: calc((100% - 108px - 108px - 16px - 159px - 16px - 16px - 16px) * 0.15) !important;
  }
  .filter:hover{
    background: #F2F2F2;
  }
  .filter p{
    margin: 0;
  }
  .filter :first-child{
    font-size: 12px;
    line-height: 16px;
    color: #2C2C2C;
    margin-bottom: 4px;
    flex-shrink:0
  }
  .filter :last-child{
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
</style>
