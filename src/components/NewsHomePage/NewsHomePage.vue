<template>
  <div class="wrapper">
    <news-preview/>
    <ul>
        <news-item v-for="item in news" v-bind:key="item.id" v-bind:name="item.name"/>
    </ul>
  </div>
</template>

<script>
import NewsItem from './NewsItem.vue'
import NewsPreview from './NewsPreview.vue'
export default {
  name: 'NewsHomePage',
  components: {
    'news-item': NewsItem,
    'news-preview': NewsPreview
  },
  computed: {
    news: {
      get () {
        return this.$store.getters['news/newsList']
      }
    }
  },
  async created () {
    await this.$store.dispatch('news/getNewsList')
  }
}
</script>

<style scoped>
  .wrapper{
    display: flex;
    gap: 30px;
    width: 1140px;
  }
  ul{
    width: 360px;
  }
  ul > li:first-of-type{
    padding-top: 0;
    padding-bottom: 14px;
    border-top: none;
  }
</style>
