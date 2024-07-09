<template>
  <div class="skeleton-wrapper">
    <v-skeleton-loader type="image" height="calc(100% - 142px - 12px - 16px)" />
    <v-skeleton-loader type="list-item-three-line" />
    <v-skeleton-loader type="list-item-two-line" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.skeleton-wrapper {
  width: 262px;
  height: 318px;
  border: 1px solid #F2F2F2;
  -webkit-box-shadow: 0px 4px 6px 0px rgba(44, 44, 44, 0.04);
  box-shadow: 0px 4px 6px 0px rgba(44, 44, 44, 0.04);
  border-radius: 4px;
  background: #fff;
}
</style>
