<template>
  <div class="wrapper-skeleton">
    <router-link :to="{name: this.$route.path.includes('nha-dat-ban') ?'PropertiesSaleDetail' : 'PropertiesRentDetail',params: {propertiesId: data.ID,}}" class="navigate-link" :class="[{'hide' : hideInfo}]"></router-link>
    <v-row class="img-gallery" no-gutters>
      <template v-if="data.images.length > 1">
        <v-col cols="8" >
          <img v-bind:src="data.images[0].url" :alt="data.images[0].name" class="img-1"/>
        </v-col>
        <v-col cols="4" >
          <v-row no-gutters class="grid-gallery" >
            <template v-if="data.images.length > 2">
              <v-col cols="12" >
                <img v-bind:src="data.images[1].url" :alt="data.images[1].name" class="img-0"/>
              </v-col>
              <template v-if="data.images.length > 3">
                <v-col cols="6" >
                  <img v-bind:src="data.images[2].url" :alt="data.images[2].name" class="img-0"/>
                </v-col>
                <v-col cols="6" >
                  <img v-bind:src="data.images[3].url" :alt="data.images[3].name" class="img-0"/>
                </v-col>
              </template>
              <template v-else>
                <v-col cols="12" >
                  <img v-bind:src="data.images[2].url" :alt="data.images[2].name" class="img-0"/>
                </v-col>
              </template>
            </template>
            <template v-else>
              <v-col cols="12" >
                <img v-bind:src="data.images[1].url" :alt="data.images[1].name" class="img-1"/>
              </v-col>
            </template>
          </v-row>
        </v-col>
      </template>
      <template v-else>
        <v-col cols="12" >
          <img v-bind:src="data.images[0].url" :alt="data.images[0].name" class="img-1"/>
        </v-col>
      </template>
    </v-row>
    <div class="article">
      <p class="card-title"><b>{{ data.title }}</b></p>
      <div class="info-txt">
        <p class="txt-ct">{{ formatCurrency }}<span v-if="data.type==='rent'">/tháng</span></p>
        <p>·</p>
        <p class="txt-ct">{{ formatArea }}</p>
        <p>·</p>
        <p>{{ formatAddress }}</p>
      </div>
      <p class="txt-description">{{ data.description }}</p>
    </div>
    <v-divider></v-divider>
    <div class="info-div" v-if="!hideInfo">
      <div class="info-user">
        <img :src="data.avatar" alt="avatar"  class="avatar-img" v-if="data.avatar">
        <v-avatar color="rgb(255, 236, 235)" size="32" v-else>
          <span class="text-h6 avt-text">{{ data.name.split(' ').reverse()[0][0].toUpperCase() }}</span>
        </v-avatar>
        <div class="user-div">
          <p class="user-name">{{ data.name }}</p>
          <p class="post-create">{{ formatTimeCalendar }}</p>
        </div>
      </div>
      <div class="info-addition" >
        <button class="btn-reveal" @click="handleReveal">
          <icon-phone/>{{ phoneReveal? data.phoneNumber : phoneNumber }}
        </button>
        <div class="ico-heart">
          <icon-heart/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {formatCurrency, formatTimeCalendar} from '@/helpers/formater'
export default {
  props: {
    data: {
      type: Object
    },
    hideInfo: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      phoneReveal: false
    }
  },
  computed: {
    formatCurrency: function () {
      return formatCurrency(this.data.price)
    },
    formatArea: function () {
      return `${this.data.area} m²`
    },
    formatTimeCalendar: function () {
      return `Đăng ${formatTimeCalendar(this.data.createdAt)}`
    },
    formatAddress: function () {
      return `${this.data.district}, ${this.data.city}`
    },
    phoneNumber: function () {
      return `${this.data.phoneNumber.slice(0, -3)}*** Hiện số`
    }
  },
  methods: {
    handleReveal: function () {
      this.phoneReveal = true
    }
  }
}
</script>

<style scoped>
.wrapper-skeleton{
  position: relative;
  border: 1px solid #F2F2F2;
  border-radius: 10px;
  cursor: pointer;
}
.wrapper-skeleton:hover{
  box-shadow: 0px 4px 16px 0px rgba(44, 44, 44, 0.08);
}
.img-gallery >*{
    padding: 2px !important;
}
.img-1{
  height: 200px;
}
.img-0{
  height: 98px;
}
.img-gallery img{
  width: 100%;
  object-fit: cover;
}
.grid-gallery >:first-child{
  padding-bottom: 2px !important;
}
.grid-gallery >:nth-child(2){
  padding: 2px 2px 0 0;
}
.grid-gallery >:nth-child(3){
  padding: 2px 0 0 2px;
}
.article{
  padding: 0 16px;
}
.card-title{
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  letter-spacing: -.2px;
  color: #2C2C2C;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.info-txt{
  display: flex;
  gap: 8px;
  align-items: center;
  overflow: hidden;
}
.info-txt p{
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 26px;
}
.txt-ct{
  font-weight: 600;
  color: #E03C31
}
.txt-description{
  font-size: 14px;
  line-height: 20px;
  color: #505050;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.avt-text{
  font-weight: 500;
  color: rgb(116, 21, 15);
}

.avatar-img{
  border-radius: 100%;
  width: 32px;
  height: 32px;
  object-fit: cover;
}
.info-div{
  padding: 16px;
  display: flex;
  justify-content: space-between;
}
.info-user{
  display: flex;
  gap: 12px;
  align-items: center;
}
.user-div p{
  height: 16px;
  font-size: 12px;
  line-height: 16px;
}
.user-name{
  font-weight: 600;
  color: #2C2C2C;
  margin-bottom: 0;
}
.post-create{
  color: #999;
  margin-bottom: 0;
}
.navigate-link{
  position: absolute;
  width:100%;
  height: calc(100% - 64px);
  top: 0;
}
.info-addition{
  display: flex;
  gap: 10px;
}
.btn-reveal{
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  background: #009BA1;
  font-size: 14px;
  line-height: 20px;
  padding: 5px 11px;
  border-radius: 4px;
}
.ico-heart{
  color: #2C2C2C;
  background: #fff;
  border: solid 1px #ccc;
  border-radius: 4px;
  width:32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hide{
  height: 100%;
}
</style>
