<template>
  <p class="breadcrumb">
    <span class="breadcrumb-highlight" >
      <router-link :to="{name: isSale? 'PropertiesForSale': 'PropertiesForRent'}">
        {{ isSale ? 'Bán' : 'Cho thuê'  }}
      </router-link>
    </span>
    <template v-if="city">
      <span> / </span>
      <span class="breadcrumb-highlight" >
      <router-link :to="{name: isSale? 'PropertiesForSale': 'PropertiesForRent', query: {city: city}}">
        {{ city  }}
      </router-link>
      </span>
    </template>
    <template v-if="district">
      <span> / </span>
      <span class="breadcrumb-highlight" >
      <router-link :to="{name: isSale? 'PropertiesForSale': 'PropertiesForRent', query: {city: city, district:district }}">
        {{ district  }}
      </router-link>
      </span>
    </template>
    <template v-if="current">
      <span> / </span>
      <span class="breadcrumb-highlight" >
        {{ current  }}
      </span>
    </template>
  </p>
</template>

<script>
export default {
  props: {
    city: {
      type: String
    },
    district: {
      type: String
    },
    current: {
      type: String
    }
  },
  data () {
    return {
      isSale: false
    }
  },
  watch: {
    '$route' () {
      this.isSale = this.$route.path.includes('/nha-dat-ban')
    }
  },
  created () {
    this.isSale = this.$route.path.includes('/nha-dat-ban')
  }
}
</script>

<style scoped>
.breadcrumb{
  font-size: 14px;
  line-height: 20px;
  color: #999 !important;
}
.breadcrumb >:last-child a{
  color: #505050 !important;
}
.breadcrumb >:last-child {
  color: #505050 !important;
}
.breadcrumb a{
  color: #999 !important;
}
.breadcrumb-highlight a:hover{
  cursor: pointer;
  color: #505050 !important;
}
</style>
