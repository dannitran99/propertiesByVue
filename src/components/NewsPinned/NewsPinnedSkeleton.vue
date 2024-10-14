<template>
  <div class="news-pinned-skeleton-wrapper">
    <div class="news-pinned-skeleton-wrapper--item">
      <v-skeleton-loader type="image" class="skeleton-news-img" />
      <v-skeleton-loader type="list-item-two-line" class="skeleton-news-txt" />
    </div>
    <div class="news-pinned-skeleton-wrapper--item">
      <v-skeleton-loader type="image" class="skeleton-news-img" />
      <v-skeleton-loader type="list-item-two-line" class="skeleton-news-txt" />
    </div>
    <div class="news-pinned-skeleton-wrapper--item">
      <v-skeleton-loader type="image" class="skeleton-news-img" />
      <v-skeleton-loader type="list-item-two-line" class="skeleton-news-txt" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.news-pinned-skeleton-wrapper {
  display: flex;

  >:not(:last-child) {
    margin-right: 30px;

    @include responsive(xs) {
      margin-right: 16px;
    }
  }

  &--item {
    width: 360px;
    flex-shrink: 0;

    @include responsive(lg) {
      width: 325px;
    }

    @include responsive(xs) {
      width: 242px;
    }
  }
}

.skeleton-news-img {
  width: 100%;
  height: 202px;
  margin-bottom: 16px;

  @include responsive(lg) {
    height: 160px;
  }

  @include responsive(xs) {
    margin-bottom: 0;
    height: 136px;
  }
}

.skeleton-news-txt {
  height: 64px;

  @include responsive(xs) {
    height: 56px;
  }
}
</style>
