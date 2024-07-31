<template>
  <li v-on:mouseenter="hoverPreviewNews">
    <router-link :to="{ name: routeName, params: { newsId: data.ID, } }" class="route-link">
      <p>{{ data.title }}</p>
    </router-link>
  </li>
</template>

<script>
import { handleNewsRoute } from '@/helpers/arrayHandler.js'
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    routeName() {
      return handleNewsRoute(this.data.category).rootCategory.pathName
    }
  },
  methods: {
    hoverPreviewNews() {
      this.$store.dispatch('news/setPreviewNews', { data: this.data })
    }
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

a {
  text-decoration: none;
  color: #2C2C2C !important;
}

a:hover {
  color: #999 !important;
}

li {
  list-style-type: none;
  text-align: left;
  padding-top: 14px;
  padding-bottom: 14px;
  border-top: 1px solid #F2F2F2;
  font-size: 16px;
  line-height: 26px;
  font-weight: normal !important;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
