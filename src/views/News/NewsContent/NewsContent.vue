<template>
  <div>
    <bread-crumb v-bind:items="breadCrumb" />
    <div class="content">
      <h1>{{ content.name }}</h1>
      <p>{{ content.content }}</p>
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
          this.$store.getters['news/newContent'].name || ''
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

h1 {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 500;
  font-size: 40px;
  line-height: 64px;
}

.content {
  margin: 0 auto;
  padding: 10px;
  max-width: 1140px;
  text-align: left;
}
</style>
