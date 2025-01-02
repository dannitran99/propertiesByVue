<template>
  <div class="filter-mobile">
    asdasd
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.filter-mobile {
  display: none;
  margin: 0 16px 12px;
  width: calc(100% - 32px);
  padding: 8px;
  border: 1px solid #ccc;
  background-color: #F2F2F2;
  border-radius: 8px;
  height: 48px;

  @include responsive(xs) {
    display: block;
  }
}
</style>
