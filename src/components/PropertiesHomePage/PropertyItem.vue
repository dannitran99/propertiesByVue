<template>
  <router-link :to="{ name: 'PropertiesSaleDetail', params: { propertiesId: data.ID, } }" class="wrapper">
    <div class="thumbnail">
      <img v-bind:src="data.images[0].url" :alt="data.images[0].name" />
      <div class="img-holder">
        <icon-photo />
        <span><b>{{ data.images.length }}</b></span>
      </div>
    </div>
    <div class="card-content">
      <h3>{{ data.title }}</h3>
      <div class="info-txt">
        <p class="txt-ct">{{ formatCurrency }}</p>
        <p>·</p>
        <p class="txt-ct">{{ formatArea }}</p>
      </div>
      <div class="address-txt">
        <icon-mappoint />
        <span>{{ formatAddress }}</span>
      </div>
      <div class="time-txt">
        <p>{{ formatTimeCalendar }}</p>
        <div class="ico-heart">
          <icon-heart />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { formatCurrency, formatTimeCalendar } from '@/helpers/formater'
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    formatCurrency: function () {
      return this.data.price ? formatCurrency(this.data.price) : 'Giá thỏa thuận'
    },
    formatArea: function () {
      return `${this.data.area} m²`
    },
    formatTimeCalendar: function () {
      return `Đăng ${formatTimeCalendar(this.data.createdAt)}`
    },
    formatAddress: function () {
      return `${this.data.district}, ${this.data.city}`
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.wrapper {
  text-decoration: none;
  text-align: left;
  width: 262px;
  height: 318px;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 4px 6px 0px rgba(44, 44, 44, 0.04);
  border-radius: 4px;
  box-sizing: content-box;
  background: #fff;
  cursor: pointer;
}

p {
  margin: 0;
}

.wrapper:hover {
  box-shadow: 0px 4px 16px 0px rgba(44, 44, 44, 0.08);
}

.thumbnail {
  width: calc(100% + 1px);
  height: calc(100% - 142px - 12px - 16px);
  margin-left: -0.5px;
  margin-top: -0.5px;
  position: relative;
}

.thumbnail img {
  width: 100%;
  height: 100%;
}

.img-holder {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5px;
  bottom: 8px;
  right: 8px;
  z-index: 2;
}

.img-holder span {
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important
}

.card-content {
  margin: 12px 16px 12px 12px;
}

.card-content h3 {
  font-family: 'Lexend-Medium', sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: .2px;
  color: #2C2C2C;
  margin: 0;
}

.info-txt {
  margin-top: 4px;
  height: 26px;
  display: flex;
  gap: 8px;
  align-items: center;
  overflow: hidden;
}

.address-txt {
  margin-top: 4px;
  font-size: 14px;
  line-height: 20px;
  color: #505050;
  display: flex;
  gap: 5px;
  align-items: center;
}

.address-txt span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.txt-ct {
  font-size: 16px;
  line-height: 26px;
  font-weight: 600;
  color: #E03C31
}

.time-txt {
  margin-top: 16px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-txt p {
  font-size: 12px;
  line-height: 16px;
  color: #999;
}

.ico-heart {
  color: #2C2C2C;
  background: #fff;
  border: solid 1px #ccc;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
