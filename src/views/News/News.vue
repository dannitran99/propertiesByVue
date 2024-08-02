<template>
  <div>
    <bread-crumb v-bind:items="breadCrumb" />
    <div class="content-wrapper">
      <div class="content-header">
        <h1>{{ category.title || lastPath.title }}</h1>
        <p>{{ category.description || lastPath.description }}</p>
      </div>
      <news-card-highlight-skeleton v-if="isLoading" />
      <news-card-highlight :data="articleHighlight" v-if="articleHighlight.length" />
      <div class="category-section" v-if="subCategory">
        <h2>Chuyên mục</h2>
        <div class="category-item-wrapper">
          <div v-for="(item, idx) in subCategory" :key="idx" class="category-item">
            <router-link v-if="item.value" :to="{ path: `/${lastPath.code}?category=${item.value}` }">
              <component :is="item.icon" />
              <p>{{ item.label }}</p>
            </router-link>
            <div v-else>
              <component :is="item.icon" />
              <p>{{ item.label }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content-main">
        <h2 class="title-news-content" v-if="category.secondaryLabel || lastPath.secondaryLabel">
          {{ category.secondaryLabel || lastPath.secondaryLabel }}
        </h2>
        <news-card v-for="item in articleFeed" :key="item.id" :data="item" />
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
import NewsCard from '@/components/News/NewsCard'
import NewsCardHighlight from '@/components/News/NewsCardHighlight'
import NewsCardHighlightSkeleton from '@/components/News/NewsCardHighlight/NewsCardHighlightSkeleton.vue'
import NewsCardSkeleton from '@/components/News/NewsCard/NewsCardSkeleton.vue'
import { NEWS_CATEGORY_TYPE } from '@/consts/newsCategory'
import { handleNewsTypeRequest } from '@/helpers/arrayHandler.js'
import { handleNewsRoute } from '@/helpers/arrayHandler'
export default {
  components: { NewsCard, NewsCardSkeleton, NewsCardHighlight, NewsCardHighlightSkeleton },
  data() {
    return {
      page: 1,
      articleHighlight: [],
      articleFeed: []
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
    subCategory() {
      const lastPath = this.$route.path.split('/')[1]
      const { rootCategory } = handleNewsRoute(lastPath)
      return this.$route.query.category ? undefined : rootCategory.subItem.filter(el => el.icon)
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
    },
    news() {
      if (this.$route.query.k) {
        const clonedArray = [...this.news]
        this.articleFeed = clonedArray
        this.articleHighlight = []
      } else {
        const clonedArray = [...this.news]
        this.articleFeed = clonedArray.splice(this.category ? 1 : 4)
        this.articleHighlight = clonedArray
      }
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

.title-news-content {
  font-family: 'Lexend-Medium', sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 44px;
  color: #1c1f22;
  margin-bottom: 30px;
}

.category-section {
  margin-top: 50px;
  margin-bottom: 80px;

  h2 {
    font-family: 'Lexend-medium', sans-serif;
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    color: #1c1f22;
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;
    margin-bottom: .5rem;
  }
}

.category-item-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  padding-bottom: 14px;
  border-bottom: 1px solid #ccc;

  .category-item {
    width: 25%;
    text-align: center;
    padding: 15px;

    &:hover {
      p {
        color: #5a6067 !important;
      }
    }

    p {
      font-family: 'Lexend-medium', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 28px;
      color: #1c1f22 !important;
      margin-top: 10px;
      margin-bottom: 1rem;
    }
  }
}
</style>
