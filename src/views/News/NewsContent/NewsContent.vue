<template>
  <div>{{this.$store.getters['news/newContent'] }}</div>
</template>

<script>
export default {
  async created () {
    await this.$store.dispatch('news/getNewById', {
      id: this.$route.params.newsId
    })
  }
}
</script>

<style>

</style>
