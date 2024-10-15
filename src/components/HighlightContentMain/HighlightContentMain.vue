<template>
  <div class="list-highlight" ref="highlightRef">
    <ul class="list-highlight-container">
      <li v-for="item in list" :key="item.id" class="list-highlight-item">
        <component :is="item.icon" class="list-highlight-item--icon" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import EmblaCarousel from 'embla-carousel'
import { HIGHLIGHT_CONTENT_MAIN } from '@/consts/label'
import { xs } from '@/consts/breakpoints.js'

export default {
  data() {
    return {
      emblaApi: null,
      list: HIGHLIGHT_CONTENT_MAIN
    }
  },
  mounted() {
    const emblaRef = this.$refs['highlightRef']
    this.emblaApi = EmblaCarousel(emblaRef, {
      align: 'start',
      duration: 40,
      breakpoints: {
        [`(min-width: ${xs}px)`]: { active: false }
      }
    })
  }
}
</script>

<style scoped lang="scss">
.list-highlight {
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
</style>
