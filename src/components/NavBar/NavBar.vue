<template>
  <div class="navbar">
    <img :src="logo">
      <MenuItem v-for="item in menuList" v-bind:key='item.id'>
        {{ item }}
      </MenuItem>
  </div>
</template>

<script setup lang="ts">
  import MenuItem from './MenuItem/MenuItem.vue'
  import logo from '@/assets/logo.svg'
  const menuList = [
    {
      id:1,
      title:'Nhà đất bán',
      link:'/nha-dat-ban'
    },
    {
      id:2,
      title:'Nhà đất cho thuê',
      link:'/nha-dat-cho-thue'
    },
    {
      id:3,
      title:'Dự án',
      link:'/du-an'
    },
    {
      id:4,
      title:'Tin tức',
      link:'/tin-tuc'
    },
    {
      id:5,
      title:'Wiki BĐS',
      link:'/wiki-bds'
    },
    {
      id:6,
      title:'Phân tích đánh giá',
      link:'/phan-tich-danh-gia'
    },
    {
      id:7,
      title:'Danh bạ',
      link:'/danh-ba'
    }
  ]
</script>
  
<style scoped>
  img{
    width: 200px;
    height: 50px;
    /* object-fit: cover; */
  }
  .navbar{
    width: 100%;
    height: 100px;
    overflow: hidden;
    position: fixed; 
    top: 0;
    left: 0;
    padding: 10px 5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>