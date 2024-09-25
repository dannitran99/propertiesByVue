<template>
  <div class="highlight-loading-wrapper">
    <v-skeleton-loader type="image" height="360px" class="main-img-news" />
    <div class="sub-loading-highlight">
      <v-skeleton-loader type="list-item-two-line" height="77px" width="100%" />
      <v-skeleton-loader type="divider" />
      <v-skeleton-loader type="list-item-two-line" height="77px" width="100%" />
      <v-skeleton-loader type="divider" />
      <v-skeleton-loader type="list-item-two-line" height="77px" width="100%" />
      <v-skeleton-loader type="divider" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.main-img-news {
  width: 66.7%;

  @include responsive(sm1) {
    width: 100%;
  }
}

.highlight-loading-wrapper {
  display: flex;
  gap: 24px;
  margin-bottom: 30px;

  @include responsive(sm1) {
    display: block;
  }
}

.sub-loading-highlight {
  width: 33.3%;

  @include responsive(sm1) {
    width: 100%;
  }
}
</style>
