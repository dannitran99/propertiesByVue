<template>
  <div>ádasdsd</div>
</template>

<script>
export default {
  name: 'HomePage',
  async created () {
    await this.$store.dispatch('news/getNewsList')
  }
}
</script>

<style>

</style>
