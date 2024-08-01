<template>
  <div>
    <bread-crumb v-bind:items="breadCrumb" />
    <div class="content-wrapper">
      <div class="content-header">
        <h1>{{ category.title || lastPath.title }}</h1>
        <p>{{ category.description || lastPath.description }}</p>
      </div>
      <div class="content-main">
        <news-card v-for="item in news" :key="item.id" :data="item" />
        <template v-if="isLoading">
          <news-card-skeleton />
          <news-card-skeleton />
          <news-card-skeleton />
          <news-card-skeleton />
        </template>
        <button class="btn-view-more" :disabled="isLoading" @click="handleViewMore" v-if="news.length < totalItem">
          Xem thêm
        </button>
        <div v-if="!isLoading && !news.length" class="news-empty">
          <div class="background-img-news"></div>
          <h2>Không tìm thấy kết quả</h2>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import NewsCard from '@/components/News/NewsCard/NewsCard.vue'
import NewsCardSkeleton from '@/components/News/NewsCard/NewsCardSkeleton.vue'
import { NEWS_CATEGORY_TYPE } from '@/consts/newsCategory'
import { handleNewsTypeRequest } from '@/helpers/arrayHandler.js'
export default {
  components: { NewsCard, NewsCardSkeleton },
  data() {
    return {
      page: 1
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['news/isLoading']
      }
    },
    news: {
      get() {
        return this.$store.getters['news/newsList']
      }
    },
    totalItem: {
      get() {
        return this.$store.getters['news/totalItem']
      }
    },
    lastPath() {
      const lastPath = this.$route.path.split('/')[1]
      return this.handleRoutePath(lastPath)
    },
    category() {
      const category = this.$route.query.category
      if (category) {
        return this.handleRoutePath(category)
      } else return ''
    },
    breadCrumb() {
      const itemBreakcrumb = [
        {
          label: this.lastPath.primaryLabel,
          href: `/${this.lastPath.code}`
        }
      ]
      this.category && itemBreakcrumb.push({
        label: this.category.primaryLabel,
        href: `/${this.lastPath.code}?category=${this.category.code}`
      })
      return itemBreakcrumb
    }
  },
  watch: {
    '$route'() {
      this.page = 1
      this.$store.dispatch('news/returnInitData')
      this.handleGetNews()
    }
  },
  created() {
    this.handleGetNews()
  },
  destroyed() {
    this.$store.dispatch('news/returnInitData')
  },
  methods: {
    async handleGetNews() {
      await this.$store.dispatch('news/getNewsList', {
        type: handleNewsTypeRequest(this.lastPath.code, this.category.code),
        query: { ...this.$route.query, p: this.page }
      })
    },
    handleRoutePath(input) {
      const entries = Object.entries(NEWS_CATEGORY_TYPE)
      let object
      entries.forEach(([_, value]) => {
        if (value.code === input) object = value
      })
      return object
    },
    handleViewMore() {
      this.page++
      this.handleGetNews()
    }
  }
}
</script>

<style scoped lang="scss">
* {
  font-family: 'Roboto-Regular', sans-serif;
}

.content-wrapper {
  max-width: 1140px;
  padding: 0 12px;
  margin: auto;
}

.content-header {
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: pre-line;

  h1 {
    font-family: 'Lexend-Medium', sans-serif;
    font-weight: 500;
    font-size: 40px;
    line-height: 64px;
    margin-bottom: 8px;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #1c1f22;
  }
}

.content-main {
  width: calc(2 / 3 * 100%);
}

.btn-view-more {
  margin: 0 auto 25px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: #c20000;
  background: #fff;
  border: 1px solid #c20000;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 20px;
  transition: all .2s ease;

  &:hover {
    color: #fff;
    background: #c20000;
  }
}

.news-empty {
  text-align: center;
  margin-bottom: 60px;

  .background-img-news {
    margin: auto;
    width: 127px;
    height: 106px;
    background: url('../../assets/news-empty.svg');
    background-size: contain;
  }

  h2 {
    font-family: 'Lexend-medium', sans-serif;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #1c1f22;
  }
}
</style>
