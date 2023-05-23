<template>
  <ul class="menu-list">
    <nav-bar-button v-for="item in menu" v-bind:key="item.label" v-bind:label="item.label" v-bind:submenu="item.sub"/>
  </ul>
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
      menu: [
        {
          label: 'Nhà đất bán',
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
        { label: 'Tin tức' },
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
    box-shadow: 0 4px 10px hsla(0,0%,71%,.18);
    background-color: #fff;
    margin: 0 auto;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
</style>
