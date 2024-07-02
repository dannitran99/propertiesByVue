<template>
  <div class="card-wrapper">
    <router-link :to="{ name: 'ContactAgencyDetail', params: { contactId: data.ID, } }">
      <img :src="data.avatar" alt="avt">
    </router-link>
    <div class="card-content">
      <div class="main-detail">
        <router-link :to="{ name: 'ContactAgencyDetail', params: { contactId: data.ID, } }" class="card-name">
          {{ data.name }}
        </router-link>
        <p class="card-address" v-if="data.city">
          <icon-mappoint />{{ data.ward }}, {{ data.district }}, {{ data.city }}
        </p>
        <p class="card-address" v-if="data.phoneNumber"><icon-cellphone />{{ data.phoneNumber }} </p>
      </div>
      <div class="sub-detail">
        <h5>KHU VỰC CÁ NHÂN MÔI GIỚI</h5>
        <ul>
          <li v-for="(item, idx) in data.scope" :key="idx">
            {{ handleTypeProperty(item) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { PROPSSALETYPE, PROPSRENTTYPE } from '@/consts/propstype'
export default {
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    handleTypeProperty(item) {
      const listLabel = item.typeProperty === 'sale' ? PROPSSALETYPE : PROPSRENTTYPE
      const entries = Object.entries(listLabel)
      let type = ''
      entries.forEach(([key, value]) => {
        if (value.code === item.type) {
          type = value.primaryLabel
        }
      })
      return `${type} ở ${item.district}, ${item.city}`
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

h5 {
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  color: #2C2C2C;
}

.card-wrapper {
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  padding: 16px;
  display: flex;
}

.card-wrapper img {
  width: 120px;
  max-height: 120px;
  margin-right: 16px;
  object-fit: cover
}

.card-content {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
}

.main-detail {
  width: 240px;
}

.sub-detail {
  width: 240px;
}

.card-name {
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.2px;
  margin-bottom: 8px;
  color: #2C2C2C;
}

.card-name:hover {
  color: #999;
}

.card-address {
  font-size: 12px;
  line-height: 16px;
  color: #505050;
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
}

li {
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 16px;
  color: #505050;
}

li::marker {
  color: red;
}
</style>
