<template>
  <div class="body">
    <div class="component-wrapper">
      <news-home-page class="component" />
    </div>
    <div class="component-wrapper bg-dark">
      <properties-home-page class="component " />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.component {
  width: 1140px;
  margin: 40px auto;
}

.component-wrapper {
  width: 100%;
}

.bg-dark {
  background-color: #FAFAFA
}
</style>
