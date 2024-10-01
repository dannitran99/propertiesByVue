<template>
  <div class="wrapper">
    <filter-enterprise />
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.wrapper {
  margin: 72px auto 0 auto;
  width: 936px;

  @include responsive(sm1) {
    width: 720px;
  }

  @include responsive(sm) {
    width: 100%;
    padding: 0 12px;
  }
}
</style>
