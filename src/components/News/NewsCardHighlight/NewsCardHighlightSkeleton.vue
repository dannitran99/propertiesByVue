<template>
  <div class="highlight-loading-wrapper">
    <v-skeleton-loader type="image" height="360px" width="66.7%" />
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

<style scoped>
.highlight-loading-wrapper {
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
}

.sub-loading-highlight {
  width: 33.3%;
}
</style>
