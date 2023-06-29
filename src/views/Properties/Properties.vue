<template>
  <div class="content">{{ isSale }}</div>
</template>

<script>
export default {
  data () {
    return {
      isSale: ''
    }
  },
  watch: {
    '$route' () {
      this.isSale = this.$route.path.includes('nha-dat-ban') ? 'Bán' : 'Cho thuê'
    }
  },
  created () {
    this.isSale = this.$route.path.includes('nha-dat-ban') ? 'Bán' : 'Cho thuê'
  }
}
</script>

<style scoped>
  .content{
    margin: 0 auto;
    padding: 10px;
    max-width: 1140px;
    text-align: left;
  }
</style>
