<template>
  <div class="news-mobile-item">
    <router-link :to="{ name: routeName, params: { newsId: data.ID, } }">
      <img v-bind:src="data.thumbnail" class="thumbnail-news">
    </router-link>
    <div class="main-content-news">
      <router-link :to="{ name: routeName, params: { newsId: data.ID, } }">
        <h3>{{ data.title }}</h3>
      </router-link>
      <div class="time-news-mobile">
        <icon-clock />
        <p>{{ moment() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimeHumanize } from '@/helpers/formater'
import { handleNewsRoute } from '@/helpers/arrayHandler.js'
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    routeName() {
      return handleNewsRoute(this.data.category).rootCategory.pathName
    }
  },
  methods: {
    moment: function () {
      return formatTimeHumanize(this.data.createdAt)
    }
  }
}
</script>

<style scoped lang="scss">
.news-mobile-item {
  padding: 16px 0;
  border-bottom: 1px solid #F2F2F2;
  display: flex;
}

.thumbnail-news {
  width: 33vw;
  height: calc(33vw* 255 / 458);
  margin-right: 16px;
  border-radius: 4px;
  flex-shrink: 0;
}

.main-content-news {
  h3 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: -.2px;
    margin-bottom: 12px;
    color: #2C2C2C !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

.time-news-mobile {
  display: flex;

  svg {
    margin-top: 2px;
    margin-right: 5.35px;
  }

  p {
    font-family: 'Roboto-Regular', sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #999 !important;
  }
}
</style>
