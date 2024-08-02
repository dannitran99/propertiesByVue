<template>
  <div class="news-highlight-wrapper">
    <router-link :to="{ name: handleNewsRoute(main.category).rootCategory.pathName, params: { newsId: main.ID, } }"
      class="main-item-highlight">
      <img :src="main.thumbnail" alt="thumbnail" />
      <div class="item-highlight-detail">
        <p class="item-highlight-datetime">{{ formatDateTime(main.createdAt) }} • {{ main.user }}</p>
        <div class="item-highlight-title">
          <h3>{{ main.title }}</h3>
        </div>
        <p class="item-highlight-description">{{ main.description }}</p>
      </div>
      <div class="highlight-overlay"></div>
    </router-link>
    <div>
      <div v-for="item in sub" :key="item.ID" class="sub-item-highlight">
        <p class="sub-item-highlight-datetime">{{ formatDateTime(item.createdAt) }} • {{ item.user }}</p>
        <router-link class="sub-item-highlight-title"
          :to="{ name: handleNewsRoute(item.category).rootCategory.pathName, params: { newsId: item.ID, } }">
          <p>{{ item.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateTime } from '@/helpers/formater'
import { handleNewsRoute } from '@/helpers/arrayHandler.js'
export default {
  props: {
    data: {
      type: Array
    }
  },
  computed: {
    main() {
      return this.data[0]
    },
    sub() {
      const clonedArray = [...this.data]
      return clonedArray.splice(1)
    }
  },
  methods: {
    formatDateTime,
    handleNewsRoute
  }
}
</script>

<style scoped lang="scss">
.news-highlight-wrapper {
  display: flex;
  gap: 24px;
  margin-bottom: 30px;
}

.main-item-highlight {
  flex-shrink: 0;
  width: calc(2 / 3 * 100%);
  position: relative;
  height: 360px;

  img {
    height: 360px;
    width: 100%;
    object-fit: cover;
    position: relative;
  }
}

.item-highlight-detail {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 30px;
  color: #eff1f5;
  z-index: 1;
}

.item-highlight-title {
  height: 76px;
  margin: 10px 0;

  h3 {
    font-family: 'Lexend-Medium', sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.item-highlight-datetime {
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 14px;
  line-height: 22px;
}

.item-highlight-description {
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
}

.highlight-overlay {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(44, 44, 44, 0) 0, #1c1f22 100%);
}

.sub-item-highlight {
  border-bottom: 1px solid #eff1f5;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.sub-item-highlight-title {
  font-family: 'Lexend-Medium', sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #1c1f22 !important;

  &:hover {
    color: #5a6067 !important;
  }
}

.sub-item-highlight-datetime {
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #5a6067;
}
</style>
