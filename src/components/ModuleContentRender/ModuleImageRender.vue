<template>
  <div class="paragraph-image">
    <img :src="data.image" :alt="data.description" />
    <p v-if="data.description"><i>{{ data.description }}</i></p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style scoped>
.paragraph-image {
  margin-bottom: 20px;
}

.paragraph-image img {
  height: auto;
  max-width: 100%;
}

.paragraph-image p {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #999;
  margin: 5px 0 0 0;
}
</style>
