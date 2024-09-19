<template>
  <div class="news-mobile-item-skeleton">
    <v-skeleton-loader type="image" width="33vw" height="calc(33vw* 255 / 458)" />
    <v-skeleton-loader type="list-item-three-line" height="80px" class="text-skeleton-news" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.news-mobile-item-skeleton {
  padding: 16px 0;
  border-bottom: 1px solid #F2F2F2;
  display: flex;
}

.text-skeleton-news {
  flex-grow: .8;
}
</style>
