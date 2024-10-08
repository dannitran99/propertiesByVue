<template>
  <div>
    <h2>Doanh nghiệp tiêu biểu</h2>
    <div class="slider-content">
      <div class="slider-wrapper" ref="emblaRef">
        <enterprise-slideshow-skeleton v-if="isLoading" />
        <ul class="slider-card" v-else>
          <li v-for="(item, idx) in enterpriseList" :key="idx" class="slider-item" @mouseenter="handlePauseInterval"
            @mouseleave="handleResumeInterval">
            <router-link :to="{ name: 'EnterpriseDetail', params: { enterpriseId: item.ID, } }">
              <img :src="item.logo" alt="logo" draggable="false">
            </router-link>
          </li>
        </ul>
      </div>
      <button class="btn-carousel" :disabled="btnDisable" @click="() => handleChangeSlide(false, true)"
        v-if="isDesktop">
        <icon-leftarrow />
      </button>
      <button class="btn-carousel go-right" :disabled="btnDisable" @click="() => handleChangeSlide(true, true)"
        v-if="isDesktop">
        <icon-leftarrow />
      </button>
    </div>
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'
import EnterpriseSlideshowSkeleton from './EnterpriseSlideshowSkeleton.vue'
import { useBreakpoints } from '@vueuse/core'
import { breakpoints } from '@/consts/breakpoints.js'

const definedBreakpoint = useBreakpoints(breakpoints)
var interval

export default {
  components: {
    EnterpriseSlideshowSkeleton
  },
  data() {
    return {
      btnDisable: false,
      emblaApi: null,
      isDesktop: definedBreakpoint.greater('lg')
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['enterprises/isLoading']
      }
    },
    enterpriseList: {
      get() {
        return this.$store.getters['enterprises/enterpriseList']
      }
    }
  },
  mounted() {
    const emblaRef = this.$refs['emblaRef']
    this.emblaApi = EmblaCarousel(emblaRef, { loop: true, align: 'start', duration: 40 })
  },
  async created() {
    await this.$store.dispatch('enterprises/getPinnedEnterprise')
    interval = this.intevalSilder(true)
  },
  methods: {
    intevalSilder(goNext) {
      return setInterval(() => {
        this.handleChangeSlide(goNext)
      }, 3000)
    },
    handleChangeSlide(goNext, pressButton) {
      if (pressButton) clearInterval(interval)
      if (this.emblaApi) goNext ? this.emblaApi.scrollNext() : this.emblaApi.scrollPrev()
      if (pressButton) interval = this.intevalSilder(true)
    },
    handlePauseInterval() {
      clearInterval(interval)
    },
    handleResumeInterval() {
      interval = this.intevalSilder(true)
    }
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
  margin: 0 0 8px 0;

  @include responsive(xs) {
    font-size: 18px;
    line-height: 28px;
  }
}

.slider-wrapper {
  overflow: hidden;
  user-select: none;
}

.slider-content {
  position: relative;
  padding-top: 16px;
  padding-bottom: 20px;

  @include responsive(xs) {
    padding-top: 8px;
    padding-bottom: 8px;
  }
}

.slider-card {
  display: flex;
}

.slider-item {
  flex-shrink: 0;
  list-style: none;
  width: 165px !important;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 4px 6px rgba(44, 44, 44, 0.04);
  border-radius: 4px;
  height: 110px;
  margin-right: 30px;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    box-shadow: 0px 4px 16px rgba(44, 44, 44, 0.08);
  }

  img {
    max-width: 133px;
    max-height: 86px;
    filter: grayscale(100%);
    transition: all .5s ease-in-out;

    &:hover {
      filter: grayscale(0%);
    }
  }

  @include responsive(lg) {
    width: 158px !important;
    margin-right: 32px;

    img {
      max-width: 92px;
      max-height: 86px;
    }
  }

  @include responsive(xs) {
    width: 120px !important;
    height: 66px;
    margin-right: 8px;

    img {
      max-height: calc(100% - 16px);
      max-width: calc(100% - 16px);
    }
  }
}

.btn-carousel {
  position: absolute;
  left: -58px;
  top: 48px;
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
