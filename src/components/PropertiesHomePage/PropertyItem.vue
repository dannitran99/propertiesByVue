<template>
  <router-link
    :to="{ name: data.type === 'sale' ? 'PropertiesSaleDetail' : 'PropertiesRentDetail', params: { propertiesId: data.ID, } }"
    class="wrapper-item-property" :class="[{ 'row-wrapper': row }, { 'small-wrapper': small }]">
    <div class="thumbnail" :class="[{ 'row-thumbnail': row }]">
      <img v-bind:src="data.images[0].url" :alt="data.images[0].name" />
      <div class="img-holder">
        <icon-photo />
        <span><b>{{ data.images.length }}</b></span>
      </div>
    </div>
    <div class="card-content" :class="[{ 'row-content': row }]">
      <h3>{{ data.title }}</h3>
      <div class="info-txt" :class="[{ 'row-info': row }]">
        <p class="txt-ct">{{ formatCurrency }}</p>
        <p>·</p>
        <p class="txt-ct">{{ formatArea }}</p>
      </div>
      <div class="address-txt" :class="[{ 'row-info': row }]">
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
    },
    row: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
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

.wrapper-item-property {
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
  -webkit-user-drag: none;
}

.row-wrapper {
  display: flex;
  width: 100%;
  height: 188px;
  margin-bottom: 16px;
}

.small-wrapper {
  width: 218px;
  height: 293px;
}

p {
  margin: 0;
}

.wrapper-item-property:hover {
  box-shadow: 0px 4px 16px 0px rgba(44, 44, 44, 0.08);
}

.thumbnail {
  width: calc(100% + 1px);
  height: calc(100% - 142px - 12px - 16px);
  margin-left: -0.5px;
  margin-top: -0.5px;
  position: relative;
}

.row-thumbnail {
  width: 232px;
  height: 100%;
  flex-shrink: 0;
}

.row-thumbnail img {
  border-radius: 4px 0 0 4px
}

.thumbnail img {
  width: 100%;
  height: 100%;
  -webkit-user-drag: none;
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

.row-content {
  margin: 16px 16px 16px 24px;
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

.row-info {
  margin-top: 8px !important
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
  flex-shrink: 0;
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
