<template>
  <div>
    <bread-crumb v-bind:items="breadCrumb" />
    <div class="content-wrapper">
      <div class="content-header">
        <h1>Tin tức bất động sản mới nhất</h1>
        <p>Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam thông qua dữ liệu lớn về giá,<br /> giao
          dịch, nguồn cung - cầu và khảo sát thực tế của đội ngũ phóng viên, biên tập</p>
      </div>
      <div class="content-main">
        <template v-if="isLoading">
          <news-card-skeleton />
          <news-card-skeleton />
          <news-card-skeleton />
          <news-card-skeleton />
        </template>
        <news-card v-else v-for="item in news" :key="item.id" :data="item" />
      </div>
    </div>

  </div>
</template>

<script>
import NewsCard from '../../components/News/NewsCard/NewsCard.vue'
import NewsCardSkeleton from '../../components/News/NewsCard/NewsCardSkeleton.vue'
export default {
  components: { NewsCard, NewsCardSkeleton },
  data() {
    return {
      breadCrumb: [
        'Tin tức'
      ]
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['news/loading']
      }
    },
    news: {
      get() {
        return this.$store.getters['news/newsList']
      }
    }
  },
  async created() {
    await this.$store.dispatch('news/getNewsList')
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

h1 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 500;
  font-size: 40px;
  line-height: 64px;
  margin: 0;
}

.content-wrapper {
  max-width: 1140px;
  padding: 0 12px;
  margin: auto;
}

.content-header {
  height: 224px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-main {
  width: calc(2 / 3 * 100%);
}
</style>
