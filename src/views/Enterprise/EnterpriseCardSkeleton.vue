<template>
  <div v-if="isFilter" class="enterprise-skeleton-filter-wrapper">
    <v-skeleton-loader type="image" width="120px" height="90px" />
    <v-skeleton-loader type="list-item-three-line" height="75px" width="70%" />
  </div>
  <div class="enterprise-skeleton-wrapper" v-else>
    <v-skeleton-loader type="image" width="100%" height="110px" />
    <v-skeleton-loader type="list-item-two-line" height="35px" />
  </div>
</template>

<script>
export default {
  props: {
    isFilter: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.enterprise-skeleton-wrapper {
  border: 1px solid #F2F2F2;
  border-radius: 4px;
  padding: 12px;
  width: 156px;
}

.enterprise-skeleton-filter-wrapper {
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  border: 1px solid #F2F2F2;
}
</style>
