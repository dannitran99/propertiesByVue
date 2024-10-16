<template>
  <div class="list-highlight" ref="highlightRef">
    <ul class="list-highlight-container">
      <li v-for="item in list" :key="item.id" class="list-highlight-item">
        <component :is="item.icon" class="list-highlight-item--icon" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </li>
    </ul>
    <div class="dot-indicator">
      <button v-for="(_, idx) in list" :key="idx" class="swiper-pagination-bullet"
        :class="[{ 'selected-dot': indexSelected === idx }]" role="button" @click="() => emblaApi.scrollTo(idx)"
        :disabled="disableButton"></button>
    </div>
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { HIGHLIGHT_CONTENT_MAIN } from '@/consts/label'
import { xs } from '@/consts/breakpoints.js'

export default {
  data() {
    return {
      disableButton: false,
      emblaApi: null,
      list: HIGHLIGHT_CONTENT_MAIN,
      indexSelected: 0
    }
  },
  mounted() {
    const emblaRef = this.$refs['highlightRef']
    this.emblaApi = EmblaCarousel(emblaRef, {
      loop: true,
      align: 'start',
      duration: 40,
      breakpoints: {
        [`(min-width: ${xs}px)`]: { active: false }
      }
    }, [Autoplay({ playOnInit: true, delay: 3000 })]
    )
    this.emblaApi.on('pointerUp', () => {
      const autoplay = this.emblaApi.plugins().autoplay
      if (!autoplay) return
      autoplay.play()
    })
    this.emblaApi.on('select', () => {
      const autoplay = this.emblaApi.plugins().autoplay
      if (!autoplay) return
      this.indexSelected = this.emblaApi.selectedScrollSnap()
      autoplay.reset()
      this.disableButton = true
      setTimeout(() => {
        this.disableButton = false
      }, 1000)
    })
  }
}
</script>

<style scoped lang="scss">
.list-highlight {
  position: relative;

  @include responsive(xs) {
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
}

.list-highlight-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24px;

  @include responsive(xs) {
    flex-wrap: nowrap;
  }
}

.list-highlight-item {
  list-style: none;
  width: calc((100% - 90px) / 4);
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &--icon {
    margin-bottom: 24px;
  }

  h3 {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    letter-spacing: -.2px;
    color: #2C2C2C;
  }

  p {
    font-family: 'Roboto-Regular', sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #505050;
  }

  @include responsive(lg) {
    width: calc((100% - 30px) / 2);
  }

  @include responsive(xs) {
    width: 100%;
    flex-shrink: 0;
    padding: 24px 32px 48px;
  }
}

.dot-indicator {
  display: none;

  @include responsive(xs) {
    position: absolute;
    display: flex;
    bottom: 18px;
    width: 100%;
    justify-content: center;
  }
}

.swiper-pagination-bullet {
  background: #ccc;
  margin: 0 4px;
  cursor: pointer;
  opacity: 0.6;
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
}

.selected-dot {
  background: #2C2C2C;
  opacity: 1;
}
</style>
