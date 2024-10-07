<template>
  <div class="body">
    <filter-home />
    <div class="component-wrapper">
      <news-home-page class="component" />
    </div>
    <div class="component-wrapper bg-dark">
      <properties-home-page class="component " />
    </div>
    <div class="component-wrapper">
      <enterprise-slideshow class="component" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.component {
  width: 1140px;
  margin: 40px auto;

  @include responsive(lg) {
    width: 100%;
    margin: 32px auto;
    padding: 0 32px;
  }
}

.component-wrapper {
  width: 100%;
}

.bg-dark {
  background-color: #FAFAFA
}
</style>
