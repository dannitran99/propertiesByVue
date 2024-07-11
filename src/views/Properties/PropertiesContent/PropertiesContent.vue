<template>
  <div>
    <v-progress-circular indeterminate class="loading" v-if="isLoading"></v-progress-circular>
    <div class="wrapper" v-else>
      <div class="content">
        <carousel :imageList="data.images" />
        <bread-crumb-property :city="data.city" :district="data.district" class="breadcrumb-property" />
        <h3>{{ data.title }}</h3>
        <p class="address-txt">{{ `${data.project ? `${data.project}, ` : ''} ${data.ward}, ${data.district},
          ${data.city}` }}</p>
        <div class="detail-section">
          <div class="detail-child">
            <p class="detail-title">Mức giá</p>
            <p class="detail-value">{{ formatCurrency }}</p>
          </div>
          <div class="detail-child">
            <p class="detail-title">Diện tích</p>
            <p class="detail-value">{{ formatArea }}</p>
          </div>
        </div>
        <div class="description-section">
          <h4 class="description-title">Thông tin mô tả</h4>
          <p class="description-p">{{ data.description }}</p>
        </div>
        <div v-if="data.url">
          <iframe :src="handleLink(data.url)" title="link" width="100%" height="450"></iframe>
        </div>
        <div class="detail-section">
          <div class="detail-child">
            <p class="detail-title">Ngày đăng</p>
            <p class="detail-description">{{ formatDate }}</p>
          </div>
        </div>
        <carousel-card :data="history" v-if="history.length" class="carousel-section">
          <h4 class="description-title">Tin đăng đã xem</h4>
        </carousel-card>
      </div>
      <div class="user-info">
        <img :src="data.relatedUser && data.relatedUser[0].avatar" alt="avatar" class="avatar-img"
          v-if="data.relatedUser && data.relatedUser[0].avatar">
        <v-avatar color="rgb(255, 236, 235)" size="64" v-else>
          <span class="text-h6 avt-text">{{ data.name.split(' ').reverse()[0][0].toUpperCase() }}</span>
        </v-avatar>
        <p class="txt-name">{{ data.name }}</p>
        <button class="btn-reveal" @click="handleReveal">
          <icon-phone />{{ phoneReveal ? data.phoneNumber : phoneNumber }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselCard from '@/components/CarouselCard'
import { formatCurrency, formatDate } from '@/helpers/formater'
import { handleViewedProperties } from '@/helpers/localData'
import { HISTORY_PROPERTY_ITEM_KEY } from '@/consts/common'
export default {
  components: {
    CarouselCard
  },
  data() {
    return {
      phoneReveal: false,
      history: JSON.parse(localStorage.getItem(HISTORY_PROPERTY_ITEM_KEY)) || []
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['properties/isLoading']
      }
    },
    data: {
      get() {
        return this.$store.getters['properties/data']
      }
    },
    formatCurrency: function () {
      return `${this.data.price ? formatCurrency(this.data.price) : 'Giá thỏa thuận'}${this.type === 'rent' ? '/tháng' : ''}`
    },
    formatArea: function () {
      return `${this.data.area} m²`
    },
    formatDate: function () {
      return formatDate(this.data.createdAt)
    },
    phoneNumber: function () {
      return `${this.data.phoneNumber.slice(0, -3)}*** Hiện số`
    }
  },
  watch: {
    '$route'() {
      this.handleFetchData()
    }
  },
  created() {
    this.handleFetchData()
  },
  methods: {
    handleReveal: function () {
      this.phoneReveal = true
    },
    async handleFetchData() {
      await this.$store.dispatch('properties/getPropertiesDetail', {
        id: this.$route.path.split('/')[2]
      })
      handleViewedProperties(this.data)
    },
    handleLink(input) {
      return input.replace('watch?v=', 'embed/')
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1140px;
  margin-top: 16px;
}

.content {
  width: 848px;
  /* margin-right: 30px */
}

.content h3 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.2px;
  color: #2C2C2C;
}

.breadcrumb-property {
  margin-top: 24px;
  margin-bottom: 8px;
}

.address-txt {
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #2C2C2C;
  margin-top: 8px;
  margin-bottom: 0;
}

.user-info {
  width: 262px;
  height: fit-content;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

.avt-text {
  font-weight: 500;
  color: rgb(116, 21, 15);
}

.avatar-img {
  border-radius: 100%;
  width: 64px;
  height: 64px;
  object-fit: cover;
}

.txt-name {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -.2px;
  white-space: nowrap;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: #2C2C2C;
  margin-top: 4px;
  margin-bottom: 16px;
}

.btn-reveal {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #fff;
  background: #009BA1;
  font-size: 14px;
  line-height: 20px;
  padding: 14px 16px;
  border-radius: 4px;
}

.detail-section {
  margin: 16px 0;
  padding: 15px 0;
  border-top: 1px solid #F2F2F2;
  border-bottom: 1px solid #F2F2F2;
  display: flex;
  gap: 64px;
}

.detail-title {
  font-size: 14px;
  line-height: 20px;
  font-weight: normal !important;
  color: #999;
  margin: 0;
}

.detail-value {
  font-size: 18px;
  line-height: 28px;
  color: #2C2C2C;
  font-weight: 600;
  margin: 4px 0 0 0;
}

.detail-description {
  font-size: 14px;
  line-height: 20px;
  color: #2C2C2C;
  font-weight: 600;
  margin: 4px 0 0 0;
}

.description-section {
  margin: 40px 0;
}

.description-title {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 500;
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -.2px;
  color: #2C2C2C;
}

.description-p {
  white-space: pre-line;
  font-size: 14px;
  line-height: 24px;
  margin: 0;
}

.carousel-section {
  margin-top: 40px;
}
</style>
