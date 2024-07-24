<template>
  <div class="paragraph-video">
    <iframe :src="handleLink" :title="data.description" width="100%" height="440"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
    <p v-if="data.description"><i>{{ data.description }}</i></p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    handleLink() {
      return this.data.url.replace('watch?v=', 'embed/')
    }
  }
}
</script>

<style scoped>
.paragraph-video {
  margin-bottom: 20px;
}

.paragraph-video p {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #999;
  margin: 5px 0 0 0;
}
</style>
