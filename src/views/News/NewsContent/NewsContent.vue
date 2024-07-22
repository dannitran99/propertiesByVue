<template>
  <div>
    <bread-crumb v-bind:items="breadCrumb" />
    <div class="content">
      <h1 class="title-content">{{ content.title }}</h1>
      <div class="main-content-news">
        <p class="description-content">{{ content.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    content: {
      get() {
        return this.$store.getters['news/newContent']
      }
    },
    breadCrumb: {
      get() {
        return [
          'Tin tức',
          this.$store.getters['news/newContent'].title || ''
        ]
      }
    }
  },
  async created() {
    await this.$store.dispatch('news/getNewById', {
      id: this.$route.params.newsId
    })
  },
  destroyed() {
    this.$store.dispatch('news/returnInitData')
  }
}
</script>

<style scoped>
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.title-content {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 500;
  font-size: 40px;
  line-height: 64px;
  color: #1c1f22;
  padding: 20px 12px;
}

.main-content-news {
  padding: 0 12px;
  width: 66.66666667%;
}

.content {
  margin: 0 auto;
  padding: 10px 15px;
  max-width: 1140px;
  text-align: left;
}

.description-content {
  margin-bottom: 30px;
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
  color: #1c1f22;
}
</style>
