<template>
  <li v-on:mouseenter="hoverPreviewNews">
    <router-link :to="{ name: 'NewsDetail', params: { newsId: data.ID, } }" class="route-link">
      {{ data.name }}
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
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
  color: #2C2C2C;
}

a:hover {
  color: #999;
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
