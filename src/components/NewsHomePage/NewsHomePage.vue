<template>
  <div>
    <news-tab-header class="tab-header" />
    <template v-if="isLoading">
      <template v-if="isMobile">
        <news-skeleton-mobile />
        <news-skeleton-mobile />
        <news-skeleton-mobile />
      </template>
      <news-skeleton v-else />
    </template>
    <template v-else>
      <div v-if="isMobile">
        <news-item-mobile v-for="item in news" :key="item.id" :data="item" />
      </div>
      <div class="wrapper-news-item" v-else>
        <news-preview v-for="item in news" v-bind:key="item.id" v-bind:data="item" />
        <ul>
          <news-item v-for="item in news" v-bind:key="item.id" v-bind:data="item" />
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { useBreakpoints } from '@vueuse/core'
import { breakpoints } from '@/consts/breakpoints.js'
import NewsItem from './NewsItem.vue'
import NewsSkeleton from './NewsSkeleton.vue'
import NewsPreview from './NewsPreview.vue'
import NewsTabHeader from './NewsTabHeader.vue'
import NewsItemMobile from './NewsItemMobile.vue'
import NewsSkeletonMobile from './NewsSkeletonMobile.vue'
import { NEWS_CATEGORY_TYPE } from '@/consts/newsCategory'
import { DEFAULT_TAGS } from '@/consts/contentNews'

const definedBreakpoint = useBreakpoints(breakpoints)
export default {
  name: 'NewsHomePage',
  components: {
    'news-item': NewsItem,
    'news-preview': NewsPreview,
    'news-tab-header': NewsTabHeader,
    'news-skeleton': NewsSkeleton,
    'news-item-mobile': NewsItemMobile,
    'news-skeleton-mobile': NewsSkeletonMobile
  },
  data() {
    return {
      isMobile: definedBreakpoint.smaller('lg')
    }
  },
  computed: {
    news: {
      get() {
        return this.$store.getters['news/newsListMain']
      }
    },
    isLoading: {
      get() {
        return this.$store.getters['news/isLoading']
      }
    },
    currentTab: {
      get() {
        return this.$store.getters['news/currentTab']
      }
    }
  },
  watch: {
    currentTab() {
      this.handleGetNewsMain()
    }
  },
  created() {
    this.handleGetNewsMain()
  },
  methods: {
    async handleGetNewsMain() {
      await this.$store.dispatch('news/getNewsListMain', this.handleTabPayload())
    },
    handleTabPayload() {
      switch (this.currentTab) {
        case 0:
          return {
            query: { p: 1, l: 6 }
          }
        case 1:
          return {
            type: NEWS_CATEGORY_TYPE.tintuc.code,
            query: { p: 1, l: 6 }
          }
        case 2:
          return {
            query: { p: 1, l: 6, tags: DEFAULT_TAGS[0] }
          }
        case 3:
          return {
            query: { p: 1, l: 6, tags: DEFAULT_TAGS[1] }
          }
        default: break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tab-header {
  margin-bottom: 24px;
  border-bottom: 1px solid #F2F2F2;
  max-width: 848px;

  @include responsive(lg) {
    max-width: 100%;
    margin-bottom: 0;
  }
}

.wrapper-news-item {
  display: flex;
  max-width: 1140px;

  @include responsive(lg) {
    width: 100%;
  }
}

ul {
  max-width: 360px;
  margin: 0;
  margin-left: 30px;
  padding: 0;
}

ul>li:first-of-type {
  padding-top: 0;
  padding-bottom: 14px;
  border-top: none;
}
</style>
