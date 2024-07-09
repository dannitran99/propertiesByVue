<template>
  <div class="skeleton-new-wrapper">
    <div class="left-section">
      <v-skeleton-loader type="image" height="257px" width="458px" />
      <v-skeleton-loader type="list-item-three-line" />
    </div>
    <div class="right-section">
      <v-skeleton-loader type="list-item-two-line" height="66px" />
      <v-skeleton-loader type="divider" />
      <v-skeleton-loader type="list-item-two-line" height="81px" />
      <v-skeleton-loader type="divider" />
      <v-skeleton-loader type="list-item-two-line" height="81px" />
      <v-skeleton-loader type="divider" />
      <v-skeleton-loader type="list-item-two-line" height="81px" />
      <v-skeleton-loader type="divider" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.skeleton-new-wrapper {
  display: flex;
  gap: 30px;
}

.left-section {
  height: 365px;
  width: 458px;
}

.right-section {
  width: 360px;
}
</style>
