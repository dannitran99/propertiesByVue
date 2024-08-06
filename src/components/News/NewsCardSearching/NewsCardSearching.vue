<template>
  <div class="news-card-searching-wrapper">
    <p class="card-seaching-date">{{ formatDateTime }} • {{ data.user }}</p>
    <router-link :to="{ name: routeName, params: { newsId: data.ID, } }" class="route-link-searching">
      <h3>{{ data.title }}</h3>
    </router-link>
    <p class="card-seaching-description">{{ data.description }}</p>
  </div>
</template>

<script>
import { formatDateTime } from '@/helpers/formater'
import { handleNewsRoute } from '@/helpers/arrayHandler.js'
export default {
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    formatDateTime: function () {
      return formatDateTime(this.data.createdAt)
    },
    routeName() {
      return handleNewsRoute(this.data.category).rootCategory.pathName
    }
  }
}
</script>

<style scoped lang="scss">
.news-card-searching-wrapper {
  border-radius: 8px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eff1f5
}

.card-seaching-date {
  font-family: 'Lexend-Medium', sans-serif;
  color: #5a6067;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
}

.route-link-searching {

  h3 {
    font-weight: 500;
    font-family: 'Lexend-Medium', sans-serif;
    margin-bottom: 5px;
    font-size: 18px;
    line-height: 28px;
    color: #c20000;
  }
}

.card-seaching-description {
  margin-bottom: 30px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  width: 100%;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #1c1f22;
}
</style>
