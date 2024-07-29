<template>
  <div class="article-module-render">
    <p class="view-more">Xem thêm: <a v-if="data.article.length === 1" :href="data.article[0].url" target="_blank">{{
      data.article[0].title
    }}</a></p>
    <ul v-if="data.article.length > 1" class="list-article">
      <li v-for="(item, idx) in data.article" :key="idx">
        <a :href="item.url" target="_blank">
          {{ item.title }}</a>
      </li>
    </ul>
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

<style scoped lang="scss">
.article-module-render {
  font-size: 16px;
  line-height: 26px;

  a {
    color: #c20000 !important;
  }
}

.view-more {
  margin-bottom: 30px;
}

.list-article {
  padding-left: 32px;
  margin-bottom: 32px;
}
</style>
