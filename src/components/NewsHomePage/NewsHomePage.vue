<template>
  <div>
    <news-tab-header class="tab-header"/>
    <div class="wrapper">
      <news-preview v-for="item in news" v-bind:key="item.id" v-bind:data="item"/>
      <ul>
          <news-item v-for="item in news" v-bind:key="item.id" v-bind:data="item"/>
      </ul>
    </div>
  </div>
</template>

<script>
import NewsItem from './NewsItem.vue'
import NewsPreview from './NewsPreview.vue'
import NewsTabHeader from './NewsTabHeader.vue'
export default {
  name: 'NewsHomePage',
  components: {
    'news-item': NewsItem,
    'news-preview': NewsPreview,
    'news-tab-header': NewsTabHeader
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
  .tab-header{
    margin-bottom: 24px;
    border-bottom: 1px solid #F2F2F2;
    width: 848px;
  }
  .wrapper{
    display: flex;
    width: 1140px;
  }
  ul{
    width: 360px;
    margin: 0;
    margin-left: 30px;
    padding: 0;
  }
  ul > li:first-of-type{
    padding-top: 0;
    padding-bottom: 14px;
    border-top: none;
  }
</style>
