<template>
  <div class="news-pinned-wrapper">
    <h2>Tin tức bất động sản</h2>
    <div class="gallery-wrapper">
      <div class="gallery-wrapper--list" ref="newsRef">
        <news-pinned-skeleton v-if="isLoading" />
        <ul class="news-pinned-list" v-else>
          <li v-for="(item, idx) in newsPinnedList" :key="idx" class="news-pinned-list--item">
            <router-link
              :to="{ name: handleNewsRoute(item.category).rootCategory.pathName, params: { newsId: item.ID, } }"
              class="img-holder">
              <v-img :src="item.thumbnail" :alt="item.thumbnail"></v-img>
            </router-link>
            <h3>
              <span>{{ formatNumberDigit(idx + 1) }}</span>
              <router-link
                :to="{ name: handleNewsRoute(item.category).rootCategory.pathName, params: { newsId: item.ID, } }">
                {{ item.title }}</router-link>
            </h3>
          </li>
        </ul>
      </div>
      <button class="btn-carousel" v-if="isDesktop" @click="() => emblaApi.scrollPrev()">
        <icon-leftarrow />
      </button>
      <button class="btn-carousel go-right" v-if="isDesktop" @click="() => emblaApi.scrollNext()">
        <icon-leftarrow />
      </button>
    </div>
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'
import NewsPinnedSkeleton from './NewsPinnedSkeleton.vue'
import { useBreakpoints } from '@vueuse/core'
import { formatNumberDigit } from '@/helpers/formater'
import { breakpoints } from '@/consts/breakpoints.js'
import { handleNewsRoute } from '@/helpers/arrayHandler.js'

const definedBreakpoint = useBreakpoints(breakpoints)
export default {
  components: {
    NewsPinnedSkeleton
  },
  data() {
    return {
      emblaApi: null,
      isDesktop: definedBreakpoint.greater('lg')
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['news/isLoadingPinned']
      }
    },
    newsPinnedList: {
      get() {
        return this.$store.getters['news/newsPinnedList']
      }
    }
  },
  mounted() {
    const emblaRef = this.$refs['newsRef']
    this.emblaApi = EmblaCarousel(emblaRef, { align: 'start', duration: 40 })
  },
  async created() {
    await this.$store.dispatch('news/getPinnedNews', { pinned: true, query: { p: 1, l: 6 } })
  },
  methods: {
    formatNumberDigit,
    handleNewsRoute
  }
}
</script>

<style scoped lang="scss">
h2 {
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -.2px;
  color: #2C2C2C;
  display: block;
  margin: 0 0 24px 0;

  @include responsive(xs) {
    font-size: 18px;
    line-height: 28px;
    margin: 0 0 16px 0;
  }
}

.news-pinned-wrapper {
  position: relative;
}

.gallery-wrapper {
  user-select: none;

  &--list {
    width: 100%;
    overflow: hidden;
  }
}

.news-pinned-list {
  display: flex;

  >:last-child {
    margin-right: 0;
  }

  &--item {
    list-style: none;
    flex-shrink: 0;
    width: 360px;
    margin-right: 30px;

    h3 {
      height: 64px;
      display: flex;
      align-items: center;

      span {
        flex-shrink: 0;
        font-size: 40px;
        line-height: 64px;
        font-weight: 500;
        letter-spacing: -.2px;
        width: 48px;
        height: 64px;
        margin-right: 12px;
        color: #505050;
      }

      a {
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        letter-spacing: -.2px;
        max-height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #2C2C2C !important;
      }
    }
  }

  @include responsive(lg) {
    &--item {
      width: 325px;
    }
  }

  @include responsive(xs) {
    &--item {
      width: 242px;
      margin-right: 16px;

      h3 {
        height: 40px;

        span {
          font-size: 24px;
          line-height: 32px;
          width: 28px;
          height: 40px;
        }

        a {
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
}

.img-holder {
  display: block;
  height: 202px;
  width: 360px;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 4px;

  @include responsive(lg) {
    height: 160px;
    width: 325px;
  }

  @include responsive(xs) {
    height: 136px;
    width: 242px;
    margin-bottom: 10px;
  }
}

.btn-carousel {
  position: absolute;
  left: -58px;
  top: 140px;
  background: rgba(0, 0, 0, 0);
  border: solid 1px rgba(0, 0, 0, 0);
  padding: 13px 15px;
  border-radius: 8px;
  line-height: 1px !important;

  svg {
    width: 24px;
    height: 24px;
  }
}

.go-right {
  left: unset;
  right: -58px;

  svg {
    transform: rotate(180deg);
  }
}
</style>
